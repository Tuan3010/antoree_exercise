import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [unAuth, setUnAuth] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            cons
        }

    },[])
}