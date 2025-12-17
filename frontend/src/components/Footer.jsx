import React from "react";
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import "./../App.css";
const Footer = () => {
  return (
    <Box className="footer-container">
      <Box className="footer-inner">
        <Grid container spacing={6} justifyContent="center" className="footer-top-section">
          <Grid item xs={12} md={2} className="footer-top-item">
            <LocalShippingOutlinedIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                fontWeight: 100,
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            <Typography className="footer-text-h6" variant="h6">Free Shipping</Typography>
            <Typography className="footer-text-body2">For all Orders Over $100</Typography>
          </Grid>
          <Grid item xs={12} md={2} className="footer-top-item">
            <AssignmentReturnOutlinedIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            <Typography className="footer-text-h6">30 Days Returns</Typography>
            <Typography className="footer-text-body2">For an Exchange Product</Typography>
          </Grid>
          <Grid item xs={12} md={2} className="footer-top-item">
            <AccountBalanceWalletOutlinedIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            <Typography className="footer-text-h6">Secured Payment</Typography>
            <Typography className="footer-text-body2">Payment Cards Accepted</Typography>
          </Grid>
          <Grid item xs={12} md={2} className="footer-top-item">
            <CardGiftcardOutlinedIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            <Typography className="footer-text-h6">Special Gifts</Typography>
            <Typography className="footer-text-body2">Our First Product Order</Typography>
          </Grid>
          <Grid item xs={12} md={2} className="footer-top-item">
            <SupportAgentOutlinedIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            <Typography className="footer-text-h6">Support 24/7</Typography>
            <Typography className="footer-text-body2">Contact us Anytime</Typography>
          </Grid>
        </Grid>
        <hr className="footer-divider" style={{ color: "black", width: "90%" ,}} />
        <Grid container spacing={6} className="footer-main-content" justifyContent="center">
          <Grid item xs={12} md={3} className="footer-col-border">
            <Typography variant="h6" className="footer-title">Contact us</Typography>
            <Typography>Classyshop - Mega Super Store</Typography>
            <Typography>507-Union Trade Centre France</Typography>
            <Typography>sales@yourcompany.com</Typography>
            <Typography className="footer-phone">(+92) 32-0909456</Typography>
            <Box
              className="footer-chat-box"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1, 
                mt:3,
              }}
            >
              <ChatBubbleOutlineRoundedIcon
                sx={{
                  fontSize: "35px",
                  color: "#0A1D37",
                  transition: "0.3s ease",
                  "&:hover": {
                    color: "#FF5722",
                    transform: "translateY(-5px)",
                    cursor: "pointer",
                  }
                }}
              />
              <div >
                <Typography>Online Chat</Typography>
                <Typography>Get Expert Help</Typography>
              </div>
            </Box>

          </Grid>
          <Grid item xs={12} md={3} className="footer-next-col">
            <Typography variant="h6" className="footer-title">Products</Typography>
            <Typography>Prices drop</Typography>
            <Typography>New products</Typography>
            <Typography>Best sales</Typography>
            <Typography>Contact us</Typography>
            <Typography>Sitemap</Typography>
            <Typography>Stores</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="footer-next-col">
            <Typography variant="h6" className="footer-title">Our Company</Typography>
            <Typography>Delivery</Typography>
            <Typography>Legal Notice</Typography>
            <Typography>Terms and conditions of use</Typography>
            <Typography>About us</Typography>
            <Typography>Secure payment</Typography>
            <Typography>Login</Typography>
          </Grid>
          <Grid item xs={12} md={3} className="footer-newsletter">
            <Typography variant="h6" className="footer-title">Subscribe to newsletter</Typography>
            <Typography mb={2}>
              Subscribe to our latest newsletter to get news about special discounts.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField sx={{ width: "90%", backgroundColor:"white" }} placeholder="Your Email Address" size="small" />
              <FormControlLabel sx={{ fontSize: "10px" }} control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy" />
              <Button variant="contained" sx={{ width: "50%", backgroundColor:"#0A1D37" }} className="footer-subscribe-btn">Subscribe</Button>
            </Box>
          </Grid>
          {/* <Box className="footer-social-row">
            <Box>
              <FacebookIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
              <FacebookIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
              <FacebookIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
              <FacebookIcon
              sx={{
                fontSize: "50px",
                color: "#0A1D37",
                transition: "0.3s ease",
                mb: 2,
                "&:hover": {
                  color: "#FF5722",
                  transform: "translateY(-5px)",
                  cursor: "pointer",
                }
              }}
            />
            </Box>

            <img src="/payments.png" className="footer-payment-img" />
          </Box> */}
        </Grid>
        <Box className="footer-bottom">
          © 2025 - Online Ecomerce Store
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
