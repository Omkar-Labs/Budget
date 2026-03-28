import React, { useState, useEffect } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User } from '@/App';
import Tilt from 'react-parallax-tilt';
import { ArrowDown, ArrowUp} from 'lucide-react';
import useTrend from '@/hooks/useTrend';


const IncomeCard = ({ prevData }) => {
  const { data, setData } = React.useContext(User);
  const [symbol, setsynbol] = useState("₹");
  const [incomeTrend , setIncomeTrend] = useState(0);
  



  useEffect(() => {
    if (data.user.currency === "INR") {
      setsynbol("₹");
    } else if (data.user.currency === "USD") {
      setsynbol("$");
    } else if (data.user.currency === "EUR") {
      setsynbol("€");
    }
    setIncomeTrend(useTrend(data.stats.totalIncome, prevData.prevTotalIncome));
    
  }, [data.user.currency, data.stats.totalIncome, prevData.prevTotalIncome])
  return (
    <div className='dashboard w-full h-full flex items-center justify-center '>
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.45} scale={1.05} perspective={1500} className='w-full h-full flex items-center justify-center'>
        <Card size="default" className="w-full h-full   bg-white/10 backdrop-blur-xl border-2 border-emerald-500/60  shadow-emerald-500/80">
          <CardHeader className=" flex items-center justify-start">
            <CardTitle className="text-pink-300 text-xl ">TOTAL INCOME</CardTitle>
          </CardHeader >
          <CardContent className=" ">
            <div className='flex items-center gap-4'>
            <h1 className='text-3xl lg:text-4xl font-bold text-white text-start display inline font-sans '>{symbol} {data.stats.totalIncome}  </h1>
            <p className={`text-sm font-medium mt-2 ${incomeTrend >= 0 ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]"}`}>{incomeTrend>=0 ? `${incomeTrend.toFixed(2)}%` : `${Math.abs(incomeTrend).toFixed(2)}%`} {incomeTrend>=0 ? <ArrowUp className="inline-block ml-1 text-emerald-400" size={16} /> : <ArrowDown className="inline-block ml-1 text-pink-400" size={16} />}</p>
            </div>
          </CardContent>
        </Card>
      </Tilt >
    </div>

  )
}

export default IncomeCard