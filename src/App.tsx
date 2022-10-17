import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages";
import AdminPage from "./pages/Admin";
import EventPage from "./pages/Event";
import UploadPage from "./pages/Upload";
import "./styles/globals.scss";

const theme = createTheme({
  palette: {
    mode: "dark",
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
    {
      path: ":eventId",
      element: <EventPage />,
    },
    {
      path: "Upload",
      element: <UploadPage />,
    },
    {
      path: "Admin",
      element: <AdminPage />,
    },
  ],
  { basename: "/Gallery" },
);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
