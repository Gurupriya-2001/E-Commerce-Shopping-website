

import React, { useState, useEffect } from 'react';
import './Admin.css'; // Import the CSS file
import AddProduct from './AddProduct'; // Import the AddProduct component
import RemoveProduct from './RemoveProduct'; // Import the RemoveProduct component
import UpdateProduct from './UpdateProduct'; // Import the UpdateProduct component
import { useAuth } from '../components/AuthContext'; // Adjust the import based on your project structure

const Admin = () => {
  const { logout } = useAuth(); // Get the logout function from context
  const [activeView, setActiveView] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, [activeView]);

  const handleNavigation = (view) => {
    setActiveView(view);
    setShowDropdown(false); // Close dropdown when navigating
  };

  const handleManageProductsClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Call logout function
    window.location.href = '/login'; // Redirect to login page
  };

  const handleStatusChange = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'addProduct':
        return <AddProduct onBack={() => setActiveView('products')} />;
      case 'removeProduct':
        return <RemoveProduct onBack={() => setActiveView('products')} />;
      case 'updateProduct':
        return <UpdateProduct onBack={() => setActiveView('products')} />;
      case 'category':
        return <h2>Manage Categories</h2>;
      case 'stock':
        return <h2>Manage Stock</h2>;
      case 'shipped':
        return (
          <div>
            <h1>Shipped Products</h1>
            {orders.filter(order => order.status === 'Shipped').length === 0 ? (
              <p>No shipped orders to display.</p>
            ) : (
              orders.filter(order => order.status === 'Shipped').map((order, index) => (
                <div key={index} className="order-item">
                  <h3>Order Placed on: {order.date}</h3>
                  {order.items.map(item => (
                    <div key={item.id} className="order-details">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                      <div className="order-item-info">
                        <h5>{item.name}</h5>
                        <p>Price: ₹{item.price} x {item.quantity}</p>
                        <p>Total: ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <p>Status: {order.status}</p>
                </div>
              ))
            )}
          </div>
        );
      case 'orders':
        return (
          <div>
            <h1>Order Management</h1>
            {orders.length === 0 ? (
              <p>No orders to display.</p>
            ) : (
              orders.map((order, index) => (
                <div key={index} className="order-item">
                  <h3>Order Placed on: {order.date}</h3>
                  <h4>Delivery Address:</h4>
                  <p>Name: {order.address.name}</p>
                  <p>Address: {order.address.addressLine}</p>
                  <p>Landmark: {order.address.landmark || 'N/A'}</p>
                  <p>District: {order.address.district}</p>
                  <p>State: {order.address.state}</p>
                  <p>Country: {order.address.country}</p>
                  <p>Pin Code: {order.address.pinCode}</p>
                  {order.items.map(item => (
                    <div key={item.id} className="order-details">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                      <div className="order-item-info">
                        <h5>{item.name}</h5>
                        <p>Price: ₹{item.price} x {item.quantity}</p>
                        <p>Total: ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <p>Status: {order.status}</p>
                  {order.status !== 'Delivered' && (
                    <>
                      {order.status !== 'Shipped' && (
                        <button
                          onClick={() => handleStatusChange(index, 'Shipped')}
                          className="status-button"
                        >
                          Mark as Shipped
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(index, 'Delivered')}
                        className="status-button"
                      >
                        Mark as Delivered
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        );
      case 'products':
        return (
          <div >
            <h2 className="dropdown-header" onClick={handleManageProductsClick}>
            <button className=" mt-3 btn btn-primary"> Manage Products</button>
            </h2>
            {showDropdown && (
              <div className="dropdown-list animated">
                <div 
                  className="dropdown-item" 
                  onClick={() => handleNavigation('addProduct')}
                >
                  <button className=" mt-3 btn btn-success"> Add Product</button>
                </div><br></br>
                <div 
                  className="dropdown-item"
                  onClick={() => handleNavigation('removeProduct')}
                >
                 <button className="mb-3 btn btn-success"> Remove Products</button>
                </div>
                <div 
                  className="dropdown-item"
                  onClick={() => handleNavigation('updateProduct')}
                >
                  <button className="mb-3 btn btn-success"> Update Products List</button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <h1>Welcome to Admin Dashboard</h1>;
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <div className="grid-container">
        <div className="grid-item" onClick={() => handleNavigation('products')}>
          <span>Products</span>
        </div>
        
        <div className="grid-item" onClick={() => handleNavigation('shipped')}>
          <span>Shipped</span>
        </div>
        <div className="grid-item" onClick={() => handleNavigation('orders')}>
          <span>Orders</span>
        </div>
        <div className="grid-item" onClick={handleLogout}>
          <span>Logout</span>
        </div>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
