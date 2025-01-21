import React, { useState } from 'react';
import './ProductCard.css';
import ProductDescriptionModal from './ProductDescriptionModal'; // Import the modal component

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div className="card product-card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          Price: <span style={{ textDecoration: 'line-through' }}>₹{product.price.toFixed(2)}</span> ₹{discountedPrice} <span className="discount-badge">-{product.discount}%</span>
        </p>
        <button className="btn btn-primary" onClick={handleShowModal}>View Details</button>
        <button className="btn btn-secondary">Add to Cart</button>
      </div>

      <ProductDescriptionModal show={showModal} handleClose={handleCloseModal} product={product} />
    </div>
  );
};

export default ProductCard;
