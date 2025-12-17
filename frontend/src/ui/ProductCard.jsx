import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ProductCard({ image, title }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        paddingTop: 4,
        textAlign: "center",
        backgroundColor: "#f7f7f7",
        width: 260,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: 130, margin: "0 auto" }}
      />

      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, marginTop: 1 }}
        >
          {title}
        </Typography>

        <Typography sx={{ fontSize: "13px", marginTop: 1, color: "gray" }}>
          Calories
        </Typography>
        <Typography sx={{ fontSize: "11px", color: "gray" }}>
          Total Fat 19g — 22% <br />
          Saturated Fat 13g — 60% <br />
          Trans Fat 0.5g
        </Typography>
      </CardContent>
    </Card>
  );
}
