import React, { useContext , useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { AlertCircleIcon  , ShieldCheckIcon} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { User } from '@/App'

const BudgetCard = () => {
    const {data} = useContext(User);
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
        <div className='w-full h-full col-span-2 flex flex-wrap items-center justify-start gap-2'>
            {data.budgets.budget.map((budget, index) => (
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.45} scale={1.05} perspective={1500} className='w-[24.5%] h-1/2 flex items-center justify-center' key={index}>
                <div className={`w-full h-full bg-white/10 backdrop-blur-md   flex flex-col items-center justify-between p-3 rounded-lg  shadow-xl ${budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit > 1 ? "shadow-pink-500/30" : budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit >= 0.9 ? "shadow-amber-500/30" : "shadow-emerald-500/30"}`} key={index}>
            
                <div className='w-full h-1/2 flex items-center justify-start gap-4'>
                    
                    {budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit > 1 ? <AlertCircleIcon className="h-5 w-5 text-pink-500" /> : budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit >= 0.9 ? <AlertCircleIcon className="h-5 w-5 text-amber-500" /> : <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />}
                    <h1 className='text-white font-bold text-lg capitalize'>{budget._id}</h1>
                </div>
                <div className='w-full flex items-center justify-between mb-2'>
                    <div>
                        <p className='text-white/50 font-bold text-sm'>Budget</p>
                        <p className='text-white font-bold text-sm'>{symbol} {budget.totalLimit}</p>
                    </div>
                    <div>
                        <p className='text-white/50 font-bold text-sm'>Spent</p>
                        <p className='text-white font-bold text-sm'>{symbol} {budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)}</p>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between mb-2'>
                    <Progress value={(budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit)*100} className="h-2 bg-white/10" indicatorclassname="bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                </div>
                <div className='w-full h-1/2'>
                    <p className={`font-bold text-sm ${budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit > 1 ? "text-pink-500" : budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit >= 0.9 ? "text-amber-500" : "text-emerald-500"}`}>{symbol} {budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)} of {symbol} {budget.totalLimit}({((budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit)*100).toFixed(2)}% Used)</p>
                </div>
            </div>
            </Tilt>))}
        </div>
    )
}

export default BudgetCard