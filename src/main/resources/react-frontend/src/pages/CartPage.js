// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import OrderService from '../services/OrderService';
import AddressService from '../services/AddressService';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userAddress, setUserAddress] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const history = useHistory();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = AuthService.getUserId();
        const cart = await CartService.getCart(userId);
        setCartItems(cart.items);

        // Fetch user address
        const address = await AddressService.getAddressById(userId);
        setUserAddress(address);
      } catch (err) {
        setError('Failed to retrieve cart items or user address.');
        console.error(err);
      }
    };

    fetchCart();
  }, []);

  const handleConvertCartToOrder = async () => {
    try {
      const userId = AuthService.getUserId();
      const address = useNewAddress ? newAddress : userAddress;
      await OrderService.convertCartToOrder(userId, address);
      setSuccessMessage('Cart successfully converted to order!');
    } catch (err) {
      setError('Failed to convert cart to order.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateCartItem = async (cartItemId, quantity) => {
    try {
      const userId = AuthService.getUserId();
      await CartService.updateCartItem(userId, cartItemId, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update cart item.');
      console.error(err);
    }
  };

  const handleRemoveCartItem = async (cartItemId) => {
    try {
      const userId = AuthService.getUserId();
      await CartService.removeCartItem(userId, cartItemId);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
    } catch (err) {
      setError('Failed to remove cart item.');
      console.error(err);
    }
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div>
                <h3>{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-item-actions">
                  <button onClick={() => handleUpdateCartItem(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => handleUpdateCartItem(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <button onClick={() => handleRemoveCartItem(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="address-selection">
            <label>
              <input
                type="radio"
                name="address"
                checked={!useNewAddress}
                onChange={() => setUseNewAddress(false)}
              />
              Use my address
            </label>
            {userAddress && (
              <div className="address-details">
                <p>{`${userAddress.street}, ${userAddress.city}, ${userAddress.state}, ${userAddress.zipCode}, ${userAddress.country}`}</p>
              </div>
            )}

            <label>
              <input
                type="radio"
                name="address"
                checked={useNewAddress}
                onChange={() => setUseNewAddress(true)}
              />
              Use a new address
            </label>
            {useNewAddress && (
              <div className="new-address-form">
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={newAddress.zipCode}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          <button className="btn-convert-to-order" onClick={handleConvertCartToOrder}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
