// ProductService.js
import axios from 'axios';

// Set token for development/testing (this should be replaced by dynamic token after login in production)
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6InNuaXR1bGVzY3UyMDAxQHlhaG9vLmNvbSIsImlhdCI6MTcxNTgwMjg1OCwiZXhwIjoxNzE1ODg5MjU4fQ.etkN4xbN4jM8mW_b9c2_qOGRXJ5Wiee5aJhWqPW7Kzo';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

class ProductService {
  static async getAllProducts() {
    try {
      console.log("cacatule");
      const response = await axios.get('http://localhost:8080/api/v1/products/all');
      console.log("cacatule", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default ProductService;
