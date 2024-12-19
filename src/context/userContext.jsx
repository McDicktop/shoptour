import { useState, useContext, createContext, useEffect } from "react";
import { getUserData } from "../api/user.api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({
            id: null,
            name: "",
            email: "",
        }),
        [loading, setLoading] = useState(true),
        [isAuthenticated, setIsAuthenticated] = useState(false),
        [isAdmin, setIsAdmin] = useState(false),
        [token, setToken] = useState(localStorage.getItem("token") ?? null);

    useEffect(() => {
        const fetchUserData = async () => {
            if(!token) {
                setLoading(false);
                return;
            }
            try{ 
                const userData = await getUserData(token);
                setUser({...userData})
                setIsAuthenticated(true);
                setIsAdmin(userData.roles.some(el => el === 'ADMIN'));
            } catch(error) {
                console.error('Error while fetching user data: ', error);
                handleLogout();
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [token]);

    const handleLogin = async (newToken) => {
        try {
            localStorage.setItem("token", newToken);
            setToken(newToken);
        } catch (error) {
            console.error("Error while sign in: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            setToken(null);
            setIsAuthenticated(false);
            setUser({
                id: null,
                name: "",
                email: "",
            });
        } catch (error) {
            console.error("Error while logout: ", error);
        }
    };

    const contextValue = {
        isAuthenticated,
        handleLogin,
        handleLogout,
        isAdmin,
        loading,
        user
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};