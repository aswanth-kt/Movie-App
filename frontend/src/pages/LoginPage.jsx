import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);

            const responce = await axios.post("/user/login",{
                email,
                password
            });

            // console.log("login responce:", responce.data);
            // console.log("login token:", responce.data.token);
            const userData = responce.data;

            setLoading(false);

            if (responce.status === 200 && userData) {
                login(userData, userData.token);    // Pass to AuthContext
            }
            // console.log("Login responce:", responce)

            if (responce.status === 200 && responce.data.role === "admin") {
                
                toast.success("Welcome to the Admin Panel");
                navigate("/admin/dashboard");

            } else if (responce.status === 200) {

                toast.success(`Welcome back, ${responce.data.name}`);
                login(responce.data); 
                navigate("/movies");
             
            } else {
                toast.warning(responce.data.message);
                navigate("/login");
            }
        } catch (error) {

            toast.error(error.response?.data?.message || "Invalid credentials");
            console.error("Error in handle login:", error);
            
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-5">
            <form
                onSubmit={handleLogin}
                className="bg-secondary p-8 rounded-xl w-96 space-y-4 shadow"
            >
                <h2 className="text-xl font-bold text-center">
                    Login
                </h2>

                <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-sm bg-primary outline-none"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-sm bg-primary outline-none"
                />

                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white py-3 w-full rounded font-semibold hover:text-secondary hover:bg-accent transition"
                >
                    { loading ? "Logging in..." : "Login" }
                </button>

                <p className="py-3 text-center">
                    Don't have an account? <span> </span>
                    <Link 
                        to="/register"
                        className="font-bold"
                    > 
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}