import React from 'react';
import { Table, Button, Modal, Alert, Form } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import UserService from '../services/UserService';
import '../styles/ManageUsers.css';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      search: '',
      sortOption: 'name-asc',
      error: '',
      showDeleteModal: false,
      deleteUserId: null,
      deleteError: '',
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    UserService.getAllUsers()
      .then(data => {
        this.setState({ users: data, filteredUsers: data });
      })
      .catch(err => {
        this.setState({ error: 'Failed to retrieve users.' });
        console.error(err);
      });
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, this.filterAndSortUsers);
  }

  handleSortChange = (e) => {
    this.setState({ sortOption: e.target.value }, this.filterAndSortUsers);
  }

  filterAndSortUsers = () => {
    const { users, search, sortOption } = this.state;
    let filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );

    const [sortField, sortDirection] = sortOption.split('-');
    filtered.sort((a, b) => {
      const fieldA = sortField === 'name' ? `${a.firstName} ${a.lastName}` : a[sortField];
      const fieldB = sortField === 'name' ? `${b.firstName} ${b.lastName}` : b[sortField];

      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.setState({ filteredUsers: filtered });
  }

  handleDeleteShow = (id) => {
    this.setState({ showDeleteModal: true, deleteUserId: id });
  }

  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false, deleteUserId: null, deleteError: '' });
  }

  handleDeleteConfirm = () => {
    UserService.deleteUser(this.state.deleteUserId)
      .then(() => {
        this.setState({ showDeleteModal: false, deleteUserId: null });
        this.loadUsers(); // Reload users after deletion
      })
      .catch(err => {
        this.setState({ deleteError: err.response.data.message || 'Failed to delete user because it has an active cart/orders.' });
        console.error(err);
      });
  }

  render() {
    const { filteredUsers, error, showDeleteModal, deleteError } = this.state;

    return (
      <div className="manage-users-container">
        <div className="title-add-container">
          <h1 className="page-title">Manage Users</h1>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        <div className="filters-container">
          <Form.Group controlId="searchName" className="filter-field">
            <Form.Label>Search by Name or Email:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or email"
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
          </Form.Group>
          <Form.Group controlId="sortOption" className="filter-field">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control as="select" value={this.state.sortOption} onChange={this.handleSortChange}>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="email-asc">Email (A-Z)</option>
              <option value="email-desc">Email (Z-A)</option>
            </Form.Control>
          </Form.Group>
        </div>
        <Table striped bordered hover className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" size="sm" className="mr-2">
                    <FaPen />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => this.handleDeleteShow(user.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showDeleteModal} onHide={this.handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ManageUsers;
