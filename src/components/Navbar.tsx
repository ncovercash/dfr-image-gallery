import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function Navbar(props: { setSearch: (newSearch: string) => void }) {
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [showSearchSm, setShowSearchSm] = useState<boolean>(false);

  return (
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
              props.setSearch(e.target.value);
            }}
            variant="outlined"
            onBlur={() => setShowSearchSm(false)}
          />
        </Box>
      </nav>
    </header>
  );
}
