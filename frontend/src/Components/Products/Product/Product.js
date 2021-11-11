import React, {useEffect} from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  ButtonBase
} from "@mui/material";
  import { Carousel } from 'react-responsive-carousel';
import { red } from "@mui/material/colors";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import { ImageSlider } from "./ImageSlider";

export const Product = ({ product }) => {

  const history = useHistory();
  const detailProduct = (e) => {
    history.push(`/product/${product._id}`)
  }

  return (
    // <ButtonBase component="span" onClick={detailProduct}>
    <Card sx={{ maxWidth: "100%" }} style={{margin: "20px", paddingLeft: "0", paddingRight: "0"}} elevation={2}>
      
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              { product.userName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.userName}
          subheader={moment(product.createdAt).fromNow()}
        />
        {/* <img src={`http://localhost:5000/${product.images[0]}`}/> */}
        <CardMedia
          component="img"
          height="190"
          image={product.images[0]}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" color="textSecondary">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h7"  color="textSecondary">
            Rs {product.price}
          </Typography>
          <Typography gutterBottom variant="h7" color="textSecondary">
            {" "}
            Per {product.rentType}
          </Typography>
        </CardContent>
      
    </Card>
    // </ButtonBase>
  );
};
