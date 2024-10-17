import axios from 'axios';

// Hàm lấy chi tiết món ăn từ API
export const getFoodDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/dishes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching food detail:', error);
    return null;
  }
};
