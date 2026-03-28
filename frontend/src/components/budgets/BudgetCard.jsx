import React, { useContext , useEffect, useState, useRef } from 'react'
import { Progress } from '../ui/progress'
import { AlertCircleIcon  , ShieldCheckIcon} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { User } from '@/App'

const BudgetCard = () => {
    const {data} = useContext(User);
    const [symbol, setSymbol] = React.useState("₹");

    // Drag-to-scroll state
    const scrollContainerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);

    const onMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftState(scrollContainerRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDown(false);
    };

    const onMouseUp = () => {
        setIsDown(false);
    };

    const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // drag scrolling speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    };

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
        <div 
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={`w-full h-auto py-4 col-span-1 lg:col-span-2 flex flex-nowrap items-center justify-start gap-4 sm:gap-6 overflow-x-auto custom-scrollbar px-2 snap-x snap-mandatory ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            {data.budgets.budget.map((budget, index) => (
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.45} scale={1.05} perspective={1500} className='w-[85%] max-w-[340px] sm:w-[300px] lg:w-[340px] shrink-0 h-[200px] lg:h-[220px] flex items-center justify-center transition-all duration-200 active:scale-95 snap-center sm:snap-start' key={index}>
                <div className={`w-full h-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-5 rounded-lg shadow-xl ${budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit > 1 ? "shadow-pink-500/30" : budget.transactions.reduce((acc, curr) => acc + curr.amount, 0)/budget.totalLimit >= 0.9 ? "shadow-amber-500/30" : "shadow-emerald-500/30"}`} key={index}>
            
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