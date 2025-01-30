import React, { useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  return (
    <div className="p-5">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li className="p-2 border" key={product.id}>
            <span>
              {product.name} - ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
