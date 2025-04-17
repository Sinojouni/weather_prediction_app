import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(()=> localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null);
    let [loading, setLoading] = useState(true);
    const baseURL = 'http://127.0.0.1:8000'
    const fastapiURL = 'http://127.0.0.2:8000'


    const login = async (username, password) => {
        try {
            const response = await axios.post(`${baseURL}/api/user/token/`, { username, password });
            if(response.status === 200){
                setToken(response.data);
                setUser(jwtDecode(response.data.access))
                localStorage.setItem('token', JSON.stringify(response.data))
            }else{
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const signup = async (username, password) => {
        try {
            await axios.post(`${baseURL}/api/user/signup/`, { username, password });
            return login(username, password);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };


    useEffect(()=> {

        if(token){
            setUser(jwtDecode(token.access))
        }
        setLoading(false)


    }, [token, loading])

    let authdata={
        user: user,
        setUser:setUser,
        token:token,
        setToken:setToken,
        login:login,
        signup:signup,
        logout:logout,
        baseURL:baseURL,
        fastapiURL:fastapiURL
    }

    return (
        <AuthContext.Provider value={authdata}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
