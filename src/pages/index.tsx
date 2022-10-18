import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadButton from "../components/UploadButton";
import useImages from "../data/useImages";

export default function Index() {
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

  const { images, setSearch } = useImages();
  return (
    <>
      <Navbar setSearch={setSearch} />
      <main>
        <ImageList cols={numCols} gap={20}>
          {images === undefined
            ? "Loading..."
            : images.map((event) => (
              <Link key={event.url} to={`/${event.url}`}>
                <ImageListItem>
                  <img
                    src={event.images[0]?.src}
                    alt={event.title}
                    style={{ height: "min(40vh, 20rem)", objectFit: "contain" }}
                  />

                  <Box
                    bottom={0}
                    left={0}
                    right={0}
                    position="absolute"
                    padding={1}
                    sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <p style={{ margin: 0 }}>{event.title}</p>
                    <p style={{ fontSize: "75%", margin: "0" }}>{event.subtitle}</p>
                  </Box>
                </ImageListItem>
              </Link>
            ))}
        </ImageList>

        <UploadButton />
      </main>
    </>
  );
}
