import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    UserService.getAllUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(err => {
        setError('Failed to retrieve users.');
        console.error(err);
      });
  }, []);

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      {error && <p className="error">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
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

export default ManageUsers;
