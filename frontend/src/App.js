import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar } from './Components/Navbar';
import { Login } from './Components/Login';
import {SignUp} from './Components/SignUp';
import {useState} from 'react';
import {Alert} from './Components/Alert';
import { ForgotPassword } from './Components/ForgotPassword';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message,type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setalert(null);
    },1500);
  }
  return (
    <div>
      <Router>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
      <Switch>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
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
  );
}

export default App;
