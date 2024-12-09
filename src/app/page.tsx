"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import SnackbarAlert from "../components/SnackbarAlert";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
        setSnackbar({
          open: true,
          severity: "success",
          message: "Post deleted successfully!",
        });
      } catch (err) {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to delete post.",
        });
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => (window.location.href = `/edit/${post.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "red", borderColor: "red" }}
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
}
