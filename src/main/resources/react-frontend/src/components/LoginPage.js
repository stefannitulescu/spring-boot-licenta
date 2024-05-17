import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await AuthService.login({ email, password });
      this.props.history.push('/'); // Redirect to the homepage or dashboard
    } catch (error) {
      this.setState({ error: 'Login failed. Please check your credentials.' });
      console.error('Login failed:', error.message);
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={this.handleLogin} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-login">Login</button>
        </form>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
