"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";
import SnackbarAlert from "../../../components/SnackbarAlert";
import PostForm from "../../../components/PostForm";

export default function EditPost({ params }) {
  const { id } = params; // Extract post ID from the route
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    // Fetch the post data based on the ID
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to fetch post details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async (data) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Post updated successfully!",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update post.",
      });
    }
  };

  if (loading) return <CircularProgress />; // Show a loader while fetching data
  if (!post) return <Typography color="error">Post not found.</Typography>; // Error handling for invalid post

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <PostForm initialData={post} onSubmit={updatePost} />

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
