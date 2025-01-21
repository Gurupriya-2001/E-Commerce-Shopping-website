import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // You can create a separate CSS file if needed

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((product) => (
            <div key={product.id} className="result-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found matching your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
