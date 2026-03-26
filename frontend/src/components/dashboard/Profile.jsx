import React, { useContext, useLayoutEffect } from 'react'
import { User } from '@/App'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import gsap from 'gsap'
import {ArrowRightIcon} from 'lucide-react'

function Profile({profileOpen, setProfileOpen}) {
    const { data } = useContext(User)
    useLayoutEffect(()=>{
        gsap.fromTo(".profile",{opacity:0,x:100},{opacity:1,x:0,duration:0.5,ease:"power2.out"})
    },[profileOpen])
    const handleProfileClose = () => {
        gsap.fromTo(".profile",{opacity:1,x:0},{opacity:0,x:100,duration:0.3,ease:"power2.out"})
        setTimeout(() => {
            setProfileOpen(false);
        }, 300);
    }
    return (
        
           
        <div className='profile h-100 w-80 fixed right-0 top-20 bg-black/20 backdrop-blur-sm p-4 rounded-lg shadow-lg '>
            <div className='fixed absolute top-2 right-2  z-10 flex items-center justify-end'>
                <button onClick={handleProfileClose} className='text-white flex items-center gap-2 cursor-pointer'>
                BACK<ArrowRightIcon size={15}/>
            </button>
            </div>
            <div className='h-1/4 w-full flex flex-col items-center justify-center gap-2 my-3'>
                <Avatar className="h-20 w-20">
                    <AvatarImage src={data.user.avatar} alt="profile Image" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='h-full w-full flex items-center justify-center'>
                    <h1 className='text-white text-2xl font-bold'>{data.user.username}</h1>
                </div>
            </div>
            <div className='h-1/4 w-full flex flex-col items-center justify-start mt-2'>
                <label htmlFor="email" className='text-white text-xl font-bold self-start ml-3'>Email:</label>
                <h1 className='text-white text-xl font-bold mt-2'>{data.user.email}</h1>
            </div>
            <div className='h-1/4 w-full flex flex-col items-center justify-start'>
                <label htmlFor="createdAt" className='text-white text-xl font-bold self-start ml-3'>Created At:</label>
                <h1 className='text-white text-xl font-bold mt-2'>{new Date(data.user.createdAt).toLocaleDateString()}</h1>
            </div>
            <div className='h-1/4 w-full flex flex-col items-center justify-start'>
                <label htmlFor="currency" className='text-white text-xl font-bold self-start ml-3'>Currency:</label>
                <h1 className='text-white text-xl font-bold mt-2'>{data.user.currency}</h1>
            </div>

        </div>
        
    )
}

export default Profile