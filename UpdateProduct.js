import React, { useState } from 'react';
import './AddProduct.css'; // Ensure this CSS file has styles for your form
import axios from 'axios';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateProduct = async () => {
    if (!productId) {
      setErrorMessage('Please provide a valid product ID.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/product/${productId}`, {
        name: productName,
        category: productType,
        description: productDescription,
        price: parseFloat(price),
        discount: parseFloat(discount),
        stockQuantity: parseInt(stockQuantity, 10),
        imageUrl: imageUrl
      });
      setSuccessMessage('Product updated successfully!');
      alert('Your product has been updated successfully!'); // Show alert on success
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Failed to update the product. Please try again.');
    }
  };

  const handleCancel = () => {
    // Clear the form fields
    setProductId('');
    setProductName('');
    setProductType('');
    setProductDescription('');
    setPrice('');
    setDiscount('');
    setStockQuantity('');
    setImageUrl('');
    setSuccessMessage('');
    setErrorMessage('');
    alert('Update cancelled. All changes have been discarded.'); // Show alert on cancel
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Update Product</h2>
      <form>
        <div className="form-group">
          <label>Product ID</label>
          <input 
            type="text" 
            value={productId} 
            onChange={(e) => setProductId(e.target.value)} 
            placeholder="Enter product ID to update"
          />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Type</label>
          <select 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Men's Fashion">Men's Fashion</option>
            <option value="Women's Collection">Women's Collection</option>
            <option value="Kids Wear">Kids Wear</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
            <option value="Shoes">Shoes</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>
        <div className="form-group">
          <label>Product Description</label>
          <textarea 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            step="0.01"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Discount</label>
          <input 
            type="number" 
            step="0.01"
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input 
            type="number" 
            value={stockQuantity} 
            onChange={(e) => setStockQuantity(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </div>
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>
            Update Product
          </button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UpdateProduct;
