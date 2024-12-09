"use client";

import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box } from "@mui/material";

const PostForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert("Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={formData?.title || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="body"
        label="Body"
        value={formData?.body || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default PostForm;
