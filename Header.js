import React, { useState } from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [message, setMessage] = useState('');

  const handleSectionClick = (section) => {
    setMessage(`You clicked on ${section}!`);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">{pageTitle.title}</h1>
        <p className="header-subtitle">{pageTitle.subtitle}</p>
      </div>

      {location.pathname === '/' && (
        <div className="header-sections">
          <div className="header-section" onClick={() => handleSectionClick('Featured Products')}>
            <h2>Featured Products</h2>
          </div>
          <div className="header-section" onClick={() => handleSectionClick('Latest Offers')}>
            <h2>Latest Offers</h2>
          </div>
          <div className="header-section" onClick={() => handleSectionClick('Customer Support')}>
            <h2>Customer Support</h2>
          </div>
        </div>
      )}

      {message && <div className="alert-message">{message}</div>}
    </header>
  );
};

const getPageTitle = (path) => {
  switch (path) {
    case '/products':
      return { title: 'Products', subtitle: 'Explore our range of products' };
    case '/about':
      return { title: 'About Us', subtitle: 'Learn more about us' };
    case '/contact':
      return { title: 'Contact Us', subtitle: 'Get in touch with us' };
    case '/customer-support':
      return { title: 'Customer Support', subtitle: 'We are here to help' };
    case '/login':
      return { title: 'Login', subtitle: 'Access your account' };
    default:
      return { title: 'Welcome to KrazeCart', subtitle: 'Your one-stop shop for everything!' };
  }
};

export default Header;
