import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  styled,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useImages from "../data/useImages";

const SearchField = styled(TextField)({
  "& input + fieldset": {
    borderColor: "white !important",
    borderWidth: "2px",
    transition: "border-width 100ms",
  },
  "& input:focus + fieldset": {
    // borderColor: "white",
    borderWidth: "3px !important",
  },
  "& input": {
    color: "white",
  },
});

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
  const [showSearchSm, setShowSearchSm] = useState<boolean>(false);

  return (
    <>
      <header>
        <nav>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: "100%",
              display: "flex",
              padding: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              style={{
                fontSize: "2rem",
                display: !isSm || !showSearchSm ? "inline-block" : "none",
              }}
            >
              Gallery
            </Link>
            <IconButton
              onClick={() => setShowSearchSm(true)}
              sx={{ display: isSm && !showSearchSm ? "inline-block" : "none" }}
            >
              <SearchIcon htmlColor="white" />
            </IconButton>
            <SearchField
              label=""
              id="search"
              sx={{
                maxWidth: isSm ? undefined : "min(30vw, 500px)",
                display: isSm && !showSearchSm ? "none" : "inline-block",
              }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon htmlColor="white" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              variant="outlined"
              onBlur={() => setShowSearchSm(false)}
            />
          </Box>
        </nav>
      </header>
      <main>
        <Container maxWidth="xl">
          <ImageList cols={numCols} gap={20}>
            {images.map((event) => (
              <Link key={event.url} to={`/${event.url}`}>
                <ImageListItem>
                  <img
                    src={event.images[0].src}
                    alt={event.title}
                    style={{ height: "min(40vh, 20rem)" }}
                  />
                  <ImageListItemBar title={event.title} subtitle={event.subtitle} />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        </Container>
      </main>
    </>
  );
}
