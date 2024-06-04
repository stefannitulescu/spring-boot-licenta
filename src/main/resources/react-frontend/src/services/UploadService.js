// src/services/UploadService.js
import axios from 'axios';

class UploadService {
  static async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    const response = await axios.post('http://localhost:8080/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  }
}

export default UploadService;
