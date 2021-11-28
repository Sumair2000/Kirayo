import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import { useParams } from "react-router-dom";
import "./styles.css";
import { Button } from "@material-ui/core";
import {useDispatch} from "react-redux";
import moment from 'moment'
import {reserved} from "../../Actions/products";

export const DetailProductPage = () => {
  const { id } = useParams();
  const [Product, setProduct] = useState([]);
  const [Reservation, setReservation] = useState([])
  useEffect(() => {
    axios.get(`/product/${id}`).then((response) => {
      setProduct(response.data.product);
      setReservation(response.data.reserve);
    });
  }, []);

  const handleButton = async (e) => {
     e.preventDefault();
     axios({
       method: "POST",
       url: "/product/reserve",
       data: { userId: Product.userId, productId: Product._id, isReserved: true }
     })
     .then((res) => {
      window.alert("Reserved successfully");
      e.disabled= true;
    })
    .catch((err) => {
      window.alert("Error while reserving you product");
    });
  }
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <ProductImage detail={Product} />
      </div>{" "}
      <div className="rightSection">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <h1>{Product.title}</h1>
        </div>

        <div className="productDetails">
          <p>
            &#8360; {Product.price} Per {Product.rentType}{" "}
          </p>
          <span>{Product.name}</span>
          <p>{Product.address}</p>
          <span>{moment(Product.createdAt).fromNow()}</span>
        </div>
        <div className="productDescription">
          <p className="p-bold">Product Description</p>
          <p>{Product.description}</p>
        </div>
        <div className="contactDetails">
          <p className="p-bold">Seller details</p>
          <p>Name : {Product.userName}</p>
          <p>Phone : {Product.phoneNumber}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#475FCB",
              color: "#F2F2F2",
              textTransform: "none",
            }}
            disabled={Reservation[0]?.isReserved}
            onClick={handleButton}
          >
            {Reservation[0]?.isReserved? 'Reserved' : 'Reserve'}
          </Button>
        </div>
      </div>
    </div>
  );
};
