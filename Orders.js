



import React, { useEffect, useState } from 'react';
import './Orders.css'; // Assuming you have a CSS file for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cancelMessage, setCancelMessage] = useState('');

  useEffect(() => {
    // Retrieve orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setCancelMessage('Order cancelled');
  };

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {cancelMessage && <p className="cancel-message">{cancelMessage}</p>}
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
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
            <h4>Payment Method:</h4>
            <p>{order.paymentMethod}</p>
            <h4>Order Items:</h4>
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
              <button onClick={() => handleCancelOrder(index)} className="cancel-button">Cancel Order</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
