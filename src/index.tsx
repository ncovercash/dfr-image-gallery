import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages";
import "./styles/globals.scss";

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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
  ],
  { basename: "/Gallery" },
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
