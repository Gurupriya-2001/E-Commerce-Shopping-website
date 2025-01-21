import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ProductDescriptionModal.css';

const ProductDescriptionModal = ({ show, handleClose, product }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <img src={product.image} className="img-fluid product-image" alt={product.name} />
        <div className="product-details">
          <p><strong>Price:</strong> ₹{(product.price - (product.price * (product.discount / 100))).toFixed(2)}</p>
          <p><strong>Discount:</strong> {product.discount}%</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>People Bought:</strong> {product.bought}</p>
          <p>{product.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDescriptionModal;
