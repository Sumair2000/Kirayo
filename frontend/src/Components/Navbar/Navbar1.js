import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { deepPurple } from '@mui/material/colors';

import {Search, SearchIconWrapper, StyledInputBase} from "./styles"

import { Menu,Avatar , IconButton , MenuItem, Divider } from "@mui/material";


export default function Navbar1(props) {

  const [Id,setId] = useState(0);
  const [name, setname] = useState("");
  const [user, setuser] = useState(localStorage.getItem("token"));
  let history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    setname("");
    props.showAlert("Logout Successfully", "success");
  };


  useEffect(() => {
    const token = user;
    if (token) {
      const { exp, name, id } = decode(token);
      setId(id)
      setname(name);
      if (Date.now() >= exp * 1000) {
        handleLogout();
      }
    }
    setuser(localStorage.getItem("token"));
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#475FCB'}}>
        <Toolbar>
          <Link to="/" style={{ color: "#475FCB" }}> 
          <Typography
            fontFamily="Bubblegum Sans"
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            cursor="pointer"
            color="#E6EEF0"
          > 
            Kirayo
          </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!localStorage.getItem("token") ? (
              <>
                {/* <Button className="mx-2" style={{color: "#475FCB", backgroundColor: "#F2F2F2" }} variant="contained" > */}
                  <Link
                    className="login-link mx-3 my-1"
                    style={{ color: "#F2F2F2" }}
                    aria-current="page"
                    to="/login"
                    target="_parent"
                  >
                    Login
                  </Link>
                {/* </Button> */}
                <Button className="mx-2" style={{color: "#475FCB", backgroundColor: "#F2F2F2" }} variant="contained" >
                  <Link
                    className="signup-link"
                    style={{ color: "#475FCB" }}
                    aria-current="page"
                    to="/signup"
                    target="_parent"
                  > 
                    Signup
                  </Link>
                </Button>
              </>
            ) : (
              <>
              
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                style={{color: "#E6EEF0", backgroundColor: "#475FCB"}}
              >
                {name} <Avatar className="mx-2" sx={{ bgcolor: deepPurple[500] }}>{name[0]}</Avatar> 
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
               <Link to={`/viewProfile/${Id}`} style={{color: "#475FCB", textDecoration: "none"}} target="_parent">
                <MenuItem >View Profile</MenuItem>
                </Link>
                <Divider/>
                <MenuItem onClick={handleLogout} style={{color: "#475FCB"}}>Logout</MenuItem>
              </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
