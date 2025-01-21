import React, { useState, useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import './ProductList.css';
import { useEffect } from 'react';
import axios from 'axios';


const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [updateProduct, setUpdateProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  
  const categories = [
    'All',
    "Men's Fashion",
    "Women's Collection",
    "Kids Wear",
    "Electronics",
    "Home Appliances",
    "Sports",
    "Beauty",
    "Shoes",
    "Groceries",
  ];
   
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
  const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
fetchProducts();
  },[refresh]);

  const filteredProducts = selectedCategory === 'All'? products : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
     ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({...product, quantity });
    setQuantities((prev) => ({...prev, [product.id]: 1 }));
    alert('Item Added to cart');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(selectedProduct === product? null : product);
  };
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/product/${id}`);
      setRefresh(!refresh); // Trigger refresh to update the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:8080/product/${updateProduct.id}`, updateProduct);
      setRefresh(!refresh); // Trigger refresh to update the product list
      setUpdateProduct(null); // Close the update form
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div className="category-filter">
        <h4>Categories</h4>
        <div className="category-container">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-item ${selectedCategory === category? 'active' : ''}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        {sortedProducts.map((product) => (
          <div className="col-md-3" key={product.id}>
            <Card className="product-card" onClick={() => handleProductClick(product)}>
              <Card.Img variant="top" src={product.image_url || 'default-image-path.jpg'} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <div className="product-price">
                    ₹{new Intl.NumberFormat('en-IN').format(product.price - (product.price * product.discount) / 100)}{' '}
                    <Badge pill bg="success" className="discount-badge">
                      {product.discount}% Off
                    </Badge>
                  </div>
                  <div className="original-price">
                    <del>₹{new Intl.NumberFormat('en-IN').format(product.price)}</del>
                  </div>
                  <div className="product-rating">
                    <span>Rating: {product.rating}</span>
                  </div>
                  <div className="product-people-bought">
                    <span>{product.peopleBought} people bought this</span>
                  </div>
                  {selectedProduct && selectedProduct.id === product.id && (
                    <div className="product-description">
                      <p>{product.description}</p>
                    </div>
                  )}
                </Card.Text>
                <div className="quantity-control">
                  <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}>-</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}>+</button>
                </div>
                <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="add-to-cart-button">
                  Add to Cart
                </Button>
                
                
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ProductList;
