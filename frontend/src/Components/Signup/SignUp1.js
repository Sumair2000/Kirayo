import React, {useState} from 'react'
import GoogleLogin from "react-google-login";
import axios from "axios";
import {  useHistory } from "react-router-dom";
import { signupUser } from '../../Actions/authAction'; 
import {useDispatch} from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./styles.css"
import { Paper } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://Kirayo.com/">
        Kirayo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp1() {

  const history = useHistory();
  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "/auth/googlesignup",
      data: { email: response.email, tokenId: response.tokenId },
    }).then((response) => {
      window.alert("Account Registered successfully");
      history.push('/login')
    }).then(err =>{
      window.alert("This account is already registerted");
      history.push('/signup')
    })
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  
  const dispatch = useDispatch();
  const [errors, seterrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('');
  const [name, setname] = useState('');

  const handleEmail =e => {
    const { target: {value}} = e;
    seterrors({email: '', password: '', confirmPassword: '', name: ''});
    setemail(value)
    let reg = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)
    if(!reg) {
      seterrors({...errors, email: "Please use valid email address"})
    }
  }
  const handlePassword = e => {
    const { target: {value}} = e;
    seterrors({email: '', password: '', confirmPassword: '', name: ''});
    setpassword(value)
    if(value.length<6) {
      seterrors({...errors,password: "Password must atleast 6 characters"})
    }
  }
  const handleConfirmPassword = e => {
    const { target: {value}} = e;
    seterrors({email: '', password: '', confirmPassword: '', name: ''});
    setconfirmPassword(value)
    if(password!==value) {
      seterrors({...errors,confirmPassword: "Password do not match"})
    }
  }
  const handleName = e => {
    const { target: {value}} = e;
    seterrors({email: '', password: '', confirmPassword: '', name: ''});
    setname(value)
    let reg = RegExp(/^[a-zA-Z\s]*$/).test(value)
    if(!reg) {
      seterrors({...errors,name: "Name should not contain numeric and special characters"})
    }
  }
  const nameCondition = /^[a-z]+$/;
  const condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !confirmPassword || !password || !name) return window.alert("Please fill all required fields.")
    if(!email.match(condition)) return window.alert("Please enter valid email.");
    if(password.length<6 || confirmPassword.length<6) return window.alert("Password must be alteast 6 characters.")
    if(!name.match(nameCondition)) return window.alert("Name should not contain numeric and special characters.")
    const user = {name,email,password,confirmPassword}
    dispatch(
      signupUser(user,history));
    
  }

  return (
    <ThemeProvider theme={theme}>
        <Paper className="paper" elevation={5} style={{marginTop: "90px"}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={ name} 
                  error={Boolean(errors?.name)}
                  helperText={(errors?.name)}
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={ email} 
                  error={Boolean(errors?.email)}
                  helperText={(errors?.email)}
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={ password} 
                  onChange={handlePassword}
                  error={Boolean(errors?.password)}
                  helperText={(errors?.password)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={ confirmPassword} 
                  error={Boolean(errors?.confirmPassword)}
                  helperText={(errors?.confirmPassword)}
                  onChange={handleConfirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ m: 2 }}>
              OR
            </Divider>
            <GoogleLogin
              className="google-login"
              theme= "dark"
              clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
              buttonText="SignUp With Google "
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Box>
      </Container>
      </Paper>
        <Copyright sx={{ mt: 5 }} />
      
    </ThemeProvider>
  );
}