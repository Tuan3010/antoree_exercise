import { useState } from "react";
import authApi from "../apis/authApi";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const {data} = await authApi.login(credentials);
      console.log(data);
      localStorage.setItem("access_token", data.token);
      setUser(data.user);
      return data.user;

    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
