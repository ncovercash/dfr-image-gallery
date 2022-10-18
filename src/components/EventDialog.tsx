import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { Event } from "../data/useData";
import VisibleTextField from "./VisibleTextField";

export default function EventDialog({
  data,
  setData,
  showDialog,
  setShowDialog,
}: {
  data: Event[];
  setData: (n: Event[]) => void;
  showDialog: boolean | Event;
  setShowDialog: (n: boolean | Event) => void;
}) {
  return (
    <Dialog open={showDialog !== false} onClose={() => setShowDialog(false)}>
      <DialogTitle>{typeof showDialog === "object" ? "Edit event" : "Create event"}</DialogTitle>
      <form
        id="event-dialog"
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const urlInput = form.url as HTMLInputElement;

          if (
            ["admin", "upload", "api", "index", "img", "images.json"].includes(
              urlInput.value.toLowerCase(),
            )
          ) {
            urlInput.setCustomValidity("Please use a non-reserved URL");
            urlInput.reportValidity();
            return;
          }

          if (
            data.map((x) => x.url.toLowerCase()).includes(urlInput.value.toLowerCase()) &&
            (typeof showDialog !== "object" ||
              showDialog.url.toLowerCase() !== urlInput.value.toLowerCase())
          ) {
            urlInput.setCustomValidity("This URL is already in use");
            urlInput.reportValidity();
            return;
          }

          if (typeof showDialog !== "object") {
            setData([
              ...data,
              {
                title: form.eventName.value,
                subtitle: form.subtitle.value,
                url: urlInput.value,
                images: [],
              },
            ]);
          } else {
            const newData = [...data];
            for (let i = 0; i < newData.length; i++) {
              if (newData[i].url === showDialog.url) {
                newData[i].title = form.eventName.value;
                newData[i].subtitle = form.subtitle.value;
                newData[i].url = urlInput.value;
              }
            }
            setData(newData);
          }
          form.reset();
          setShowDialog(false);
        }}
      >
        <DialogContent>
          <VisibleTextField
            label="Event title"
            name="eventName"
            required
            fullWidth
            defaultValue={typeof showDialog === "object" ? showDialog.title : undefined}
            margin="normal"
          />
          <VisibleTextField
            label="Event subtitle"
            name="subtitle"
            required
            fullWidth
            defaultValue={typeof showDialog === "object" ? showDialog.subtitle : undefined}
            margin="normal"
          />
          <VisibleTextField
            label="URL"
            name="url"
            inputProps={{
              pattern: "[a-zA-Z0-9-]+",
            }}
            helperText="Letters, numbers, and dashes only"
            required
            fullWidth
            defaultValue={typeof showDialog === "object" ? showDialog.url : undefined}
            margin="normal"
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button type="submit" style={{ color: "white" }}>
            {typeof showDialog === "object" ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
