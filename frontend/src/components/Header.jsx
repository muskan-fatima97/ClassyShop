import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

export default function Header({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar position="static" sx={{ background: "white", color: "black", boxShadow: 0 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
              alt="logo"
              style={{ width: 35 }}
            />
            {!isMobile && (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                CLASSYSHOP
              </Typography>
            )}
          </Box>

          {/* Search bar */}
          {!isMobile && (
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                maxWidth: "500px",
                mx: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  px: 1,
                  width: 400, // adjust width
                }}
              >
                <InputBase
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ flex: 1 }} // takes remaining space
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Right buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <>
              <IconButton onClick={() => navigate("/cart")} sx={{ position: "relative" }}>
                  <ShoppingCartIcon sx={{ color: "#0A1D37" }} />
                  {cart.totalItems > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: "red",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      {cart.totalItems}
                    </Box>
                  )}
                </IconButton>
                {/* <IconButton onClick={() => navigate("/dashboard")}>
                  <FavoriteBorderIcon />
                </IconButton> */}
                <Button onClick={() => navigate("/login")} sx={{ textTransform: "none", color: "black" }}>Login</Button>
                <Typography>|</Typography>
                <Button onClick={() => navigate("/signup")} sx={{ textTransform: "none", color: "black" }}>SignUp</Button>
                
                
              </>
            )}

            {/* Mobile hamburger */}
            {isMobile && <IconButton onClick={toggleDrawer}><MenuIcon /></IconButton>}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/login")}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/signup")}>
                <ListItemText primary="SignUp" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/dashboard")}>
                <ListItemText primary="Favorites" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/cart")}>
                <ListItemText primary={`Cart(${cart.totalItems})`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
