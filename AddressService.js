import axios from 'axios';

const API_BASE_URL = "http://localhost:8080"; // Update this if your Spring Boot server is running on a different URL

class AddressService {

    saveAddress(address) {
        return axios.post(`${API_BASE_URL}/address`, address);
    }

    getAddressById(addressId) {
        return axios.get(`${API_BASE_URL}/address/${addressId}`);
    }

    getAddresses() {
        return axios.get(`${API_BASE_URL}/addresses`);
    }

    updateAddress(addressId, address) {
        return axios.put(`${API_BASE_URL}/address/${addressId}`, address);
    }

    deleteAddress(addressId) {
        return axios.delete(`${API_BASE_URL}/address/${addressId}`);
    }
}

export default new AddressService();
