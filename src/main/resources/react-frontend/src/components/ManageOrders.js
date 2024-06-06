import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Form, Modal } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import OrderService from '../services/OrderService';
import '../styles/ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('dateAsc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getAllOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to retrieve orders.');
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      setSuccess('Order status updated successfully.');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      setError('Failed to update order status.');
      console.error(err);
    }
  };

  const handleShowOrderItems = (order) => {
    setSelectedOrder(order);
    setOrderItems(order.items);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedOrders = orders
    .filter(order => filterStatus === 'All' || order.status === filterStatus)
    .filter(order => 
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'dateAsc') {
        return new Date(a.orderDate) - new Date(b.orderDate);
      } else if (sortCriteria === 'dateDesc') {
        return new Date(b.orderDate) - new Date(a.orderDate);
      } else if (sortCriteria === 'priceAsc') {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    });

  return (
    <div className="manage-orders-container">
      <h1 className="page-title">Manage Orders</h1>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      
      <div className="filters-container">
        <Form.Group controlId="searchTerm" className="search-field">
          <Form.Label>Search by User Email or Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user email or name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Form.Group controlId="filterStatus" className="filter-field">
          <Form.Label>Filter by Status:</Form.Label>
          <Form.Control
            as="select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="PREPARING">Preparing</option>
            <option value="SENT_TO_DRIVER">Sent to driver</option>
            <option value="ON_THE_WAY">On the way</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sortCriteria" className="filter-field">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" value={sortCriteria} onChange={handleSortChange}>
            <option value="dateAsc">Order Date: Oldest to Newest</option>
            <option value="dateDesc">Order Date: Newest to Oldest</option>
            <option value="priceAsc">Total Price: Low to High</option>
            <option value="priceDesc">Total Price: High to Low</option>
          </Form.Control>
        </Form.Group>
      </div>

      <Table striped bordered hover className="orders-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th className="email-column">User Email</th>
            <th>User Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total</th>
            <th style={{ width: '80px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td className="email-column">{order.userEmail}</td>
              <td>{order.userName}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>
                <Form.Control
                  as="select"
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  <option value="PREPARING">Preparing</option>
                  <option value="SENT_TO_DRIVER">Sent to driver</option>
                  <option value="ON_THE_WAY">On the way</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </Form.Control>
              </td>
              <td>${order.total.toFixed(2)}</td>
              <td className="actions-column">
                <Button variant="info" size="sm" onClick={() => handleShowOrderItems(order)}>
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {orderItems.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No items found for this order.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageOrders;
