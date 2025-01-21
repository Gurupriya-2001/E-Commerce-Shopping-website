import React from 'react';
import './CustomerSupport.css'; // Ensure you have a CSS file for styles

const handleLinkClick = (e, message) => {
  e.preventDefault(); // Prevents the default link behavior
  alert(message); // Displays a help message
};

const CustomerSupport = () => {
  const supportOptions = [
    {
      title: 'Your Orders',
      message: 'For help with your orders, please contact our customer service team at [insert contact info].',
      image: 'https://tinyurl.com/yckftp4j',
    },
    {
      title: 'Returns and Refunds',
      message: 'For help with returns and refunds, please visit our returns policy page at [insert URL].',
      image: 'https://tinyurl.com/4xcjcskm',
    },
    {
      title: 'Payment Settings',
      message: 'For help with payment settings, please contact our customer service team at [insert contact info].',
      image: 'https://img.icons8.com/?size=100&id=aMTIdm5CdddP&format=png&color=000000',
    },
    {
      title: 'Account Settings',
      message: 'For help with account settings, please visit our account settings page at [insert URL].',
      image: 'https://tinyurl.com/bdd5jde2',
    },
    {
      title: 'Manage Addresses',
      message: 'For help with managing addresses, please contact our customer service team at [insert contact info].',
      image: 'https://tinyurl.com/2kpkrucx',
    },
    {
      title: 'Digital Services and Device Support',
      message: 'For help with digital services and device support, please visit our support page at [insert URL].',
      image: 'https://tinyurl.com/22mepajf',
    },
  ];

  return (
    <div className="customerSupport">
      <h1>Hello. What can we help you with?</h1>
      <div className="supportOptions">
        {supportOptions.map((option, index) => (
          <div className="option" key={index}>
            <img src={option.image} alt={option.title} className="icon" />
            <a href="/" onClick={(e) => handleLinkClick(e, option.message)}>
              <h2>{option.title}</h2>
            </a>
            <p>{option.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSupport;