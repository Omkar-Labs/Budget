import React, { useState,useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User } from '@/App';
import SimpleAvatar from './SimpleAvatar';

const TransactionTable = () => {
    const { data, setData } = React.useContext(User);
    const [symbol, setsynbol] = useState("₹");
    useEffect(() => {
        if (data.user.currency === "INR") {
          setsynbol("₹");
        } else if (data.user.currency === "USD") {
          setsynbol("$");
        } else if (data.user.currency === "EUR") {
          setsynbol("€");
        }
      }, [])
    return (
        <div className='dashboard w-full h-auto lg:min-h-[340px] lg:h-80 row-span-1 lg:row-span-3 justify-items-center items-start'>
            
            <Table className="w-full lg:min-w-full h-auto lg:h-[340px] p-3 bg-white/10 backdrop-blur-xl rounded-lg border-white/20 shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                <TableHeader className="w-full h-1/5  rounded-tl-lg rounded-tr-lg">
                    <TableRow className="text-sm lg:text-2xl text-white">
                        <TableHead className="w-auto lg:w-45 text-white text-xs lg:text-2xl"></TableHead>
                        <TableHead className="w-auto lg:w-45 text-white text-xs lg:text-2xl">Transactions</TableHead>
                        <TableHead className="w-auto lg:w-45 text-white text-xs lg:text-2xl">Category</TableHead>
                        <TableHead className="w-auto lg:w-45 text-white text-xs lg:text-2xl text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {data.transactions.map((transaction, index) => {
                        if(!transaction){
                            return(
                            <TableRow className="w-full h-full  hover:bg-white/10 cursor-pointer text-base lg:text-xl  text-white" key={index}>
                                    
                                    <TableCell className="text-base lg:text-xl text-white">Zero Transactions</TableCell>
                                    
                                   
                            </TableRow>
                                )
                        }
                        if (index < 5) {
                            return (
                                <TableRow className="hover:bg-white/10 cursor-pointer text-sm lg:text-xl  text-white" key={index}>
                                    <TableCell className="font-medium text-white">
                                        <SimpleAvatar type={transaction.type} field = {transaction.category[0]}/>
                                    </TableCell>
                                    <TableCell className="">{transaction.title}</TableCell>
                                    <TableCell className="">{transaction.category}</TableCell>
                                    
                                    <TableCell className={`text-right ${transaction.type === 'income' ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]'}`}>{transaction.type === 'income' ? `${symbol} ${transaction.amount}` : `${symbol} ${transaction.amount}`}</TableCell>
                                </TableRow>

                            )

                        }
                        return;
                    })}

                </TableBody>
            </Table>
        </div>
    )
}

export default TransactionTable