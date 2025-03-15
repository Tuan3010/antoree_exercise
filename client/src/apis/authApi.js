import axiosInstance from "./axiosConfig";

const authApi = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post("api/login", credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post("api/register", userData);
            return response.data; 
        } catch (error) {
            throw error;
        }
    }
}

export default authApi;