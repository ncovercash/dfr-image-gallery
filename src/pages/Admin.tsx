import { Container } from "@mui/material";
import { ReactNode, useState } from "react";
import AdminAuthenticationWall from "../components/AdminAuthenticationWall";
import Navbar from "../components/Navbar";

export default function AdminPage() {
  const [authentication, setAuthentication] = useState<string | false>(false);
  const [snackbar, setSnackbar] = useState<ReactNode>(undefined);

  return (
    <>
      {snackbar}
      <Navbar
        noSearch
        setSearch={() => ({})}
        event={{ title: "Admin", url: "Admin", subtitle: "", images: [] }}
      />
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        {authentication === false ? (
          <AdminAuthenticationWall
            setAuthentication={setAuthentication}
            setSnackbar={setSnackbar}
          />
        ) : (
          <main>
            <h1>Super secret</h1>
            <div style={{ height: "2rem" }} />
          </main>
        )}
      </Container>
    </>
  );
}
