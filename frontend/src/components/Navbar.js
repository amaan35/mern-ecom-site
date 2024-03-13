import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              E-COM
            </Typography>
            <Button color="inherit" onClick={goToHome}>
              Home
            </Button>
            <Button color="inherit" onClick={goToAddProduct}>
              Add product
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;