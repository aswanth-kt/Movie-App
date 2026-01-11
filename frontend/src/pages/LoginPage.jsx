import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const responce = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/login`,{
                    email,
                    password
                }
            )
            console.log("login responce:", responce.data)
            setLoading(false);
            
            if (responce.status === 200 && responce.data.role === "admin") {
                navigate("/admin-dashboard")
            } else if (responce.status === 200) {
                navigate("/movies")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error("Error in handle login:", error);
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center">
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
                    className="bg-accent text-primary py-3 w-full rounded font-semibold hover:text-white hover:bg-primary transition"
                >
                    { loading ? "Logging in..." : "Login" }
                </button>
            </form>
        </div>
    )
}