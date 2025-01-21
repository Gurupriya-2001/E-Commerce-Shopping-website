import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';
import { CartContext } from '../context/CartContext';
import AdCarousel from './AdCarousel';

const products = [
  { id: 1, name: "Laptop", price: 50000, image: "https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg", discount: 10 },
  { id: 2, name: "Smartphone", price: 30000, image: "https://i.pinimg.com/736x/96/df/7f/96df7f5a560211a8a1db932f1ae4d7cd.jpg", discount: 5 },
  { id: 3, name: "Headphones", price: 5000, image: "https://i.pinimg.com/564x/7d/f9/aa/7df9aa663b75290477ee665c05f203fd.jpg", discount: 15 },
  { id: 4, name: "Smartwatch", price: 10000, image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL._AC_UF1000,1000_QL80_.jpg", discount: 20 },
  { id: 5, name: "Tablet", price: 25000, image: "https://m.media-amazon.com/images/I/4129iYx95yL.jpg", discount: 12 },
  { id: 6, name: "Gaming Console", price: 35000, image: "https://i.pinimg.com/564x/9c/d7/e7/9cd7e7e85fb52f60428a942675174f12.jpg", discount: 8 },
  { id: 7, name: "Bluetooth Speaker", price: 8000, image: "https://i.pinimg.com/564x/4a/ee/61/4aee61c5e49196b38b6c66c2bb3f4f42.jpg", discount: 5 },
  { id: 8, name: "External Hard Drive", price: 4000, image: "https://5.imimg.com/data5/VP/EC/MY-25796055/inspiron-14-3000-500x500.jpg", discount: 10 },
  { id: 9, name: "Wireless Mouse", price: 1500, image: "https://i.pinimg.com/564x/27/34/9d/27349d0ee27123849933aed0c9537e53.jpg", discount: 5 },
  { id: 10, name: "USB-C Hub", price: 2000, image: "https://i.pinimg.com/736x/e3/f3/95/e3f395f39c65985e39ec58687f01fa6d.jpg", discount: 15 },
];

const offers = [
  { id: 1, description: "Flat 10% off on Electronics", image: "https://tse2.mm.bing.net/th?id=OIG2.H2ueKxx6lVOXBDnkm4ew&w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" },
  { id: 2, description: "Buy 1 Get 1 Free on Headphones", image: "https://tse1.mm.bing.net/th?id=OIG3.MJahE7pZwnaLGyKrXO.P&w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" },
  { id: 3, description: "20% off on Selected Products", image: "https://tse2.mm.bing.net/th?id=OIG1.tjVf9m1mt4OBc5WdXh96&w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" },
  { id: 4, description: "Flat 15% off on Groceries", image: "https://tse3.mm.bing.net/th?id=OIG1.JxJuew1E7MYGRUvBYyvj&w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" },
  { id: 5, description: "a lot more deals", image: "https://tse1.mm.bing.net/th?id=OIG3.MJahE7pZwnaLGyKrXO.P&w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" },
  

];

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(Array(products.length).fill(1));
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product, index) => {
    alert ('Item Added to cart');
    const quantity = quantities[index];
    addToCart({ ...product, quantity });
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = 1; // Reset quantity after adding to cart
      return newQuantities;
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }; 

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="home">
      <h1>Welcome to KrazeCart!</h1>
      <AdCarousel />
      <h2 className="section-title">Exclusive Offers</h2>
      <div className="offers-container">
        {offers.map((offer) => (
          <div className="offer-card" key={offer.id}>
            <img src={offer.image} alt={offer.description} className="offer-image" />
            <div className="offer-description">
              <p>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="section-title">Featured Products</h2>
      <div className="products-container">
        {products.map((product, index) => {
          const discountedPrice = product.price - (product.price * product.discount / 100);
          return (
            <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">
                  <span className="discounted-price">₹{new Intl.NumberFormat('en-IN').format(discountedPrice)}</span>
                  <span className="original-price"> ₹{new Intl.NumberFormat('en-IN').format(product.price)}</span>
                  <span className="discount-badge">-{product.discount}%</span>
                </p>
                <div className="quantity-control">
                  <button onClick={(e) => { e.stopPropagation(); setQuantities((prev) => { const newQty = [...prev]; newQty[index] = Math.max(1, newQty[index] - 1); return newQty; }); }}>-</button>
                  <span>{quantities[index]}</span>
                  <button onClick={(e) => { e.stopPropagation(); setQuantities((prev) => { const newQty = [...prev]; newQty[index] += 1; return newQty; }); }}>+</button>
                </div>
                <button 
                  className="btn btn-primary add-to-cart-btn" 
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product, index); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid" />
            <p>Price: ₹{new Intl.NumberFormat('en-IN').format(selectedProduct.price)}</p>
            <p>Product Description: A great product for your needs!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
