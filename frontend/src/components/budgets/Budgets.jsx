import React, { useContext } from 'react'
import MonthProgress from './MonthProgress'
import CategoryProgress from './CategoryProgress'
import BudgetCard from './BudgetCard'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import AddBudgets from './AddBudgets'
import { useState } from 'react'
import { User } from '../../App'

export const Budgets = () => {
  const { data } = useContext(User)
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  }
  return (
    <div className='w-full h-full overflow-y-auto lg:overflow-hidden pb-24 lg:pb-0 custom-scrollbar'>
      <div className='w-full h-auto lg:h-screen grid grid-cols-1 lg:grid-cols-2 grid-rows-none lg:grid-rows-2 items-center py-4 px-2 justify-center gap-6 lg:gap-3'>
        {data.budgets.budget.length > 0 ? <><MonthProgress/>
      <CategoryProgress/>
      <BudgetCard/></> : <div className='flex h-full w-full fixed items-center justify-center gap-4 mt-10 px-4 text-center z-0'>
          <h2 className='text-white text-3xl lg:text-6xl'>No budgets found</h2>
        </div>}
      </div>
      <Button variant="outline" className=" rounded-full h-12 w-12 mb-3 z-50 fixed self-end bottom-4 right-4 lg:bottom-10 lg:right-10 shadow-lg shadow-pink-500/50" onClick={handleShow}><PlusIcon className='w-6 h-6 ' /></Button>
      {show && <AddBudgets show={show} setShow={setShow} />}
    </div>
  )
}
