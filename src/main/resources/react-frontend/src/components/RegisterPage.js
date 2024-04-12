// Register.js
import React, { useState } from 'react';
import AuthService from '../services/AuthService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        // console.log({ email, password, firstName, lastName, role });
      await AuthService.register({ email, password, firstName, lastName, role });
      // Redirect to the dashboard or homepage after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_CLIENT">Client</option>
          <option value="ROLE_DEPOSIT_MANAGER">Manager Depozit</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
