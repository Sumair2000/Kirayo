import React from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const MyPost = ({product}) => {

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    console.log(product._id);
    axios({
      method: "delete",
      url: `/product/${product._id}`
    }).then((res) => {
      window.alert("Product deleted successfully");
    }).catch((err) => {
      console.log(err);
    })
  }
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
      <img src={`http://localhost:5000/${product.images[0]}`} height="190" width="315.8"/>
      {/* <CardMedia component="img" height="190" image={product.images[0].replace("mypost/","")} /> */}
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
        <CardActions style={{padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between',marginTop: '10px'}}>
            <Button size="small"  ><EditIcon color="success" /></Button>
            <Button size="small" onClick={handleDeleteProduct} ><DeleteIcon color="warning"/></Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default MyPost