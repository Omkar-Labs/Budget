import React, { useEffect, useState } from 'react'
import { User } from '../../App';
import { DashCard } from './DashCard';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import TransactionTable from './TransactionTable';
import DashChart from './DashChart';
import Transaction from '../Transaction/Transaction';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TransactionPopUp from '../Transaction/TransactionPopUp';
import { Button } from '../ui/button';


export const DashBoard = () => {
    gsap.registerPlugin(useGSAP);
    const { data, setData } = React.useContext(User);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const date = new Date();
    const [prevData, setPrevData] = useState({ prevTotalIncome: 0, prevTotalExpense: 0 });

    useGSAP(() => {
        gsap.from(".dashboard", {
            scale:0.5,
            opacity: 0,
            duration: 1,
            stagger:{
                from:"random",
                grid:"auto",
                amount:0.2,
                ease:"power2.out"
            },
            ease: "power2.out",
        })
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_TRANSACTIONS_STATS}?month=${date.getMonth() - 1}&year=${date.getFullYear()}`, { withCredentials: true });
                setPrevData({ prevTotalIncome: res.data.data.totalIncome, prevTotalExpense: res.data.data.totalExpense });
                return;
            }
            catch (err) {
                if (err.response?.data?.message === "Access Token expired") {
                    try {
                        await axios.post(import.meta.env.VITE_REFRESH_TOKEN, {}, { withCredentials: true });
                        await fetchData();
                    }
                    catch (refreshErr) {
                        return redirect("/login");
                        
                    }
                }
                return redirect("/login");;
            }
        }
        fetchData();

    }, []);
    return (
        <div className="w-full h-full overflow-y-auto lg:overflow-hidden pb-10 lg:pb-0 custom-scrollbar">
        {data.transactions.length > 0 ? <div className=' h-auto lg:h-screen w-full py-4 grid grid-rows-none lg:grid-rows-5 grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3  justify-items-center items-start'>
            <DashCard setShow={setShow} />
            <IncomeCard prevData={prevData} />
            <ExpenseCard prevData={prevData} />
            <TransactionTable />
            <DashChart />
        </div> : <div className='flex h-full flex-col w-full items-center justify-center gap-4 mt-10 text-center px-4'>
                        <h2 className='text-white text-3xl md:text-6xl leading-tight'>For Stats You Need to Add Transactions</h2>
                        <Button variant="outline" className=" mt-2 md:my-5  " onClick={()=> navigate("/transactions")}>Add Transaction</Button>
                    </div>}
            {show && <TransactionPopUp show={show} setShow={setShow} />}

        </div>
       
    )
}
