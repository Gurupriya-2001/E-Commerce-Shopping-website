import React, { useState } from 'react';
import './AddProduct.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock_quantity: '',
    category: '',
    product_id: '',
    image_url: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/product', product);
      console.log('Product added:', response.data);
      alert('Product added successfully'); // Show success alert
      setProduct({
        name: '',
        price: '',
        description: '',
        stock_quantity: '',
        category: '',
        product_id: '',
        image_url: ''
      });
      navigate('/admin'); // Navigate back to the Admin Dashboard
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={addProduct}>
      <div>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Stock Quantity:</label>
        <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="image_url" value={product.image_url} onChange={handleChange} required />
      </div>
      <div>
        <label>Product ID:</label>
        <input type="number" name="product_id" value={product.product_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="Women's Collection">Women's Collection</option>
          <option value="Men's Fashion">Men's Fashion</option>
          <option value="Kids Wear">Kids Wear</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Shoes">Shoes</option>
          <option value="Groceries">Groceries</option>
        </select>
      </div>
      <button  className=" mt-3 btn btn-primary" type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
