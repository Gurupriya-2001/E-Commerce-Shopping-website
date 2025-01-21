import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: <span style={{ textDecoration: 'line-through' }}>₹{product.price.toLocaleString()}</span> ₹{discountedPrice} <span className="discount-badge">-{product.discount}%</span></p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
