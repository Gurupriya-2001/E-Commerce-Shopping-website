import React from 'react';
import ProductItem from './ProductItem';
import products from './Products'; // Import the products array

const Products = () => {
    return (
        <div>
            <h1>Products Page</h1>
            <p>Here you can find a list of products.</p>
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
