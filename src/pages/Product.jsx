import React from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Product</div>
      <button onClick={() => navigate("info")}>Info</button>
      <button onClick={() => navigate("form")}>inquiry</button>
    </>
  );
};

export default Product;
