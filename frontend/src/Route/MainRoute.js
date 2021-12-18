import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../Components/Login/Login";
import SignUp1 from "../Components/Signup/SignUp1";
import ForgotPassword1 from "../Components/ForgotPassword/ForgotPassword1";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/Banner/Banner";
import { Products } from "../Components/Products/Products";
import { EditProfile } from "../Components/EditProfile/EditProfile";
import { DetailProductPage } from "../Components/DetailProductPage/DetailProductPage";
import { UploadProduct } from "../Components/UploadProduct/UploadProduct";
import MyPosts from "../Components/MyPosts/MyPosts";
import Header from "../Components/Navbar/Header";
import {useSelector} from "react-redux";

const MainRoute = () => {
  const [URL, setURL] = useState(false)
  useEffect(() => {
      window.location.href.search("myReservations") > 0? setURL(true) : setURL(false)
    
  }, [window.location.href])
  
  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getProducts());
  // },[dispatch])
  const products = useSelector((state) => state.products)
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/products" />} />
        <Route exact path="/products/search">
          <Banner />
          <Products />
        </Route>
        <Route exact path="/products">
          <Banner />
          <Products />
        </Route>
        <Route exact path="/login">
          <Login  />
        </Route>
        <Route exact path="/signup">
          <SignUp1  />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword1  />
        </Route>
        <Route exact path="/viewProfile/:id">
          <EditProfile />
        </Route>
        <Route exact path="/product/upload">
          <UploadProduct product={false} />
        </Route>
        <Route exact path="/product/edit/:id">
          <UploadProduct product={products} />
        </Route>
        <Route exact path="/product/:id">
          <DetailProductPage />
        </Route>
        <Route exact path="/:id">
          <MyPosts reservation={false} />
        </Route>
        <Route exact path="/myReservations/:id">
          <MyPosts reservation={true} />
        </Route>
      </Switch>
      <Footer URL={URL} />
    </Router>
  );
};

export default MainRoute;
