import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './RemoveProduct.css'; // Use a similar CSS file for consistent styling

const RemoveProduct = ({ onBack }) => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRemoveProduct = async () => {
    if (!productId || !productName || !productType) {
      setErrorMessage('Please provide all required details.');
      return;
    }

    try {
      // Send DELETE request to the backend with the product ID
      const response = await axios.delete(`http://localhost:8080/product/${productId}`, {
        data: { id: productId, name: productName, category: productType }
      });

      if (response.status === 200) {
        alert(`Product with ID ${productId} removed successfully!`);
        if (onBack) onBack(); // Navigate back to the admin dashboard
      } else {
        setErrorMessage('Failed to remove product. Status code: ' + response.status);
        alert('Failed to remove product. Status code: ' + response.status);
      }
    } catch (error) {
      console.error('Error removing product:', error);

      // Improved error handling
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error removing product');
        alert(error.response.data.message || 'Error removing product');
      } else if (error.request) {
        setErrorMessage('No response received from the server.');
        alert('No response received from the server.');
      } else {
        setErrorMessage('Error: ' + error.message);
        alert('Error: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setProductId('');
    setProductName('');
    setProductType('');
    setErrorMessage('');
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Remove Product</h2>
      <form>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
          />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
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
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className=" btn btn-primary" onClick={handleRemoveProduct}>
            Remove Product
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RemoveProduct;
