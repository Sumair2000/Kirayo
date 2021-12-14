import React,{useEffect} from "react";
import { Grid } from "@mui/material"
import {useSelector} from "react-redux";
import MyPost from "./MyPost/MyPost";
import {useDispatch} from "react-redux";
import { useParams } from 'react-router';
import {getMyPosts,getMyReservation} from "../../Actions/products"
import {useLocation} from "react-router-dom"


const MyPosts = ({reservation}) => {

  const location = useLocation();
  const products = useSelector((state) => state.products)

  const dispatch = useDispatch();

  const { id } = useParams();
  
    useEffect(() => {
      if(reservation){
        dispatch(getMyReservation(id));
      }
      else{
        dispatch(getMyPosts(id))
      }
    },[location])
    
  return (
    <div style={{marginTop: "70px"}}>
      {!products.length ? <h4 style={{textAlign: "center"}}>No Products...</h4>: (
      <Grid className="my-0"  container style={{ boxSizing:"border-box"}} spacing={4}>
        {products && products.length && products.map((product) => (
          <Grid item key={product.id}  xs={12} sm={6} md={4} lg={3} >
            <MyPost product={product} reservation={reservation} />
          </Grid>
        ))}
      </Grid>)}
    </div>
  )
}

export default MyPosts
