import React, { useContext } from 'react'
import { NavLink  } from 'react-router-dom'
import {DashAvatar} from'./DashAvatar'
import { User } from '@/App'

import wallet from '/wallet.svg'


const Header = ({setProfileOpen , profileOpen}) => {
    const {data} = useContext(User);
  return (
    <div className='flex flex-wrap items-center justify-between gap-2 lg:gap-6 p-2 mt-2 bg-white/10 backdrop-blur-xl border-2 border-emerald-500/60  shadow-emerald-500/80 rounded-lg w-full'>
        <div className='flex items-center justify-evenly gap-2 lg:gap-4'>
            {/* <Wallet className='inline-block mr-2 text-pink-500/80' size={24}/> */}
            <img src={wallet} alt="Wallet" className='h-8 w-12 lg:h-10 lg:w-16'/>
            <h1 className='text-white text-lg lg:text-2xl hidden sm:block' >Budget</h1>
        </div>
        <div className="order-3 w-full sm:order-0 sm:w-auto flex justify-center mt-2 sm:mt-0">
            <ul className='flex items-center gap-4 lg:gap-6 list-none text-sm lg:text-base'>
                <li>
                    <NavLink to="/" className={({isActive }) => ` hover:text-pink-500/80 hover:shadow-pink-500/80 hover:underline-pink-500/80 ${isActive ? 'text-pink-500/80 shadow-pink-500/80 underline-pink-500/80' : 'text-white'}`}>DashBoard</NavLink>
                    
                </li>
                <li>
                    <NavLink to="/transactions" className={({isActive}) => ` hover:text-pink-500/80 hover:shadow-pink-500/80 hover:underline-pink-500/80 ${isActive ? 'text-pink-500/80 shadow-pink-500/80 underline-pink-500/80' : 'text-white'}`}>Transactions</NavLink>
                </li>
                <li>
                    <NavLink to="/budgets" className={({isActive}) => ` hover:text-pink-500/80 hover:shadow-pink-500/80 hover:underline-pink-500/80 ${isActive ? 'text-pink-500/80 shadow-pink-500/80 underline-pink-500/80' : 'text-white'}`}>Budgets</NavLink>

                </li>
                
            </ul>
        </div>
        <div>
            <DashAvatar imageSrc={data?.user.avatar} setProfileOpen={setProfileOpen} profileOpen={profileOpen}/>
            
        </div>

    </div>
  )
}

export default Header