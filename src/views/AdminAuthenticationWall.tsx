import { Login as LoginIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Container, Grid, Snackbar } from "@mui/material";
import ky, { HTTPError } from "ky";
import { ReactNode, useState } from "react";
import VisibleTextField from "../components/VisibleTextField";

export default function AdminAuthenticationWall(props: {
  setAuthentication: (pass: string) => void;
  setSnackbar: (newNode: ReactNode) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Container maxWidth="lg">
      <h1>Please login</h1>

      <form
        id="admin-authentication-wall"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            const data = await ky.post("https://dutchforkrunners.com/Gallery/api/verify.php", {
              body: new FormData(e.target as HTMLFormElement),
            });
            if ((await data.text()) === "OK") {
              props.setAuthentication(
                ((e.target as HTMLFormElement).pass as HTMLInputElement).value,
              );
            } else {
              // eslint-disable-next-line no-throw-literal
              throw { response: data };
            }
          } catch (er) {
            props.setSnackbar(
              <Snackbar open autoHideDuration={6000} onClose={() => props.setSnackbar(undefined)}>
                <Alert severity="error" onClose={() => props.setSnackbar(undefined)}>
                  {await (er as HTTPError).response.text()}
                </Alert>
              </Snackbar>,
            );
          }

          setLoading(false);
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} md={8} lg={10}>
            <VisibleTextField type="password" label="Password" name="pass" required fullWidth />
          </Grid>
          <Grid item xs={12} md={4} lg={2} paddingLeft={2}>
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              loadingPosition="start"
              startIcon={<LoginIcon />}
              loading={loading}
            >
              Login
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
