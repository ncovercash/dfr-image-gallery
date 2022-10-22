import { Delete as DeleteIcon, Upload as UploadIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Autocomplete,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { nanoid } from "nanoid";
import { ReactNode, useCallback, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import VisibleTextField from "../components/VisibleTextField";
import useData from "../data/useData";

const MAX_UPLOAD_SIZE = 20 * 1000 * 1000;

export default function UploadPage() {
  const data = useData();
  const defaultEvent = useLocation().state as string | undefined;

  const [snackbar, setSnackbar] = useState<ReactNode[]>([]);
  const snackbarRef = useRef<ReactNode[]>([]);
  snackbarRef.current = snackbar;

  const [files, setFiles] = useState<
    { file: File; id: string; url: string; event: string; caption: string }[]
  >([]);

  const [uploadState, setUploadState] = useState<ReactNode>("Upload");

  const onDropCallback = useCallback(
    (newFiles: File[], rejects: FileRejection[]) => {
      if (rejects.length) {
        setSnackbar(
          rejects.map((rejected) => (
            <Snackbar
              open
              autoHideDuration={6000}
              onClose={() => setSnackbar(snackbarRef.current.slice(1))}
            >
              <Alert severity="error" onClose={() => setSnackbar(snackbarRef.current.slice(1))}>
                &quot;{rejected.file.name}&quot;: {rejected.errors.map((e) => e.message).join(", ")}
              </Alert>
            </Snackbar>
          )),
        );
      }
      setFiles([
        ...files,
        ...newFiles.map((newFile) => ({
          file: newFile,
          id: nanoid(),
          url: URL.createObjectURL(newFile),
          event: defaultEvent ?? "",
          caption: newFile.name,
        })),
      ]);
    },
    [files, defaultEvent],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/gif": [".gif"],
      "image/jpeg": [".jpeg", ".jpg", ".jpe", ".jif", ".jfif"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: true,
    onDrop: onDropCallback,
    maxSize: MAX_UPLOAD_SIZE,
  });

  const [done, setDone] = useState<boolean>(false);

  return (
    <>
      {snackbar?.[0]}
      <Navbar
        noSearch
        setSearch={() => ({})}
        event={{ title: "Upload", url: "Upload", subtitle: "", images: [] }}
      />
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        {done ? (
          <>
            <h1>Upload complete!</h1>
            <p>
              Want to upload more?{" "}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                           jsx-a11y/no-static-element-interactions */}
              <a
                style={{ fontWeight: "bold", textDecoration: "underline" }}
                onClick={() => {
                  setDone(false);
                  setUploadState("Upload");
                  setFiles([]);
                }}
              >
                Click here
              </a>
            </p>
          </>
        ) : (
          <main>
            <Button
              variant="contained"
              fullWidth
              {...getRootProps()}
              style={{
                height: isDragActive ? "24rem" : "4rem",
                transition: "height 400ms",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <span>drop the files here...</span>
              ) : (
                <span>click or drag and drop to add new images</span>
              )}
            </Button>

            {files.map((image, i) => (
              <div key={i}>
                {i !== 0 ? <Divider key={`${i}div`} /> : null}
                <Grid container key={i} padding={2}>
                  <Grid item xs={3} container alignItems="center" paddingTop={2} paddingBottom={2}>
                    <img
                      src={image.url}
                      style={{ maxWidth: "100%", maxHeight: "min(200px, 40vh)" }}
                      alt={image.file.name}
                    />
                  </Grid>
                  <Grid item xs={8} container padding={2}>
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Autocomplete
                        freeSolo
                        fullWidth
                        options={data?.map((e) => e.title) ?? []}
                        inputValue={image.event}
                        onInputChange={(e, newEvent) => {
                          const n = [...files];
                          n[i].event = newEvent;
                          setFiles(n);
                        }}
                        renderInput={(params) => (
                          <VisibleTextField
                            {...params}
                            label="Event"
                            required={false}
                            margin="dense"
                            fullWidth
                          />
                        )}
                      />

                      <VisibleTextField
                        label="Caption"
                        value={image.caption}
                        onChange={(e) => {
                          const n = [...files];
                          n[i].caption = e.target.value;
                          setFiles(n);
                        }}
                        required={false}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    container
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <IconButton
                      onClick={() => {
                        const n = [...files];
                        n.splice(i, 1);
                        setFiles(n);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}

            {files.length ? (
              <LoadingButton
                variant="contained"
                fullWidth
                loadingPosition="start"
                startIcon={<UploadIcon />}
                loading={uploadState !== "Upload"}
                onClick={async () => {
                  setUploadState("Uploading...");

                  let i = 1;
                  for (const file of files) {
                    const mainText = `Uploading file ${i} of ${files.length}`;
                    setUploadState(`${mainText}...`);

                    const d = new FormData();
                    d.append("file", file.file);
                    d.append("event", file.event);
                    d.append("caption", file.caption);

                    try {
                      await axios.post("https://dutchforkrunners.com/Gallery/api/upload.php", d, {
                        onUploadProgress: (p) => {
                          setUploadState(
                            `${mainText} (${Math.round(
                              (100 * p.loaded) / (p.total ?? p.loaded),
                            )}%)...`,
                          );
                        },
                      });
                    } catch (_e) {
                      const e = _e as AxiosError;
                      // eslint-disable-next-line no-alert
                      alert(`Unable to upload: ${e.response?.data ?? e.message}`);
                      setUploadState("Upload");
                      return;
                    }

                    i++;
                  }

                  setDone(true);
                }}
              >
                {uploadState}
              </LoadingButton>
            ) : undefined}
            <div style={{ height: "2rem" }} />
          </main>
        )}
      </Container>
    </>
  );
}
