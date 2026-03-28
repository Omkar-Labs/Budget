import Welcome from './assets/Welcome.json';
import { Player } from '@lottiefiles/react-lottie-player'

export const GlobalLoader = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d] z-50 fixed top-0 left-0'>
            <Player
                autoplay
                loop
                src={Welcome}
                style={{ height: '300px', width: '300px' }}
            >
            </Player>
            <h2 className='text-white text-xl lg:text-3xl font-bold mt-4 animate-pulse uppercase tracking-widest'>Waking server...</h2>
        </div>
    )
}