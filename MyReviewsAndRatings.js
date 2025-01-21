
import React, { useState, useEffect } from 'react';
import './MyReviewsAndRatings.css'; // Add CSS for styling

const MyReviewsAndRatings = () => {
  const [deliveredProducts, setDeliveredProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState({});
  const [submitted, setSubmitted] = useState({}); // Track submitted state for each product

  useEffect(() => {
    // Fetch orders from local storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    // Filter for delivered products
    const delivered = orders.flatMap(order => 
      order.items.filter(item => order.status === 'Delivered')
    );
    setDeliveredProducts(delivered);
  }, []);

  const handleReviewChange = (e, productId) => {
    setReviews({
      ...reviews,
      [productId]: e.target.value
    });
  };

  const handleRatingChange = (e, productId) => {
    setRating({
      ...rating,
      [productId]: e.target.value
    });
  };

  const handleSubmit = (e, productId) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log(`Review for product ${productId}:`, reviews[productId]);
    console.log(`Rating for product ${productId}:`, rating[productId]);

    // Set the submitted state to true for this product
    setSubmitted({
      ...submitted,
      [productId]: true
    });

    // Clear the form (optional)
    setReviews({
      ...reviews,
      [productId]: ''
    });
    setRating({
      ...rating,
      [productId]: ''
    });

    // Optionally, you can clear the success message after some time
    setTimeout(() => {
      setSubmitted({
        ...submitted,
        [productId]: false
      });
    }, 3000); // 3 seconds timeout before removing the message
  };

  return (
    <div className="reviews-container">
      <h1>My Reviews & Ratings</h1>
      {deliveredProducts.length === 0 ? (
        <p>No delivered products available for review.</p>
      ) : (
        deliveredProducts.map(product => (
          <div key={product.id} className="review-item">
            <img src={product.image} alt={product.name} className="review-item-image" />
            <div className="review-item-info">
              <h5>{product.name}</h5>
              <form onSubmit={(e) => handleSubmit(e, product.id)}>
                <div className="rating-container">
                  <label>Rating:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    value={rating[product.id] || ''} 
                    onChange={(e) => handleRatingChange(e, product.id)} 
                  />
                </div>
                <div className="review-container">
                  <label>Review:</label>
                  <textarea 
                    value={reviews[product.id] || ''} 
                    onChange={(e) => handleReviewChange(e, product.id)} 
                  />
                </div>
                <button type="submit" className="submit-button">Submit Review</button>
              </form>
              {submitted[product.id] && (
                <p className="submit-message">Submitted successfully!</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviewsAndRatings;
