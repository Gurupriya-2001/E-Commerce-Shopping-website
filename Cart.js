import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css'; // Your custom styles

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Function to calculate the discount based on product data
  const calculateDiscount = (item) => {
    const discountAmount = item.price * (item.discount / 100);
    return discountAmount;
  };

  // Calculate the total price after applying discounts
  const totalPrice = cart.reduce((acc, item) => {
    const discount = calculateDiscount(item);
    const discountedPrice = item.price - discount;
    return acc + discountedPrice * item.quantity;
  }, 0);

  const handleRemove = (id) => {
    const confirmation = window.confirm('Do you want to remove this item from the cart?');
    if (confirmation) {
      removeFromCart(id);
      setTimeout(() => {
        alert('Item removed from cart');
      }, 0); // Ensure alert appears after item is removed
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h5>{item.name}</h5>
                <p>
                  Original Price: ₹{item.price}
                  <br />
                  Discount: ₹{calculateDiscount(item).toFixed(2)}
                  <br />
                  Price after Discount: ₹{(item.price - calculateDiscount(item)).toFixed(2)}
                </p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="btn btn-primary" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          </div>
          <button className="checkout-button" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
