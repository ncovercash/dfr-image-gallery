import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, styled, Tab } from "@mui/material";
import { ReactNode, useState } from "react";
import AdminAuthenticationWall from "../components/AdminAuthenticationWall";
import Navbar from "../components/Navbar";

const StyledTab = styled(Tab)(() => ({
  "&.Mui-selected": {
    color: "#fff !important",
  },
}));

const StyledTabList = styled(TabList)(() => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
  },
}));

export default function AdminPage() {
  const [authentication, setAuthentication] = useState<string | false>(false);
  const [snackbar, setSnackbar] = useState<ReactNode>(undefined);
  const [tab, setTab] = useState<string>("main");

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
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <StyledTabList
                  onChange={(_, t) => setTab(t)}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <StyledTab label="Organize Images" value="main" />
                  <StyledTab label="Pending Images" value="approve" />
                </StyledTabList>
              </Box>
              <TabPanel value="main">Item One</TabPanel>
              <TabPanel value="approve">Item Two</TabPanel>
            </TabContext>
          </main>
        )}
      </Container>
    </>
  );
}
