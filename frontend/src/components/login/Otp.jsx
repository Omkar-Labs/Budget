import { useState } from 'react'
import axios from 'axios'


const Otp = ({ handleFlip }) => {
    const [formate, setFormate] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const sentEmail = () => {
        axios.post(import.meta.env.VITE_GENERATE_OTP, { email: emailOtp },{ withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setEmailOtp("");
                setError("");
                setFormate(true);
            })
            .catch((error) => {
                setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
            })
    }
    const verifyOtp = async ()=>{
        axios.put(import.meta.env.VITE_VERIFY_OTP, {otp:emailOtp,newPassword:password,confirmPassword},{ withCredentials: true })
            .then((response) => {
                setError("");
                handleFlip(new Event("click"));
            })
            .catch((error) => {
                console.log(error)
                setError(error.response?.data?.message || "Failed to verify OTP. Please try again.");
            })
    }
    return (
        <>
            {!formate ? <div className="auth-face auth-back h-auto min-h-[360px] sm:h-90 w-[90%] sm:w-full max-w-md flex flex-col items-center justify-between gap-1.5 bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-(color: rgba(139,92,246,0.3)) mx-auto my-4 sm:my-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">Forget Password</h2>
                <p className="text-gray-300 mb-4 text-center">Enter the your Email to send an OTP </p>
                <div className="flex flex-col w-full">
                <input type="text" placeholder="Enter Email" value={emailOtp} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6" onChange={(e) => setEmailOtp(e.target.value)} />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </div>
                <button onClick={sentEmail} className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors duration-200">Send OTP</button>
            </div> : <div className="auth-face auth-back h-auto min-h-[400px] sm:h-90 w-[90%] sm:w-full max-w-md flex flex-col items-center justify-between gap-1.5 bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-(color: rgba(139,92,246,0.3)) mx-auto my-4 sm:my-0">
                <h2 className="text-3xl font-bold mb-3 text-center ">Forget Password</h2>
                <p className="text-gray-600 mb-2 text-center ">Enter OTP send to your Email</p>
                <input type="text" placeholder="Enter OTP" value={emailOtp} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" onChange={(e) => setEmailOtp(e.target.value)} />
                {error && <p className="text-red-500 text-sm ">{error}</p>}
                <div className='w-full flex flex-col position-fixed mb-2'>
                    <label className="text-gray-200 text-xl">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className='w-full flex flex-col position-fixed mb-2'>
                    <label className="text-gray-200 text-xl">Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <button onClick={verifyOtp} className="w-full position-fixed bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">Verify OTP</button>
            </div>
            }


        </>
    )
}

export { Otp }