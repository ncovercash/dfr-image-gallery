import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e4b2a",
    },
    secondary: {
      main: "#1b5e20",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
