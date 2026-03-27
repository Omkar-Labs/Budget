import React, { useEffect } from 'react'
import TransHeader from './TransHeader'
import axios from 'axios';
import { addDays } from 'date-fns/addDays';
import { redirect, useLoaderData, useSearchParams } from 'react-router-dom';
import { useIntersecting } from '@/hooks/useIntersecting';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteIcon, PlusIcon ,  } from 'lucide-react';
import { User } from '@/App';
import { DashBoard } from '../dashboard/DashBoard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TransactionPopUp from './TransactionPopUp';
import UpdateTransactions from './UpdateTransactions';


const Transaction = () => {
    const [transaction, setTransaction] = React.useState({});
    gsap.registerPlugin(useGSAP);
    const [date, setDate] = React.useState({
        from: 0,
        to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    });
    const ref = React.useRef(null);
    const isIntersecting = useIntersecting(ref);
    
    const [symbol, setSymbol] = React.useState("₹");
    const data1 = useLoaderData();
    const { data } = React.useContext(User);
    
    const [show, setShow] = React.useState(false);
    const [showUpdate, setShowUpdate] = React.useState(false);

    const [dataTrans, setDataTrans] = React.useState([]);
    const [filter, setFilter] = React.useState({
        type: "all",
        category: "all",
        search: "",
        skip: 0,
        limit: 100
    })
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_TRANSACTION_DELETE}/${id}`,{withCredentials:true});
            
        } catch (error) {
            
            if(error.reponse?.status === 401){
                await axios.post(`${import.meta.env.VITE_REFRESH_TOKEN}`,{},{withCredentials:true})
                await handleDelete(id);
            }
            else{
                console.log(error);
            }
        }
    }
    const handleUpdate = (id) => {
        setTransaction(dataTrans.find((transaction) => transaction._id === id));
        

        setShowUpdate(true);
    }
    
    useEffect(() => {

        
        if (isIntersecting && data.length >= filter.limit) {
            setFilter(prev => ({ ...prev, skip: prev.skip + prev.limit }));
        }
        setDataTrans((prev) => ([...data1]));
        if (data.user.currency === "INR") {
            setSymbol("₹");
        } else if (data.user.currency === "USD") {
            setSymbol("$");
        } else if (data.user.currency === "EUR") {
            setSymbol("€");
        }
    }, [data1, isIntersecting]);
    return (
        
        <main className='flex-1 flex flex-col overflow-auto'>
            <div className='p-4'>
                <TransHeader filter={filter} setFilter={setFilter} date={date} setDate={setDate} />
            </div>
            <div className=' w-full p-3'>
                {dataTrans.length === 0 ? (
                    <div className='flex h-full w-full items-center justify-center gap-4 mt-10'>
                        <h2 className='text-white text-6xl'>No transactions found</h2>
                    </div>
                ) :
                    (<Table className="w-full  p-3   bg-white/10 backdrop-blur-xl rounded-lg  border-white/20  shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                        <TableHeader className="w-full h-1/5  rounded-tl-lg rounded-tr-lg sticky top-0 bg-[#1a0b2e] backdrop-blur-xl border-b-2 border-white/20 z-10">
                            <TableRow className="text-2xl text-white ">
                                <TableHead className="w-45 text-white text-2xl">Date</TableHead>
                                <TableHead className="w-45 text-white text-2xl">Transactions</TableHead>
                                <TableHead className="w-45 text-white text-2xl">Category</TableHead>
                                <TableHead className="w-45 text-white text-2xl">Amount</TableHead>
                                <TableHead className="w-45 text-white text-2xl">Actions</TableHead>

                            </TableRow>

                        </TableHeader>
                        <TableBody>
                            {dataTrans.map((transaction, index) => {

                                return (<>
                                    <TableRow className="hover:bg-white/10 cursor-pointer text-xl  text-white" key={transaction._id} ref={index === dataTrans.length - 1 ? ref : null} >
                                        <TableCell className="font-medium text-white">
                                            {/* <SimpleAvatar type={transaction.type} field = {transaction.category[0]}/> */}
                                            {new Date(transaction.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
                                        </TableCell>
                                        <TableCell>{transaction.title}</TableCell>
                                        <TableCell>{transaction.category}</TableCell>

                                        <TableCell className={` ${transaction.type === 'income' ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]'}`}>{transaction.type === 'income' ? `${symbol} ${transaction.amount}` : `${symbol} ${transaction.amount}`}</TableCell>
                                        <TableCell className="">
                                            <DropdownMenu >
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline"  className=" bg-white/10 backdrop-blur-2xl rounded">
                                                        Options
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-32">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem onClick={() => handleUpdate(transaction._id)}>
                                                            
                                                            Update</DropdownMenuItem>

                                                       
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem variant="destructive" onClick={() => handleDelete(transaction._id)}>
                                                            <DeleteIcon className="me-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            </TableCell>
                                    </TableRow>


                                </>


                                )



                            })}
                        </TableBody>
                    </Table>)}
                
            </div>
            <Button variant="outline" className=" rounded-full h-12 w-12 mb-3 z-50 fixed self-end bottom-0 right-10" onClick={() => setShow(true)}><PlusIcon className='w-6 h-6 ' /></Button>
            {show && <TransactionPopUp show={show} setShow={setShow} />}
            {showUpdate && <UpdateTransactions show={showUpdate} setShow={setShowUpdate} transaction={transaction} />}
        </main>
        
    )
    
}

export default Transaction
