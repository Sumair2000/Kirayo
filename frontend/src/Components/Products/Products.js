import React,{useEffect} from "react";
import { Grid, Paper } from "@mui/material";
import { Product } from "./Product/Product";
import { useDispatch,useSelector } from "react-redux";
import {  useLocation } from 'react-router-dom';
import Paginations from "../Pagination/Paginations";
import { getProducts } from '../../Actions/products';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Products = () => {
  
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  const {allProducts} = useSelector((state) => state.products);
  const query = useQuery();

  const page = query.get('page') || 1;

  useEffect(() => {
    if(page)
    {
      dispatch(getProducts(page));
    }
  },[dispatch,page])  
  if(!products?.length && !allProducts?.length){
    return(
      <h4 style={{textAlign: "center"}}>No Products...</h4>
    )
  }

  return (
    <main >
      {products?.length && 
      <>
      <Grid
        className="grid"
        container
        style={{  boxSizing: "border-box"}}
        spacing={4}
      >
        {products?.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Paper className="my-2" elevation={2}>
        <Paginations page={page} />
      </Paper></>}
    </main>
  );
};
