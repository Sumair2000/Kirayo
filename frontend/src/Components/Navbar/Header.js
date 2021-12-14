import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProductBySearch } from "../../Actions/products";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import decode from "jwt-decode";
import image from "../../Images/logo2flat.png"
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(() => ({

  header: {
    backgroundColor: "#475FCB",
    paddingRight: "0px",
    paddingLeft: "0px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Bubblegum Sans",
    fontWeight: 600,
    color: "#E6EEF0",
    textAlign: "start",
    cursor: "pointer",
    paddingLeft: 8,
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "17px 15px",
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const [resFlag, setresFlag] = useState(false);
  const [postFlag, setpostFlag] = useState(false);
  const [rentFlag, setrentFlag] = useState(false);

  const [searchItem, setsearchItem] = useState("");
  const [Id, setId] = useState(0);
  const [name, setname] = useState("");
  const [user, setuser] = useState(localStorage.getItem("token"));
  let history = useHistory();
  const location = useLocation();
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    setname("");
  };

  const headersData = [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Signup",
      href: "/signup",
    },
  ];

  const headersData1 = [
    {
      label: "My Reservations",
      href: `/myReservations/${Id}`,
    },
    {
      label: "My Posts",
      href: `/${Id}`,
    },
    {
      label: "Rent Things?",
      href: "/product/upload",
    },
    {
      label: "Logout",
      href: "/",
      handleLogout,
    },
  ];
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

 

  useEffect(() => {
    const token = user;
    if (token) {
      const { exp, name, id } = decode(token);
      setId(id);
      // setname(name);
      if (Date.now() >= exp * 1000) {
        handleLogout();
      }
    }
    setuser(localStorage.getItem("token"));
  }, [location]);

  const searchPost = () => {
    if (searchItem.trim()) {
      dispatch(getProductBySearch(searchItem));
      history.push(`/products/search?searchQuery=${searchItem}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    if (!localStorage.getItem("token")) {
      return headersData.map(({ label, href }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      });
    } else {
      return headersData1.map(({ label, href }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      });
    }
  };

  const femmecubatorLogo = (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <RouterLink
        to="/"
        style={{ color: "#475FCB", textDecoration: "none" }}
        onClick={() => {
          setrentFlag(false);
          setpostFlag(false);
          setresFlag(false);
          setsearchItem("");
        }}
      >
        <div style={{display: "flex"}}>
          <img src={image} alt="kirayo co." style={{height: 40, width: 40}}/>
        <Typography variant="h4" component="h1" className={logo}>
          Kirayo
        </Typography>
        </div>
      </RouterLink>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onKeyDown={handleKeyPress}
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );

  const getMenuButtons = () => {
    return (
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        {!localStorage.getItem("token") ? (
          <>
            <RouterLink
              className="login-link"
              style={{
                color: "#F2F2F2",
                marginTop: "0.5rem",
                marginRight: "1rem",
              }}
              aria-current="page"
              to="/login"
            >
              LOGIN
            </RouterLink>
            <Button
              className="mx-2"
              style={{ color: "#475FCB", backgroundColor: "#F2F2F2" }}
              variant="text"
            >
              <RouterLink
                className="signup-link"
                style={{ color: "#475FCB" }}
                to="/signup"
              >
                Signup
              </RouterLink>
            </Button>
          </>
        ) : (
          <>
            <RouterLink
              onClick={() => {
                setrentFlag(false);
                setpostFlag(false);
                setresFlag(true);
                setsearchItem("");
              }}
              className="login-link mx-3 my-3"
              style={{
                color: "#F2F2F2",
                textDecoration: resFlag ? "" : "none",
              }}
              aria-current="page"
              to={`/myReservations/${Id}`}
            >
              MY RESERVATIONS
            </RouterLink>
            <RouterLink
              onClick={() => {
                setrentFlag(false);
                setpostFlag(true);
                setresFlag(false);
                setsearchItem("");
              }}
              className="login-link mx-3 my-3"
              style={{
                color: "#F2F2F2",
                textDecoration: postFlag ? "" : "none",
              }}
              aria-current="page"
              to={`/${Id}`}
            >
              MY POSTS
            </RouterLink>
            {/* <Button className="mx-4 my-1" variant="contained" style={{color: "#475FCB", backgroundColor: "#F2F2F2" }} > */}
            <RouterLink
              onClick={() => {
                setrentFlag(true);
                setpostFlag(false);
                setresFlag(false);
                setsearchItem("");
              }}
              className="signup-link mx-4 my-3"
              style={{
                color: "#F2F2F2",
                textDecoration: rentFlag ? "" : "none",
              }}
              aria-current="page"
              to="/product/upload"
            >
              RENT THINGS?
            </RouterLink>
            {/* </Button> */}
            <Button
              className="my-2"
              variant="text"
              onClick={handleLogout}
              style={{
                color: "#475FCB",
                backgroundColor: "#F2F2F2",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
