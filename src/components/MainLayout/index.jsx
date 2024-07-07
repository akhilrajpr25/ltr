import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useContext, useState } from "react";
import TLR from "../../assets/images/TLRLogo.png";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../../auth/AuthWrapper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    marginRight: "20px",
    color: "white",
    "&.active": {
      fontWeight: "bold",
      color: "black",
    },
  },
}));

const MainLayout = () => {
  const { logout } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <>
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, alignItems: "center", display: "flex" }}>
              <img style={{ width: "100px" }} alt="TLR" src={TLR} />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <NavLink className={classes.link} to="/">
                Home
              </NavLink>
              <NavLink className={classes.link} to="/posts">
                About
              </NavLink>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
              </IconButton>
            </Box>
            <Menu
              sx={{ width: "1000px" }}
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Grid>
    </>
  );
};

export default MainLayout;
