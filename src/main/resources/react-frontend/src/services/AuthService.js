import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthService {
  static async register(registerData) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  static async login(loginData) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', loginData);
      localStorage.setItem('access_token', response.data.access_token); // Store the access token
      localStorage.setItem('refresh_token', response.data.refresh_token); // Store the refresh token
      localStorage.setItem('user_email', loginData.email); // Store the user email

      // Set the default Authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
    delete axios.defaults.headers.common['Authorization'];
  }

  static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  static getUserEmail() {
    return localStorage.getItem('user_email');
  }

  static isAuthenticated() {
    return !!this.getAccessToken();
  }

  static getUserRole() {
    const token = this.getAccessToken();
    if (!token) return null;
    
    const decodedToken = jwtDecode(token);
    return decodedToken.roles ? decodedToken.roles[0] : null; // assuming roles is an array
  }
}

// Set the token if it exists in local storage when the app initializes
const token = AuthService.getAccessToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default AuthService;
