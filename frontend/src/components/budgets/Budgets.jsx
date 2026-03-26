import React from 'react'
import MonthProgress from './MonthProgress'
import CategoryProgress from './CategoryProgress'
import BudgetCard from './BudgetCard'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import AddBudgets from './AddBudgets'
import { useState } from 'react'

export const Budgets = () => {
  const [show,setShow] = useState(false);
  const handleShow = () => {
    setShow((prev)=>!prev);
  }
  return (
    <div className='w-full h-screen grid grid-cols-2 grid-rows-2 items-center py-4 px-2 justify-center  gap-3'>
      <MonthProgress/>
      <CategoryProgress/>
      <BudgetCard/>
      <Button variant="outline" className=" rounded-full h-12 w-12 mb-3 z-50 fixed self-end bottom-0 right-10" onClick={handleShow}><PlusIcon className='w-6 h-6 ' /></Button>
      {show && <AddBudgets show={show} setShow={setShow}/>}
    </div>
  )
}
