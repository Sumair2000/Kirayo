import "./App.css";
import { Provider } from "react-redux";
import store from './store';
import MainRoute from "./Route/MainRoute";
function App() {
  
  return (
    // <Router>
      <Provider store={store}>
        <MainRoute/>   
      </Provider>
    // </Router>
  );
}

export default App;
