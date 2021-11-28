import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

const ProductInfo = (props) => {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price"> Rs{Product.price} Per {Product.rentType}</Descriptions.Item>
        <Descriptions.Item label="rentType"> {Product.rentType}</Descriptions.Item>
        <Descriptions.Item label="category"> {Product.category}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {" "}
          {Product.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger">
          Reserve
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
