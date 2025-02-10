"use client";

import React from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <Box sx={{ minHeight: "100vh", background: (theme) => theme.palette.background.default }}>
      <Navbar />
      <Box component="main" sx={{ px: "32px", mt: '14px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
