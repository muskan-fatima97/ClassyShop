import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

export default function FeaturedCard({ image, title }) {
  return (
    <Card
      sx={{
        width: 330,
        backgroundColor: "#006241",
        borderRadius: 4,
        paddingY: 3,
        textAlign: "center",
        color: "white",
      }}
    >
      <img src={image} alt={title} style={{ width: 150, margin: "0 auto" }} />

      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginY: 2 }}>
          {title}
        </Typography>

        {/* Size */}
        <Box sx={{ textAlign: "left", marginBottom: 2 }}>
          <Typography sx={{ fontSize: "12px" }}>Size</Typography>
          <Select
            fullWidth
            defaultValue={"medium"}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              height: 40,
              marginTop: 0.5,
            }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </Box>

        {/* Milk */}
        <Box sx={{ textAlign: "left", marginBottom: 2 }}>
          <Typography sx={{ fontSize: "12px" }}>Milk</Typography>
          <Select
            fullWidth
            defaultValue={"regular"}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              height: 40,
              marginTop: 0.5,
            }}
          >
            <MenuItem value="regular">Regular</MenuItem>
            <MenuItem value="oat">Oat Milk</MenuItem>
            <MenuItem value="almond">Almond Milk</MenuItem>
          </Select>
        </Box>

        {/* Drink */}
        <Box sx={{ textAlign: "left", marginBottom: 2 }}>
          <Typography sx={{ fontSize: "12px" }}>Drink</Typography>
          <Select
            fullWidth
            defaultValue={"cold"}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              height: 40,
              marginTop: 0.5,
            }}
          >
            <MenuItem value="cold">Cold</MenuItem>
            <MenuItem value="hot">Hot</MenuItem>
          </Select>
        </Box>

        {/* Add to Basket */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 3,
            paddingY: 1,
            fontWeight: 600,
            marginTop: 1,
          }}
        >
          Add to Basket
        </Button>
      </CardContent>
    </Card>
  );
}
