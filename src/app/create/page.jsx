"use client";

import React, { useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import SnackbarAlert from "../../components/SnackbarAlert";
import PostForm from "../../components/PostForm";

export default function CreatePost() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const createPost = async (data) => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Post created successfully!",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to create post.",
      });
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Post
      </Typography>
      <PostForm onSubmit={createPost} />

      {/* Snackbar for notifications */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </>
  );
}
