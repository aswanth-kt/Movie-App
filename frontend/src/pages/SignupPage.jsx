import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useAuth } from "../context/AuthContext";

export default function SingnupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoaing] = useState(false);

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setLoaing(true);

            const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
                name, email, password
            });
            // console.log("Signup responce:", responce);

            setLoaing(false);

            if (responce.status === 201) {
                toast.success(`${responce.data.message} ${responce.data.name}`)
                login(responce.data)    // Store data to user context.
                navigate("/movies")
            } else {
                toast.warning(responce.data.message);
                navigate("/login")
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Server error!");
            console.error("Error in handle signup:", error)
        } finally {
            setLoaing(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSignup}
                className="bg-secondary p-8 rounded-xl w-96 space-y-4 shadow"
            >
                <h2 className="text-xl font-bold text-center">
                    Register
                </h2>

                <input 
                    type="text" 
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-sm bg-primary outline-none"
                />
         
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
                    {loading ? "Creating account..." : "Sign up"}
                </button>
            </form>
        </div>
    )
}