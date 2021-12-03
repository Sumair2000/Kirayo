import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/authAction";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from '@mui/material';
import "./login.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Kirayo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {

  const dispatch = useDispatch();
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setuserInfo({ ...userInfo, [name]: value });
  };

  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "/auth/googlelogin",
      data: { email: response.email, tokenId: response.tokenId },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/");
        window.alert("Account Login Successfully");
      })
      .catch((err) => {
        window.alert("Please register your gmail account");
      });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userInfo.email || !userInfo.password) return window.alert("Please enter all fields.")
    dispatch(loginUser(userInfo, history));
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className="paper" style={{ margin: "auto" , marginTop: "100px"}} elevation={5}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={userInfo.email}
              autoComplete="email"
              autoFocus
              onChange={handleInputs}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userInfo.password}
              onChange={handleInputs}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  className="fogotPassword-link"
                  onClick={() => history.push("/forgotPassword")}
                  variant="body2"
                >
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="signup-link"
                  to="/signup"
                  onClick={() => window.open("/signup", "_parent")}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ m: 2 }}>
              OR
            </Divider>
            <GoogleLogin
              className="google-login"
              theme="dark"
              clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
              buttonText="Login With Google "
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Box>
      </Container>
      </Paper>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
