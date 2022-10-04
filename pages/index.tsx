import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import useImages from "../data/useImages";

export default function Home() {
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

  const images = useImages();

  return (
    <>
      <Head>
        <title>Gallery | Dutch Fork Runners</title>
      </Head>
      <header>
        <nav>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: "100%",
              display: "flex",
              padding: "1rem",
            }}
          >
            <Link href="/">
              <a style={{ fontSize: "2rem" }}>Gallery</a>
            </Link>
          </Box>
        </nav>
      </header>
      <main>
        <Container maxWidth="xl">
          <ImageList cols={numCols} gap={20}>
            {images.map((event) => (
              <Link key={event.url} href={`/${event.url}`}>
                <a>
                  <ImageListItem>
                    <img
                      src={event.images[0].src}
                      alt={event.title}
                      style={{ height: "min(40vh, 20rem)" }}
                    />
                    <ImageListItemBar title={event.title} subtitle={event.subtitle} />
                  </ImageListItem>
                </a>
              </Link>
            ))}
          </ImageList>
        </Container>
      </main>
    </>
  );
}
