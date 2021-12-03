import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../Products/Product/Product";
import { searchProductByCategory } from "../../Actions/products";

const DynamicPosts = ({ category }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchProductByCategory(category));
  }, [dispatch,category]);
  
  const {allProducts} = useSelector((state) => state.products);
  return (
    <>
    <h3 style={{textAlign: "center"}}>{category}</h3>
     <Grid
        className="my-0"
        container
        style={{  boxSizing: "border-box", margin: "0px", width: "100%" }}
        spacing={4}
      >
        {allProducts? allProducts?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
            <Product product={product} />
          </Grid>
        )): <h1>No Products Found..</h1>}
      </Grid>
    </>
  );
};

export default DynamicPosts;
