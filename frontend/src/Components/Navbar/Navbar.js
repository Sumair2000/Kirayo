import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { deepPurple } from '@mui/material/colors';
import UploadIcon from '@mui/icons-material/Upload';

import {Search, SearchIconWrapper, StyledInputBase} from "./styles"

import { Menu,Avatar , IconButton , MenuItem, Divider } from "@mui/material";


export default function Navbar() {

  const  userState   = useSelector((state) => state.auth.user); 
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
    };


    useEffect(() => {
      const token = user;
      if (token) {
        const { exp, name, id } = decode(token);
        setId(id)
        // setname(name);
        if (Date.now() >= exp * 1000) {
          handleLogout();
        }
      }
      setuser(localStorage.getItem("token"));
    }, [location]);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: '#475FCB'}}>
          <Toolbar>
            <Link to="/" style={{ color: "#475FCB" }}> 
            <Typography
              fontFamily="Bubblegum Sans"
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "flex", sm: "block" } }}
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
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              {!localStorage.getItem("token") ? (
                <>
                    <Link
                      className="login-link mx-3 my-1"
                      style={{ color: "#F2F2F2" }}
                      aria-current="page"
                      to="/login"
                    >
                      LOGIN
                    </Link>
                  <Button className="mx-2" style={{color: "#475FCB", backgroundColor: "#F2F2F2" }} variant="contained" >
                    <Link
                      className="signup-link"
                      style={{ color: "#475FCB" }}
                      to="/signup"
                    > 
                      Signup
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                <Link
                      className="login-link mx-3 my-3"
                      style={{ color: "#F2F2F2", textDecoration: "none" }}
                      aria-current="page"
                      to={`/mypost/${Id}`}
                    >
                      MY POSTS
                    </Link>
                {/* <Button className="mx-4 my-1" variant="contained" style={{color: "#475FCB", backgroundColor: "#F2F2F2" }} > */}
                    <Link
                      className="signup-link mx-4 my-3"
                      style={{ color: "#F2F2F2",textDecoration: "none" }}
                      aria-current="page"
                      to="/product/upload"
                    > 
                     RENT THINGS?
                    </Link>
                  {/* </Button> */}
                  <Button className="my-2" variant="contained" onClick={handleLogout} style={{color: "#475FCB", backgroundColor: "#F2F2F2", fontWeight: "bold" }} >
                    Logout
                  </Button>
                {/* <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  style={{color: "#E6EEF0", backgroundColor: "#475FCB"}}
                >
                  {name ? name : setname(userState.name) || "j"  } <Avatar className="mx-2" sx={{ bgcolor: deepPurple[500] }}>{name[0]}</Avatar> 
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                <Link to={`/viewProfile/${Id}`} style={{color: "#475FCB", textDecoration: "none"}} >
                  <MenuItem >View Profile</MenuItem>
                  </Link>
                  <Divider/>
                  <MenuItem onClick={handleLogout} style={{color: "#475FCB"}}>Logout</MenuItem>
                </Menu> */}
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
