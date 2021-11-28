import React, { useState,useEffect } from "react";
import image from '../../Images/cover.png'
import "./Banner.css";
import { Paper } from "@mui/material";
import { useDispatch } from 'react-redux';
import {getProducts} from "../../Actions/products"
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
              <option value="null">ALL CATEGORIES</option>
              <option value="Tools">Tools</option>
              <option value="Apparels">Apparels</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Equipments">Equipments</option>
              <option value="Footwear">Footwear</option>
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
          <img src={image} alt="hello" />
        </div>
        </Paper>
      </div>
    </div>
  );
}

export default Banner;