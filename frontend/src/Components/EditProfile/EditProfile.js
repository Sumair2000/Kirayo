import React,{useEffect} from 'react'
import {Paper,Typography,TextField,Container,CssBaseline,Avatar,Box} from "@mui/material";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../Actions/authAction';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';

const theme = createTheme();

export const EditProfile = () => { 

  const  user   = useSelector((state) => state.auth.user) 
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserDetails(id))
  },[id])


  return (
    <ThemeProvider theme={theme}>
      <Paper className="paper" style={{marginTop: "85px", marginBottom: "20px"}}  elevation={5}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
            {user.name && user.name.charAt(0).toUpperCase() }
          </Avatar>
          <Typography component="h1" variant="h5">
            Your Profile
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography>Name</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              value={user.name}
              name="name"
              autoFocus
              disabled={true}
            />
            <Typography>Email</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              value={user.email}
              name="email"
              autoFocus
              disabled={true}
            />
          </Box>
        </Box>
      </Container>
      </Paper>
    </ThemeProvider>
  )
}
