import React from "react";
import Product from "../pages/Product";
import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <div>
      <Product />
      <Outlet />
    </div>
  );
};

export default ProductLayout;
