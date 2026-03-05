import { useState } from "react";
import { motion } from "motion/react";
import axios from 'axios';

const SignUp = ({ handleFlip }) => {
    const [error, setError] = useState("");
    const[detail,setDetail] = useState({
        email:"",
        username:"",
        password:"",
        currency:"",
    })
    const [avatar,setAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(detail);
        const formData = new FormData();
        formData.append("username", detail.username);
        formData.append("email", detail.email);
        formData.append("password", detail.password);
        formData.append("currency", detail.currency);
        formData.append("avatar", avatar);
        console.log(formData.getAll("avatar"));
        // Handle registration logic here (e.g., API call)
        axios.post(import.meta.env.VITE_REGISTER, formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials: true
        })
            .then(response => {
                console.log("Registration successful:", response.data);
                setDetail({
                    email:"",
                    username:"",
                    password:"",
                    currency:"",
                    avatar:null
                });
                setAvatar(null);
                setError("");
                // redirect the user to the login page or show a success message
                handleFlip(new Event("click"));
            })
            .catch(error => {
                console.log(error);
                setError(error.response?.data?.message || "Registration failed. Please try again.");
                // Handle registration error (e.g., show error message)
            });
    }
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDetail((prev)=>({...prev,[name]:value}));

    }
    const handleLogin = (e)=>{
        e.preventDefault();
        setError("");
        setDetail({
            email:"",
            username:"",
            password:"",
            currency:"",
        });
        setAvatar(null);
        handleFlip(new Event("click"));
        }
    
    return (
        <div className=' auth-face auth-back h-100 w-full max-w-md flex flex-col items-center justify-between gap-1.5 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl shadow-(color: rgba(139,92,246,0.3))'>
            <h2 className='text-white text-4xl font-extrabold mb-2 text-center '>Welcome</h2>
            <form className='w-full flex flex-col gap-2.5' onSubmit={handleSubmit}>
                <div>
                    <label className="text-gray-200 text-xl">Username:</label>
                    <input type="text" name="username" value={detail.username} onChange={handleChange} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="text-gray-200 text-xl">Password:</label>
                    <input type="password" name= "password" value={detail.password} onChange={handleChange} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                 <div>
                    <label className="text-gray-200 text-xl">Email:</label>
                    <input type="email" name="email" value={detail.email} onChange={handleChange} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div> 
                <div>
                    <label className="text-gray-200 text-xl">Currency:</label>
                    <select name="currency" value={detail.currency} onChange={handleChange} className="w-full p-2 rounded-lg  appearance-none bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="" >Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="INR">INR</option>
                    </select>
                </div>
                 <div>
                    <label className="text-gray-200 text-xl">Avatar:</label>
                    <input type="file" accept = ".png,.jpg,.jpeg"  onChange={(e)=>setAvatar(e.target.files[0])} className="w-full p-2 text-white/65 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="flex flex-col items-start justify-start w-full ">
                    {error && <p className="text-red-400 text-xl text-extrabold">{error}</p>}
                    <p className="text-gray-200 text-sm ">Back to Login <button onClick={handleLogin}  className="text-blue-500 underline">Login</button></p>
                </div>
                <motion.button type="submit" className="  text-center text-gray-200 bg-white/20 h-12 w-25 text-xl self-center  rounded-4xl hover:bg-white/30 transition-colors duration-200" animate={{ scale: 1.05 }} transition={{ duration: 0.3 }}>Sign Up</motion.button>
            </form>

        </div>
    )
}

export default SignUp