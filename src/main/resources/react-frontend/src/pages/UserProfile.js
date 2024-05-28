// src/pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import OrderService from '../services/OrderService';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = AuthService.getUserId();
        const userDetails = {
          email: AuthService.getUserEmail(),
          // Add more user details here if you have them available in AuthService
        };
        setUserDetails(userDetails);

        const orders = await OrderService.getOrdersByUserId(userId);
        setOrders(orders);
      } catch (err) {
        setError('Failed to retrieve user details or orders.');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {userDetails ? (
        <div className="user-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div>
                <h3>Order ID: {order.id}</h3>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.productName} - {item.quantity} x ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
