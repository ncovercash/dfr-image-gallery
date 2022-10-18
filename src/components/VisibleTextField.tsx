import { styled, TextField } from "@mui/material";

const VisibleTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white !important",
  },
  "& input:focus + fieldset": {
    borderColor: "white !important",
  },
  "& .Mui-focused fieldset": {
    borderColor: "white !important",
  },
});

export default VisibleTextField;
