"use client";

import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../../components/navbar";
import { useQuery } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box sx={{ minHeight: "100vh", background: (theme) => theme.palette.background.default }}>
      <Navbar />
      {isLaptop && <Box component="main" sx={{ px: "32px", my: '14px' }}>{children}</Box>}
      {!isLaptop && <Box component="main" sx={{ pl: "16px", pr: '20px', my: '14px' }}>{children}</Box>}
    </Box>
  );
};

export default Layout;
