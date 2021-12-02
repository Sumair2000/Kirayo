import React, { useState, useEffect } from "react";
import { Alert } from "../Components/Alert";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import HomePage from "../Components/Pages/HomePage";
import Login from "../Components/Login/Login";
import SignUp1 from "../Components/Signup/SignUp1";
import ForgotPassword1 from "../Components/ForgotPassword/ForgotPassword1";
// import Profile from "../Components/Pages/Profile";
import { AddPost } from "../Components/AddPost/AddPost";
import Navbar from "../Components/Navbar/Navbar";
// import {DetailProduct} from "../Components/Pages/DetailProduct";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/Banner/Banner";
import { Products } from "../Components/Products/Products";
import { EditProfile } from "../Components/EditProfile/EditProfile";
import { DetailProductPage } from "../Components/DetailProductPage/DetailProductPage";
import { useDispatch } from "react-redux";
import { getProducts } from "../Actions/products";
import { UploadProduct } from "../Components/UploadProduct/UploadProduct";
import MyPosts from "../Components/MyPosts/MyPosts";

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

  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getProducts());
  // },[dispatch])

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/products" />} />
        <Route exact path="/products/search">
          <Banner/>
          <Products />
        </Route>
        <Route exact path="/products">
          <Banner />
          <Products />
        </Route>
        <Route exact path="/login">
          <Login showAlert={showAlert} />
        </Route>
        <Route exact path="/signup">
          <SignUp1 showAlert={showAlert} />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword1 showAlert={showAlert} />
        </Route>
        <Route exact path="/viewProfile/:id">
          <EditProfile />
        </Route>
        <Route exact path="/product/upload">
          <UploadProduct product={false} />
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
      <Footer />
    </Router>
  );
};

export default MainRoute;
