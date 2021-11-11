import React, {useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Products } from '../Products/Products'
import {getProducts} from "../../Actions/products"

const HomePage = (props) => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProducts());
  },[dispatch])
  return (
    <>
      <Navbar showAlert={props.showAlert}/>
      <Banner/>
      <Products/>
      {/* <Footer/> */}
    </>
  )
}

export default HomePage
