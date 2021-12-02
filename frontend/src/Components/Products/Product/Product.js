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
import { red } from "@mui/material/colors";
import moment from "moment";

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
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <img src={`http://localhost:5000/${product.images[0]}`} style={{height: "190px", maxHeight: "100%", minHeight: "100%", maxWidth: "100%", textAlign: "center"}}/>
      </div>
      {/* <Carousel autoPlay animation="slide" interval={3000}>
        { product.images.map((image) => ( */}
            {/* <CardMedia component="img" height="190" image={product.images[0]} /> */}
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
