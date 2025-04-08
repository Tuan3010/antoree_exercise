import axiosInstance from "./AxiosConfig";

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
    },

    logout: () => {
        localStorage.removeItem("access_token");
    }
}

export default authApi;