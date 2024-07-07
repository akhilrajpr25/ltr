import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackBarComponent = ({ open, type, message, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
