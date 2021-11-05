import "./App.css";

import { Provider } from "react-redux";
import store from './store';
import MainRoute from "./Route/MainRoute";
function App() {
  
  return (
    <Provider store={store}>
      <MainRoute/>   
    </Provider>
  );
}

export default App;
