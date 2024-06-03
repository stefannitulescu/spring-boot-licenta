// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import OrderService from '../services/OrderService';
import AddressService from '../services/AddressService';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [useUserAddress, setUseUserAddress] = useState(true);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = AuthService.getUserId();
        const cart = await CartService.getCart(userId);
        setCartItems(cart.items);
      } catch (err) {
        setError('Failed to retrieve cart items.');
        console.error(err);
      }
    };

    const fetchUserAddress = async () => {
      try {
        const userId = AuthService.getUserId();
        const address = await AddressService.getAddressById(userId);
        setUserAddress(address);
      } catch (err) {
        console.error('Failed to fetch user address', err);
      }
    };

    fetchCart();
    fetchUserAddress();
  }, []);

  const handleConvertCartToOrder = async () => {
    try {
      const userId = AuthService.getUserId();
      const addressToUse = useUserAddress && userAddress ? userAddress : address;
      await OrderService.convertCartToOrder(userId, addressToUse);
      setSuccessMessage('Cart successfully converted to order!');
      setCartItems([]);
    } catch (err) {
      setError('Failed to convert cart to order.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <h3>{item.productName}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="address-selection">
            <h2>Select or Enter Address</h2>
            <div>
              <input
                type="radio"
                id="userAddress"
                name="addressOption"
                checked={useUserAddress}
                onChange={() => setUseUserAddress(true)}
              />
              <label htmlFor="userAddress">Use my saved address</label>
            </div>
            {userAddress && useUserAddress && (
              <div className="saved-address">
                <p>{userAddress.street}, {userAddress.city}, {userAddress.state}, {userAddress.zipCode}, {userAddress.country}</p>
              </div>
            )}
            <div>
              <input
                type="radio"
                id="newAddress"
                name="addressOption"
                checked={!useUserAddress}
                onChange={() => setUseUserAddress(false)}
              />
              <label htmlFor="newAddress">Enter a new address</label>
            </div>
            {!useUserAddress && (
              <div className="new-address-form">
                <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} />
                <input type="text" name="state" placeholder="State" value={address.state} onChange={handleInputChange} />
                <input type="text" name="zipCode" placeholder="Zip Code" value={address.zipCode} onChange={handleInputChange} />
                <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleInputChange} />
              </div>
            )}
          </div>
          <button className="btn-convert-to-order" onClick={handleConvertCartToOrder}>
            Convert to Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
