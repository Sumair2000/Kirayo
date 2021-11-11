import React from "react";
import { Grid } from "@mui/material"
import { Product } from "./Product/Product";
import {useSelector} from "react-redux";


export const Products = () => {

  const products = useSelector((state) => state.products)
  return (
    <main >
      <Grid className="my-0" paddingLeft="10px" container style={{backgroundColor: "lightgray"}} spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id}  xs={12} sm={6} md={4} lg={3} >
            <Product product={product}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
