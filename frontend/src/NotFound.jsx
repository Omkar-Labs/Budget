import { Player } from '@lottiefiles/react-lottie-player'
import notFound from './assets/notfound.json'



function NotFound() {
    return (
        <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d] '>
            <Player
                            autoplay
                            loop
                            src={notFound}
                            className='h-full w-full '
                        >
             </Player>
        </div>
    )
}
export default NotFound