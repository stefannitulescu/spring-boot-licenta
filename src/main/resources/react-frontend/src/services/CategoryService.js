import axios from 'axios';

class CategoryService {
  static async getAllCategories() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/category/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async createCategory(category) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/category/', category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  static async updateCategory(id, category) {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/category/${id}`, category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}

export default CategoryService;
