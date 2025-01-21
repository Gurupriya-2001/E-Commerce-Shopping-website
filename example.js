import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import products from '../components/Products';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false); // State for settings dropdown
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false); // State for login dropdown
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setSearchTerm('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(isLoginDropdownOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">KrazeCart</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>

              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" onClick={toggleSettingsDropdown}>
                    Hello, {user.name}
                  </Link>
                  {isSettingsDropdownOpen && (
                    <ul className="dropdown-menu show">
                      <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                      <li><Link className="dropdown-item" to="/account-settings">Account Settings</Link></li>
                      <li><Link className="dropdown-item" to="/my-reviews-and-ratings">My Reviews & Ratings</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button onClick={logout} className="dropdown-item">Logout</button></li>
                    </ul>
                  )}
                </li>
            
              ) : (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" onClick={toggleLoginDropdown}>
                    Login
                  </Link>
                  {isLoginDropdownOpen && (
                    <ul className="dropdown-menu show">
                      <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                      <li><Link className="dropdown-item" to="/account-settings">Account Settings</Link></li>
                      <li><Link className="dropdown-item" to="/payments">Payments</Link></li>
                      <li><Link className="dropdown-item" to="/coupons">My Coupons</Link></li>
                      <li><Link className="dropdown-item" to="/my-reviews-and-ratings">My Reviews & Ratings</Link></li>
                      <li><Link className="dropdown-item" to="/notifications">All Notifications</Link></li>
                      <li><Link className="dropdown-item" to="/wishlist">My Wishlist</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button onClick={logout} className="dropdown-item">Logout</button></li>
                    </ul>
                  )}
                </li>
              )}

              <li className="nav-item">
                <div className={`search-bar ${isSearchActive ? 'active' : ''}`}>
                  <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                    <button className="search-button" type="submit">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <circle cx="10.5" cy="10.5" r="7" />
                        <line x1="21" y1="21" x2="15.9" y2="15.9" stroke="white" strokeWidth="2" />
                      </svg>
                    </button>
                  </form>
                  {filteredProducts.length > 0 && (
                    <div className="search-results">
                      {filteredProducts.map(product => (
                        <Link key={product.id} to={`/products/${product.id}`} className="search-result-item">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link cart-link" to="/cart">
                  Cart <span className="cart-count">{cartCount}</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={toggleSidebar} aria-label="Menu">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="sidebar">
          <button className="close-sidebar" onClick={toggleSidebar}>X</button>
          <ul>
            <li><Link className="sidebar-item" to="/about">About</Link></li>
            <li><Link className="sidebar-item" to="/contact">Contact</Link></li>
            <li><Link className="sidebar-item" to="/customer-support">Customer Support</Link></li>
            {isAuthenticated && (
              <li><Link className="sidebar-item" to="/settings">Settings</Link></li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
