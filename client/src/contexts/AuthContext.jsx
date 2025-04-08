import { createContext, useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import tokenHelper from '../helpers/TokenHelper';
import authApi from '../apis/AuthApi';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    
    
    useEffect(() => {
        
        const user = tokenHelper.getUserByJWT();
        if (user) setUserInfo(user);
      
    }, [])
    console.log(userInfo);
    const login = async (credentials) => {
        try {
            const res = await authApi.login(credentials);
            localStorage.setItem('access_token', res.data.token)
            setUserInfo(res.data.user);

            return res; 
        } catch (error) {
            console.log('Lỗi ở context, function login()');
            throw error
        }
    }

    const logout = () => {
        setUserInfo(null);
        authApi.logout();
    }

    return (
        <AuthContext.Provider value={{userInfo, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);