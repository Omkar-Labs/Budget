import axios from "axios";

import { redirect } from "react-router-dom";

export const dashboardLoader = async ({request,isRetry=false}) => {
   
    const date = new Date();
    try {
        // 1. Check Profile first
        // @ts-ignore
        const profileRes = await axios.get(import.meta.env.VITE_PROFILE, { withCredentials: true });



        // 2. Fetch others in parallel
        const [transRes, statsRes, budgetsRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_TRANSACTIONS}?limit=5&skip=0`, { withCredentials: true }),
            axios.get(`${import.meta.env.VITE_TRANSACTIONS_STATS}?month=${date.getMonth()}&year=${date.getFullYear()}`, { withCredentials: true }),
            axios.get(`${import.meta.env.VITE_BUDGETS}?month=${date.getMonth()+1}&year=${date.getFullYear()}`, { withCredentials: true })
        ]);

        // Return all data to the component
        return {
            user: profileRes.data.data,
            transactions: transRes.data.data,
            stats: statsRes.data.data,
            budgets: budgetsRes.data.data,
            login: true
        };

    } catch (err) {
        if(!err.response){
            throw new Error("Network error");
        }
        const errorMsg = err.response?.data?.message || "";
        
        if(isRetry){
            throw redirect("/login");
        }
        
        // 3. Handle Token Refresh
        if (err.response?.status === 401) {
            try {
                await axios.post(import.meta.env.VITE_REFRESH_TOKEN, {}, { withCredentials: true });
                return await dashboardLoader({request,isRetry:true}); // Retry the whole process once
            } catch (refreshErr) {
                    throw redirect("/login");
                
            }
        }

        // If not logged in or refresh failed, redirect to login
       
        throw new Error("Something went wrong");
        
    }
};
