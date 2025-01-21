// src/components/Footer.js
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            KrazeCart is your one-stop shop for the best deals on electronics, fashion, home appliances, and more. Our mission is to provide quality products at unbeatable prices.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/customer-support">Customer Support</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            123 KrazeCart Street<br />
            City, State, 12345<br />
            Phone: (123) 456-7890<br />
            Email: support@krazecart.com
          </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 KrazeCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
