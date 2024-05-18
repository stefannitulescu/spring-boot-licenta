import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import UserService from '../services/UserService';
import '../styles/ManageUsers.css';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: ''
    };
  }

  componentDidMount() {
    UserService.getAllUsers()
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => {
        this.setState({ error: 'Failed to retrieve users.' });
        console.error(err);
      });
  }

  render() {
    const { users, error } = this.state;

    return (
      <div className="manage-users-container">
        <h1>Manage Users</h1>
        {error && <p className="error">{error}</p>}
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" size="sm" className="mr-2">
                    <FaPen />
                  </Button>
                  <Button variant="danger" size="sm">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ManageUsers;
