"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} // Automatically close after 4 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
