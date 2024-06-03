import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    ProductService.getProductById(id)
      .then(data => {
        console.log(data);
        setProduct(data);
      })
      .catch(err => {
        setError('Failed to retrieve product.');
        console.error(err);
      });
  }, [id]);

  const handleAddToCart = () => {
    const userId = AuthService.getUserId();
    const cartItem = {
      productId: product.id,
      quantity: quantity,
      price: product.price * quantity,
    };

    CartService.addToCart(userId, cartItem)
      .then(() => {
        setSuccessMessage('Item added to cart.');
      })
      .catch(err => {
        setError('Failed to add item to cart.');
        console.error(err);
      });
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={"/" + product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="detail">
          <label>Price:</label>
          <p>£{product.price}</p>
        </div>
        <div className="description-detail">
          <label>Description:</label>
          <p>{product.description}</p>
        </div>
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            max={product.stockQuantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default ProductDetails;
