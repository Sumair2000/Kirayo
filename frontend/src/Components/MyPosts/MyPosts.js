import React,{useEffect} from "react";
import { Grid } from "@mui/material"
import {useSelector} from "react-redux";
import MyPost from "./MyPost/MyPost";
import {useDispatch} from "react-redux";
import { useParams } from 'react-router';
import {getMyPosts} from "../../Actions/products"

const MyPosts = () => {

  const products = useSelector((state) => state.products)

  const dispatch = useDispatch();

  const { id } = useParams();
    useEffect(() => {
      dispatch(getMyPosts(id));
    },[dispatch,id])

  return (
    <div style={{marginTop: "70px"}}>
      {products ? 
      <Grid className="my-0"  container style={{ boxSizing:"border-box"}} spacing={4}>
        {products && products.length && products.map((product) => (
          <Grid item key={product.id}  xs={12} sm={6} md={4} lg={3} >
            <MyPost product={product} />
          </Grid>
        ))}
      </Grid> : <div><h1>No Posts...</h1></div>}
    </div>
  )
}

export default MyPosts
