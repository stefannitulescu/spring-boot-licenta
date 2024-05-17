import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import '../styles/ManageProducts.css';

const ManageProducts = () => {
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
    <div className="manage-products-container">
      <h1>Manage Products</h1>
      {error && <p className="error">{error}</p>}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
