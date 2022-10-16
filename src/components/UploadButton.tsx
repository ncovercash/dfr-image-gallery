import { UploadFile as UploadFileIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UploadButton(props: { state?: string }) {
  const navigate = useNavigate();

  return (
    <>
      {/* provide spacing for FAB */}
      <div style={{ height: "4rem" }} />

      <Fab
        variant="extended"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => navigate("/Upload", { state: props.state })}
      >
        <UploadFileIcon sx={{ mr: 1 }} />
        Upload
      </Fab>
    </>
  );
}
