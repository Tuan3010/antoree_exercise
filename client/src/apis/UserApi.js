import axiosInstance from "./AxiosConfig";

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

    createUser: async (inputs) => {
        try {
            const response = await axiosInstance.post(`api/admin/user/store`, inputs);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId, inputs) => {
        try {
            const response = await axiosInstance.put(`api/admin/user/edit/${userId}`, inputs);
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