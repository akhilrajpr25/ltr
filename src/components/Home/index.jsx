import { Box, Typography } from "@mui/material";
import React from "react";
const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        margin: "100px",
      }}
    >
      <Typography sx={{ fontSize: "25px", color: "#00468c" }}>
        Welcome to Homepage
      </Typography>
    </Box>
  );
};

export default Home;
