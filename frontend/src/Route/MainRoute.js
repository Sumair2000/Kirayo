import React,{useState} from "react";
import  { Alert }  from "../Components/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage";
import Login from '../Components/Login/Login';
import SignUp1,{SignUp} from '../Components/Signup/SignUp1';
import ForgotPassword1 from "../Components/ForgotPassword/ForgotPassword1";
import Profile from "../Components/Pages/Profile";
import { AddPost } from "../Components/AddPost/AddPost";
import Navbar from "../Components/Navbar/Navbar";
const MainRoute = () => {

  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };


  return (
    <>
      <Router>
        <Switch>
          <Router  exact path="/">
            <HomePage  showAlert={showAlert} />
            {/* <Alert alert={alert} /> */}
          </Router>
          <Route exact path="/login">
          {/* <Alert alert={alert} /> */}
            <Login showAlert={showAlert} />
          </Route>
          <Route  exact path="/signup">
          <Alert alert={alert} />
            <SignUp1 showAlert={showAlert} />
          </Route>
          <Route  exact path="/forgotPassword">
            <Alert alert={alert} />
            <ForgotPassword1 showAlert={showAlert}/>
          </Route>
          <Route  exact path="/viewProfile/:id">
            <Profile showAlert={showAlert} />
          </Route>
          <Route exact path="/product/upload">
            <AddPost showAlert={showAlert} />
          </Route>
        </Switch>
        
      </Router>
    </>
  );
};

export default MainRoute;
