import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MyPost = ({ product, reservation }) => {

  const history = useHistory();
  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/product/edit/${product._id}`);
    
    
  };

  const handleUnreserved = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to unreserved the product?")){
      axios({
        method: "delete",
        url: `/product/reserve/${product._id}`,
      })
        .then((res) => {
          window.alert("Product unreserved successfully.")
          history.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      history.push('/');
    }
   
  }
  const handleDeleteProduct = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete the product?"))
    {
      axios({
        method: "delete",
        url: `/product/${product._id}`,
      })
        .then((res) => {
          window.alert("Product deleted successfully");
          history.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      history.push('/');
    }
    
  };
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
            {product.userName.charAt(0).toUpperCase() || "J"}
          </Avatar>
        }
        title={product.userName}
        subheader={moment(product.createdAt).fromNow()}
      />
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <img src={`http://localhost:5000/${product.images[0]}`} loading="lazy" style={{height: "190px", maxHeight: "100%", minHeight: "100%", maxWidth: "100%", textAlign: "center"}}/>
      </div>
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
        {!reservation ? (
          <CardActions
            style={{
              padding: "0 16px 8px 16px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button size="small" onClick={handleEdit}>
              <EditIcon color="success" />
            </Button>
            <Button size="small" onClick={handleDeleteProduct}>
              <DeleteIcon color="warning" />
            </Button>
          </CardActions>
        ) : (
          <CardActions
            style={{justifyContent: "right"}}
          >
            <Button
              size="small"
              onClick={handleUnreserved}
              style={{
                backgroundColor: "red",
                color: "white",
                textTransform: "none",
              }}
            >
              Unreserve
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};

export default MyPost;
