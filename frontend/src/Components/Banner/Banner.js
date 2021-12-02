import React, { useState,useEffect } from "react";
import image from '../../Images/cover.png'
import {Link} from "react-router-dom"
import "./Banner.css";
import { Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import {getProducts} from "../../Actions/products"
import DynamicPosts from "../DynamicPosts/DynamicPosts";

function Banner() {

  let [category, setCategory] = useState();
  // const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(getProducts());
  // },[dispatch])

  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="All Categories">All Categories</option>
              <option value="Tools">Tools</option>
              <option value="Apparels">Apparels</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Equipments">Equipments</option>
              <option value="Footwear">Footwear</option>
              <option value="Appliances">Appliances</option>
              <option value="Toys">Toys</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Tools")} >Tools</span>
            <span onClick={()=>setCategory("Apparels")} >Apparels</span>
            <span onClick={()=>setCategory("Vehicles")} >Vehicles</span>
            <span onClick={()=>setCategory("Equipments")} >Equipments</span>
            <span onClick={()=>setCategory("Footwear")} >Footwear</span>
          </div>
        </div>
        <Paper elevation={1} >
        <div className="banner my-2">
          <img src={image} alt="image" />
        </div>
        </Paper>
      </div>
      { category!=null && <DynamicPosts category={category} />  }
    </div>
  );
}

export default Banner;