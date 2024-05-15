// ProductsComponent.js
import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import '../styles/ProductsComponent.css';

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        setError('Failed to retrieve products.');
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p className="error">{error}</p>}
      <div className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Available: {product.stockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsComponent;
