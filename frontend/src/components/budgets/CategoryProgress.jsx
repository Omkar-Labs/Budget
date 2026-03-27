import React, {  useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { User } from '@/App';



const CategoryProgress = () => {
    const { data } = React.useContext(User);
    const [symbol, setSymbol] = React.useState("₹");
    

    useEffect(() => {
        if (data.user.currency === "INR") {
            setSymbol("₹");
        } else if (data.user.currency === "USD") {
            setSymbol("$");
        } else if (data.user.currency === "EUR") {
            setSymbol("€");
        }
    }, [data.user.currency]);

    return (
        <div className='w-full h-full relative flex flex-col items-center justify-start  bg-white/10 backdrop-blur-xl rounded-lg  border-white/20  shadow-[0_0_30px_rgba(255,0,255,0.1)]'>
            <h1 className='text-white text-xl font-bold mb-4'>Category-wise Budget</h1>
            {data.budgets.budget.map((budget, index) => (<div className='flex mb-2 items-center justify-between w-full px-4' key={index}>
                <span className='text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-200 bg-pink-500/20 '>{budget._id}</span>
                <Progress value={(budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit)*100} className="h-2 bg-white/10 w-1/2" indicatorclassname="bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                <span className='text-sm font-semibold  inline-block  text-pink-400 '>{symbol} {budget.totalLimit}</span>
            </div>))}

        </div>
    )
}

export default CategoryProgress