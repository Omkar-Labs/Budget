
import { motion } from "motion/react";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const Login = ({ handleFlip , setSignUp }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call)
        axios.post(import.meta.env.VITE_LOGIN, { username, password },{withCredentials: true})
            .then(response => {
                console.log("Login successful:", response.data);
                setUsername("");
                setPassword("");
                setError("");
                // You can store the token or user info in localStorage or context
                localStorage.setItem("token", response.data.message.accessToken);
                // Redirect to dashboard or another page
                navigate("/");


            })
            .catch(error => {
                setError(error.response?.data?.message || "Login failed. Please try again.");
                // Handle login error (e.g., show error message)

            });
    };
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setError("");
        setPassword("");
        setSignUp(false);
        handleFlip(new Event("click"));
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");
        setUsername("");
        setPassword("");
        setSignUp(true);
        handleFlip(new Event("click"));
    }

    return (
        <div className=' auth-face min-h-[400px] w-[90%] max-w-md flex flex-col items-center justify-evenly bg-white/10 backdrop-blur-xl border border-white/20 p-6 lg:p-8 rounded-3xl shadow-2xl shadow-(color: rgba(139,92,246,0.3)) mx-auto'>
            <h2 className='text-white text-3xl lg:text-4xl font-extrabold mb-2 text-center p-1.5'>Welcome Back!</h2>
            <form className='w-full flex flex-col gap-3 position-relative top-0' onSubmit={handleSubmit}>
                <div className="mb-4 mt-2">
                    <label className="text-gray-200 text-xl">Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="mt-4 ">
                    <label className="text-gray-200 text-xl">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="flex flex-col items-start justify-start w-full mb-6 ">
                    {error && <p className="text-red-400 text-xl text-bold">{error}</p>}
                    <button onClick={handleForgotPassword} className="text-sm text-blue-500  underline">Forgot Password</button>
                    <p className="text-gray-200 text-sm mt-2">Don't have an account? <button onClick={handleSignUp}  className="text-blue-500 underline">Sign Up</button></p>
                </div>
                <motion.button type="submit" className="  text-center text-gray-200 bg-white/20 h-12 w-25 text-xl self-center mt-6 rounded-4xl hover:bg-white/30 transition-colors duration-200" animate={{ scale: 1.05 }} transition={{ duration: 0.3 }}>Login</motion.button>
            </form>

        </div>
    )
}
