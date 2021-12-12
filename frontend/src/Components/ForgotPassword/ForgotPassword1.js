import React, {useState} from 'react'
import axios from "axios";
import {  useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./styles.css"
import { Paper } from '@mui/material';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';

const theme = createTheme();

export default function ForgotPassword1() {
  
  const history = useHistory();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email)
      return window.alert("Please enter an email")
    axios({
      method: "POST",
      url: "/auth/recover",
      data: { email },
    })
      .then((res) => {
        window.alert("Resend Email has been sent")
        history.push('/login')
      })
      .catch((err) => {
        window.alert(
          "Please check your email or account doesn't exist"
        );
      });
  };

  return (
    <ThemeProvider theme={theme}>
        <Paper className="paper" style={{marginTop: "100px", marginBottom: "71px", paddingLeft: "10px", paddingRight: "10px"}} elevation={5}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Avatar sx={{ m: 1 , bgcolor: 'secondary.main' }}>
            <RotateLeftSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                variant="standard"
                  required
                  style={{width: "20vw"}}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={ email} 
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  variant="body2" onClick={()=> history.push("/login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Paper>
      
    </ThemeProvider>
  );
}