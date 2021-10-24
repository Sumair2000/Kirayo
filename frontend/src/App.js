import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Components/Login/Login";
import { SignUp } from "./Components/Signup/SignUp";
import { useState } from "react";
import { Alert } from "./Components/Alert";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Provider } from "react-redux";
import store from './store';
function App() {
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
    <Provider store={store}>
      <div>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <SignUp showAlert={showAlert} />
            </Route>
            <Route exact path="/forgotPassword">
              <ForgotPassword showAlert={showAlert} />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
