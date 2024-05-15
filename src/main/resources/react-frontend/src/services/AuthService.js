// AuthService.js
import axios from 'axios';

class AuthService {
  static async register(registerData) {
    console.log(registerData);

    try {
        // console.log("sunt aici", registerData );
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
      return response.data;
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export default AuthService;
