// ProductService.js
import axios from 'axios';

// Set token for development/testing (this should be replaced by dynamic token after login in production)
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6InNuaXR1bGVzY3UyMDAxQHlhaG9vLmNvbSIsImlhdCI6MTcxNTk2NTYwNSwiZXhwIjoxNzE2MDUyMDA1fQ.1GVvnlDrw9ETm2AgMHNHmowbJt7R9VFdbiYE4jnAy90';

// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

class ProductService {
  static async getAllProducts() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/products/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default ProductService;
