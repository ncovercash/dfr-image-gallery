import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadButton from "../components/UploadButton";
import useEvent from "../data/useEvent";
import useEventImages from "../data/useEventImages";

export default function Event() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const numCols = useMemo(() => {
    if (isSm) {
      return 2;
    } else if (isMd) {
      return 4;
    } else if (isLg) {
      return 4;
    } else {
      return 6;
    }
  }, [isSm, isMd, isLg]);

  const event = useEvent(useParams().eventId);
  const { images, setSearch } = useEventImages(event);

  return (
    <>
      <Navbar setSearch={setSearch} event={event} />
      <main>
        <ImageList variant="masonry" cols={numCols} gap={20}>
          {images === undefined
            ? "Loading..."
            : images.map((img) => (
              <a key={img.src} href={img.src}>
                <ImageListItem>
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{ height: "min(40vh, 20rem)", objectFit: "contain" }}
                  />
                  <ImageListItemBar title={img.caption} />
                </ImageListItem>
              </a>
            ))}
        </ImageList>

        <UploadButton state={event?.title} />
      </main>
    </>
  );
}
