import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductService from '../services/ProductService';
import '../styles/ProductsComponent.css';
import { useFilter } from '../contexts/FilterContext';

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();
  const { filters } = useFilter();

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        let filteredProducts = data;

        // Apply category filter
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }

        // Apply sorting
        if (filters.sortOrder) {
          filteredProducts = filteredProducts.sort((a, b) => {
            if (filters.sortOrder === 'low-high') {
              return a.price - b.price;
            } else if (filters.sortOrder === 'high-low') {
              return b.price - a.price;
            }
            return 0;
          });
        }

        setProducts(filteredProducts);
      })
      .catch(err => {
        setError('Failed to retrieve products.');
        console.error(err);
      });
  }, [filters]);

  const handleProductClick = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <div className="products-container">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="product-price">Price: ${product.price}</p>
              <p>Available: {product.stockQuantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsComponent;
