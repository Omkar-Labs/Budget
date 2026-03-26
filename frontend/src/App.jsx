
import './App.css'
import React, { useState } from 'react'
import { useLoaderData, Outlet } from 'react-router-dom';
import Header from './components/dashboard/Header';
import Profile from './components/dashboard/Profile';



const User = React.createContext(null);
function App() {
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <>
            <User.Provider value={{ data, setData }}>
                <div className='h-screen w-full flex flex-col bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'>
                    <Header setProfileOpen={setProfileOpen} profileOpen={profileOpen} />
                    <Outlet />
                   {profileOpen && <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen} />}
                </div>

            </User.Provider>
        </>
    )
}
export { App, User }
