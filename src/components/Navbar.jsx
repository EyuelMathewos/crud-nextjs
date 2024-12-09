"use client";

import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CRUD App
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push("/create")}>
            Create Post
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
