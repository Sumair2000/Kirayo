import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import {Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { red } from "@mui/material/colors";
import moment from "moment";
// import { ImageSlider } from "./ImageSlider";
import  "./styles.css"

export const Product = ({ product }) => {
 

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      style={{
        margin: "20px",
        height: "50vh",
      }}
      elevation={2}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.userName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.userName}
        subheader={moment(product.createdAt).fromNow()}
      />
      {/* <img src={`http://localhost:5000/${product.images[0]}`}/> */}
      {/* <Carousel autoPlay animation="slide" interval={3000}>
        { product.images.map((image) => ( */}
            <CardMedia component="img" height="190" image={product.images[0]} />
          {/* ))
        }
      </Carousel> */}
      <CardContent>
        <Typography
          gutterBottom
          style={{ fontSize: "100%", fontWeight: "bold" }}
          color="textSecondary"
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          style={{ fontSize: "90%" }}
          color="textSecondary"
        >
          Rs {product.price} Per {product.rentType}
        </Typography>
        <CardActions style={{ marginLeft: "220px" }}>
          <Link to={`/product/${product._id}`} style={{textDecoration: "none"}}>
            <Button size="small">View</Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};
