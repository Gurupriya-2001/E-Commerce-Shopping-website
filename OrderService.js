import axios from 'axios';

const API_BASE_URL = "http://localhost:8080"; // Ensure this matches your Spring Boot server URL

class OrderService {

    saveOrder(order) {
        return axios.post(`${API_BASE_URL}/order`, order);
    }

    getOrderById(orderId) {
        return axios.get(`${API_BASE_URL}/order/${orderId}`);
    }

    getOrders() {
        return axios.get(`${API_BASE_URL}/orders`);
    }

    updateOrder(orderId, orderData) {
        return axios.put(`${API_BASE_URL}/order/${orderId}`, orderData);
    }

    deleteOrder(orderId) {
        return axios.delete(`${API_BASE_URL}/order/${orderId}`);
    }
}

export default new OrderService();
