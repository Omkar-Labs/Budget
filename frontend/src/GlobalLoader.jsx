import Welcome from './assets/Welcome.json';
import { Player } from '@lottiefiles/react-lottie-player'

export const GlobalLoader = () => {
    return (
        <div className='h-screen w-full flex flex-col bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'> <Player
            autoplay
            loop
            src={Welcome}
            style={{ height: '300px', width: '300px' }}
        >
        </Player> </div>
    )
}