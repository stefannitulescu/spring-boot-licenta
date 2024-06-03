import axios from 'axios';

class AddressService {
  static async getAllAddresses() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/addresses/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log("addresses", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  }

  static async createOrUpdateAddress(address, userId) {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/addresses/${userId}`, address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log("createOrUpdateAddress ", response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating/updating address:', error);
      throw error;
    }
  }

  static async getAddressById(userId) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/addresses/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  }
}

export default AddressService;
