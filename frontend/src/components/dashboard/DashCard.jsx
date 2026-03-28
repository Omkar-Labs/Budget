import React, { useCallback } from 'react'
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
import { PlusIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Player } from '@lottiefiles/react-lottie-player'
import Financial from '../../assets/Financial.json'
import IncomeCard from './IncomeCard';

export const DashCard = ({setShow}) => {
  const [symbol, setSymbol] = React.useState("₹");
  const { data, setData } = React.useContext(User);
  const [counter, setCounter] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const count = useCallback(() => {
    if (counter < data.stats.totalBalance) {
      const timer = setTimeout(() => {
        setCounter(counter + Math.ceil(data.stats.totalBalance / 100));
      }, 15);
      return () => clearTimeout(timer);
    }
    return setCounter(data.stats.totalBalance);
  }, [counter, data.stats.totalBalance])
  React.useEffect(() => {
    count();
    if (data.user.currency === "INR") {
      setSymbol("₹");
    } else if (data.user.currency === "USD") {
      setSymbol("$");
    } else if (data.user.currency === "EUR") {
      setSymbol("€");
    }

  }, [data.user.currency, counter, count]);
  return (
    <div className='dashboard w-full h-full flex items-center justify-center gap-3 lg:row-span-2 '>
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.45} scale={1.05} perspective={1500} className='w-full h-full flex items-center justify-center'>
        <Card size="default" className="w-full h-full p-3  bg-white/10 backdrop-blur-xl border border-white/20  shadow-[0_0_30px_rgba(255,0,255,0.1)]">
          <CardHeader className=" flex items-center justify-start">
            <CardTitle className="text-pink-300 text-xl lg:text-2xl ">TOTAL BALANCE</CardTitle>
          </CardHeader >
          <hr className='' />
          <CardContent className=" ">
            <h1 className='text-5xl lg:text-7xl font-bold text-white text-start  font-sans'>{symbol} {counter}</h1>
            <Player
              autoplay
              loop
              src={Financial}
              className='h-full w-1/2 mx-auto z-0 absolute -bottom-7 right-4 lg:right-36 opacity-50 @lg:h-50 @lg:w-50'
            >
            </Player>
            <div className='flex items-center justify-between mt-10 '>
              <p className='text-white/85 text-xl lg:text-2xl '>{date.toLocaleString("default", { month: "long", year: "numeric" })}</p>
              <Button variant="outline" className=" rounded-full h-12 w-12 mb-3 z-10" onClick={() => setShow((prev) => !prev)}><PlusIcon className='w-6 h-6 ' /></Button>
            </div>
          </CardContent>

        </Card>
      </Tilt >
      
    </div>
  )
}
