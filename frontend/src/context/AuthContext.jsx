import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const mySwal = withReactContent(Swal);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("jwt_token", token);
        setUser(userData);
    };

    const logout = async () => {
        const logoutConfirm = await mySwal.fire({
            title: "Log out now?",
            text: "Your current session will end.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel'
        });

        if (!logoutConfirm.isConfirmed) {
            return toast.warning("Logout failed. Please try again");
        }

        localStorage.removeItem("user");
        localStorage.removeItem("jwt_token");
        setUser(null);
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}
