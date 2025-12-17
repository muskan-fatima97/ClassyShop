import React, { useState } from "react";
import { Box, Dialog, List, ListItemButton, Typography, Button, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CategoryPage from "./CategoryPage";

const Sidebar = ({ selectedTab, setSelectedTab }) => {

  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or use navigate()
  };

  return (
    <Box
      sx={{
        width: "240px",
        height: "100vh",
        bgcolor: "#0A1D37",
        color: "white",
        p: 2,
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP SECTION */}
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Admin Panel
        </Typography>

        <List>
          <ListItemButton
            selected={selectedTab === "products"}
            onClick={() => setSelectedTab("products")}
            sx={{
              borderRadius: 1,
              mb: 1,
              bgcolor: selectedTab === "products" ? "#12345A" : "transparent",
            }}
          >
            Products
          </ListItemButton>

          <ListItemButton
            selected={selectedTab === "users"}
            onClick={() => setSelectedTab("users")}
            sx={{
              borderRadius: 1,
              mb: 1,
              bgcolor: selectedTab === "users" ? "#12345A" : "transparent",
            }}
          >
            Users
          </ListItemButton>

          <ListItemButton
            selected={selectedTab === "categories"}
            onClick={() => setSelectedTab("categories")}
            sx={{
              borderRadius: 1,
              bgcolor: selectedTab === "categories" ? "#12345A" : "transparent",
            }}
          >
            Manage Categories
          </ListItemButton>
        </List>
      </Box>

      {/* BOTTOM SECTION (LOGOUT) */}
      <List>
        <ListItemButton
          onClick={() => setLogoutOpen(true)}
          sx={{
            borderRadius: 1,
            bgcolor: "transparent",
            "&:hover": { bgcolor: "#8B0000" },
          }}
        >
          Logout
        </ListItemButton>
      </List>

      {/* LOGOUT CONFIRMATION DIALOG */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
