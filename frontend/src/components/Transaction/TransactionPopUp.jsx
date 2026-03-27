import { useLayoutEffect, useState } from 'react'
import gsap from 'gsap';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const TransactionPopUp = ({show ,setShow}) => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        type: "",
        note: ""
    });
    useLayoutEffect(() => {
        if(show){
            gsap.fromTo(".popup",{opacity:0,scale:0},{opacity:1,scale:1,duration:0.5,ease:"power2.out"})
        }
       
    },[show]);
    const postData = async()=>{
        try{
            const res = await axios.post(import.meta.env.VITE_TRANSACTIONS,formData,{withCredentials:true});
            
        }
        catch(err){
            if(err.response?.status === 401){
                try{
                    await axios.post(import.meta.env.VITE_REFRESH_TOKEN,{},{withCredentials:true});
                    await postData();
                }
                catch(refreshErr){
                    return redirect("/login");
                }
            }
            return redirect("/login");
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await postData();
        setFormData({
            title: "",
            amount: "",
            category: "",
            date: "",
            type: "",
            note: ""
        });
        gsap.fromTo(".popup",{opacity:1,scale:1},{opacity:0,scale:0,duration:0.5,ease:"power2.out"})
        
        setTimeout(() => {
            setShow((prev)=>!prev);
        }, 500);
        
    }
    return (
        <div className='popup  w-150 h-95 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-lg p-4 rounded-lg shadow-lg z-900'>
            <form action="" className='flex flex-wrap gap-2 w-full h-full items-center justify-evenly' onSubmit={handleSubmit}>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='title'>Title:</label>
                    <input type="text" required={true} placeholder='Title' id="title" name="title" value={formData.title} onChange={handleChange} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='amount'>Amount:</label>
                    <input type="number" required={true} placeholder='Amount' id="amount" name="amount" value={formData.amount} onChange={handleChange} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='category'>Category:</label>
                    <input type="text" required={true} placeholder='Category' id="category" name="category" value={formData.category} onChange={handleChange} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ri   ng-2 focus:ring-purple-500' />
                </div>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='date'>Date:</label>
                    <input type="date" required={true} placeholder='Date' id='date' name="date" value={formData.date} onChange={handleChange} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='type'>Type:</label>
                    <select name="type" id="type" required={true} value={formData.type} onChange={handleChange} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    
                   
                </div>
                <div className='w-[48%] flex flex-col gap-2'>
                    <label className="text-gray-200 text-xl" htmlFor='note'>Note:</label>
                    <textarea name="note" id="note" placeholder='Optional' value={formData.note} onChange={handleChange} cols={30} rows={3} className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500'></textarea>
                </div>
                <button type='submit' className='w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500'>Add Transaction</button>
            </form>
        </div>
    )
}

export default TransactionPopUp