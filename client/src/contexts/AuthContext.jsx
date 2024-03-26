/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

import { registerRequest } from "@api/auth.js";
import { useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log("RES.DATA", res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error.response.data);
            setAuthError(error.response.data);
        }
    };

    return (
        <AuthContext.Provider value={{ signup, user, isAuthenticated, authError }}>
            {children}
        </AuthContext.Provider>
    );
};
