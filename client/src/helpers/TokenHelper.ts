import { jwtDecode } from "jwt-decode";

const tokenHelper = {

    getUserByJWT: () => {
        const token =  localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded;  
            } catch (error) {
                console.error('Token invalid !');
                localStorage.removeItem("access_token");
                throw error;
            }
        }
    }

}

export default tokenHelper;