import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar } from './Components/Navbar';
import { Login } from './Components/Login';
import {SignUp} from './Components/SignUp';

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
