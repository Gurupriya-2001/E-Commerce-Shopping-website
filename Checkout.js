


import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const { cart, emptyCart } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('');

    // Address details
    const [name, setName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');

    // Payment details
    const [cardName, setCardName] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [showPayment, setShowPayment] = useState(false);

    // Order status
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [submittedOrder, setSubmittedOrder] = useState(null);
    
    // Saved addresses
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Load saved addresses from local storage
        const addresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        setSavedAddresses(addresses);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate address fields
        if (!selectedAddress && (!name || !addressLine || !district || !state || !country || !pinCode)) {
            alert('Please fill in all required fields or select a saved address.');
            return;
        }

        // Prepare order details
        const newOrder = {
            items: cart,
            date: new Date().toLocaleString(),
            status: 'Placed',
            paymentMethod,
            address: selectedAddress ? JSON.parse(selectedAddress) : {
                name,
                addressLine,
                landmark: landmark || 'N/A', // Optional
                district,
                state,
                country,
                pinCode,
            },
        };

        // Store order details in local storage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

        // Set order status
        setSubmittedOrder(newOrder);
        setOrderPlaced(true);

        // Empty the cart and navigate
        emptyCart();
        alert('Your order has been placed successfully!');
        navigate('/orders');
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(JSON.stringify(address));
        setName(address.name);
        setAddressLine(address.addressLine);
        setLandmark(address.landmark);
        setDistrict(address.district);
        setState(address.state);
        setCountry(address.country);
        setPinCode(address.pinCode);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="product-summary">
                <h3>Order Summary</h3>
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h5>{item.name}</h5>
                            <p>Price: ₹{item.price} x {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Select or Add Address</h3>
                <div className="saved-addresses">
                    {savedAddresses.length > 0 ? (
                        savedAddresses.map((address, index) => (
                            <div key={index} className="saved-address" onClick={() => handleSelectAddress(address)}>
                                <p><strong>{address.name}</strong></p>
                                <p>{address.addressLine}, {address.landmark}, {address.district}, {address.state}, {address.country}, {address.pinCode}</p>
                            </div>
                        ))
                    ) : (
                        <p>No saved addresses available. Please add one.</p>
                    )}
                </div>

                <h3>Add New Address</h3>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine">Address Line:</label>
                    <input
                        type="text"
                        id="addressLine"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        required
                        placeholder="Enter your address line"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="landmark">Landmark (optional):</label>
                    <input
                        type="text"
                        id="landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Enter a landmark"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <input
                        type="text"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        placeholder="Enter your district"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="Enter your state"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder="Enter your country"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pinCode">Pin Code:</label>
                    <input
                        type="text"
                        id="pinCode"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                        placeholder="Enter your pin code"
                    />
                </div>

                {/* Toggle Payment Button */}
                <button
                    type="button"
                    onClick={() => setShowPayment(!showPayment)}
                    className="toggle-payment-button btn btn-primary"
                >
                    {showPayment ? 'Hide Payment Options' : 'Show Payment Options'}
                </button>

                {/* Payment Section */}
                {showPayment && (
                    <div className="payment-section">
                        <h3>Payment Details</h3>
                        <div className="payment-methods">
                            {['Credit/Debit Card', 'UPI', 'Cash On Delivery'].map((method) => (
                                <label key={method}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    {method}
                                </label>
                            ))}
                        </div>

                        {paymentMethod === 'Credit/Debit Card' && (
                            <div>
                                <label htmlFor="cardName">Card Name:</label>
                                <input
                                    type="text"
                                    id="cardName"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="Enter card holder's name"
                                    required
                                />

                                <label htmlFor="cardNum">Card Number:</label>
                                <input
                                    type="text"
                                    id="cardNum"
                                    value={cardNum}
                                    onChange={(e) => setCardNum(e.target.value)}
                                    placeholder="Enter card number"
                                    required
                                />

                                <label htmlFor="expMonth">Expiry Month:</label>
                                <input
                                    type="text"
                                    id="expMonth"
                                    value={expMonth}
                                    onChange={(e) => setExpMonth(e.target.value)}
                                    placeholder="MM"
                                    required
                                />

                                <label htmlFor="expYear">Expiry Year:</label>
                                <input
                                    type="text"
                                    id="expYear"
                                    value={expYear}
                                    onChange={(e) => setExpYear(e.target.value)}
                                    placeholder="YY"
                                    required
                                />

                                <label htmlFor="cvv">CVV:</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="Enter CVV"
                                    required
                                />
                            </div>
                        )}

                        {paymentMethod === 'UPI' && (
                            <div>
                                <label htmlFor="upiId">UPI ID:</label>
                                <input
                                    type="text"
                                    id="upiId"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="Enter UPI ID"
                                    required
                                />
                            </div>
                        )}
                    </div>
                )}

                <button type="submit" className="checkout-button ">
                    Place Order
                </button>
            </form>

            {orderPlaced && (
                <div className="order-confirmation">
                    <h3>Your Order has been Placed!</h3>
                    <p>{JSON.stringify(submittedOrder, null, 2)}</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
