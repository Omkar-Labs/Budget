import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { User } from '@/App';
import { useState } from 'react';

const MonthProgress = () => {
    const { data, setData } = React.useContext(User);
     const chartData ={
      Labels: ["Spent","Remaining"],
      datasets: [
        {
          data:[data.stats.totalExpense, data.budgets.totalLimit - data.stats.totalExpense],
          backgroundColor:["#d946ef","#10b981"],
          borderWidth:0,
          hoverOffset:4,
          borderRadius:10,
          cutout:'85%'
         
    }]
}
const options = {
  responsive: true,
  maintainAspectRatio: false,
}
  return (
    <div className=' w-full h-full flex flex-col p-4 items-center justify-center  bg-white/10 backdrop-blur-xl rounded-lg  border-white/20  shadow-[0_0_30px_rgba(255,0,255,0.1)]'>
        <h1 className='text-white  text-2xl z-10  absolute top-5 left-5'>Total Monthly Budget</h1>
        <div className='w-lg h-full z-0 fixed ' ><Doughnut data={chartData} redraw={true} options={options} /></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
            <span className='text-white/50 text-s uppercase'>Remaining</span>
            <span className='text-2xl font-bold text-white'>{Math.round(100 - ((data.stats.totalExpense / data.budgets.totalLimit) * 100))}%</span>
        </div>
    </div>
  )
}

export default MonthProgress