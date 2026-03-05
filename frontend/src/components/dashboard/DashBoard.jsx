import React, { useEffect, useState } from 'react'
import { User } from '../../App';
import { DashCard } from './DashCard';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionTable from './transactionTable';
import DashChart from './DashChart';

export const DashBoard = () => {
    const { data, setData } = React.useContext(User);
    const date = new Date();
    const navigate = useNavigate();
    const [prevData, setPrevData] = useState({ prevTotalIncome: 0, prevTotalExpense: 0 });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_TRANSACTIONS_STATS}?month=${date.getMonth() - 1}&year=${date.getFullYear()}`, { withCredentials: true });
                setPrevData({ prevTotalIncome: res.data.data.totalIncome, prevTotalExpense: res.data.data.totalExpense });
            }
            catch (err) {
                if (err.response?.data?.message === "Access Token expired") {
                    try {
                        await axios.post(import.meta.env.VITE_REFRESH_TOKEN, {}, { withCredentials: true });
                        fetchData();
                    }
                    catch (refreshErr) {
                        navigate("/login");
                    }
                }
                navigate("/login");
            }
        }
        fetchData();

    }, []);
    return (
        <div className='h-screen w-full py-4 grid grid-rows-5 grid-cols-2 gap-3 justify-items-center items-start'>
            <DashCard />
            <IncomeCard prevData={prevData} />
            <ExpenseCard prevData={prevData} />
            <TransactionTable />
            <DashChart />
        </div>


    )
}
