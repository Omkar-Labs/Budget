
import './App.css'
import React, { useState } from 'react'
import { useLoaderData, Outlet } from 'react-router-dom';
import Header from './components/dashboard/Header';



const User = React.createContext(null);
function App() {
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);

    return (
        <>
            <User.Provider value={{ data, setData }}>
                <div className='h-screen w-screen flex flex-col bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'>
                    <Header />
                    <Outlet />
                </div>

            </User.Provider>
        </>
    )
}
export { App, User }
