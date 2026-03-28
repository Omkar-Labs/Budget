
import './App.css'
import React, { useState } from 'react'
import { useLoaderData, Outlet } from 'react-router-dom';
import Header from './components/dashboard/Header';
import Profile from './components/dashboard/Profile';
import { useNavigation } from 'react-router-dom';
import Welcome from './assets/Welcome.json';
import { Player } from '@lottiefiles/react-lottie-player'



const User = React.createContext(null);
function App() {
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigation();
    const isLoading = navigate.state === "loading";

    return (
        <>
        {isLoading ? <div className='h-screen w-full flex flex-col bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'> <Player
                        autoplay
                        loop
                        src={Welcome}
                        style={{ height: '300px', width: '300px' }}
                    >
                    </Player> </div> : 
            <User.Provider value={{ data, setData }}>
                <div className='h-screen w-full flex flex-col bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'>
                    <Header setProfileOpen={setProfileOpen} profileOpen={profileOpen} />
                    <Outlet />
                   {profileOpen && <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen} />}
                </div>
            </User.Provider>}
        </>
    )
}
export { App, User }
