import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import OrderService from '../services/OrderService';
import '../styles/UserProfile.css';
import AddressService from '../services/AddressService';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [address, setAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = AuthService.getUserId();
        const userDetails = {
          email: AuthService.getUserEmail(),
        };
        setUserDetails(userDetails);

        const orders = await OrderService.getOrdersByUserId(userId);

        // Assign sequential order numbers
        const updatedOrders = orders.map((order, index) => ({
          ...order,
          orderNumber: index + 1
        }));
        setOrders(updatedOrders);

        const address = await AddressService.getAddressById(userId);
        setAddress(address);
      } catch (err) {
        setError('Failed to retrieve user details, address, or orders.');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = AuthService.getUserId();
      await AddressService.createOrUpdateAddress(newAddress, userId);
      setAddress(newAddress);
      setSuccessMessage('Address updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      setError('Failed to update address.');
      console.error(err);
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {userDetails ? (
        <div className="user-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h2 className="section-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <span className="order-number">Order #{order.orderNumber}</span>
              <p>
                Date: {`${new Date(order.orderDate).getDate()} ${
                  ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"][
                    new Date(order.orderDate).getMonth()
                  ]
                } ${new Date(order.orderDate).getFullYear()}, ${new Date(order.orderDate).getHours()}:${
                  new Date(order.orderDate).getMinutes().toString().padStart(2, "0")
                }`}
              </p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productName} - {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title">Your Address</h2>
      {address ? (
        <div className="address-details">
          <p>{address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}</p>
        </div>
      ) : (
        <p>No address on file.</p>
      )}

      <h3>Update Address</h3>
      <form onSubmit={handleAddressSubmit} className="new-address-form">
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={newAddress.street}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={newAddress.zipCode}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={newAddress.country}
          onChange={handleAddressChange}
          required
        />
        <button type="submit" className="btn-add-address">Save Address</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default UserProfile;
