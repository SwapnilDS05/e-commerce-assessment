import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("site") || "");

    return (
        <AuthContext.Provider value={{ token, user, isLoading, setUser, setToken, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
