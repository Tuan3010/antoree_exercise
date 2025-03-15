import axiosInstance from "./axiosConfig";

const userApi = {

    getAllUser: async () => {
        try {
            const response = await axiosInstance.get("api/admin/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async (userId) => {
        try {
            const response = await axiosInstance.get(`api/admin/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createUser: async () => {
        try {
            const response = await axiosInstance.post(`api/admin/user/store`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId) => {
        try {
            const response = await axiosInstance.put(`api/admin/user/edit/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await axiosInstance.delete(`api/admin/user/destroy/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default userApi;