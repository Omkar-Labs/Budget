
import { Login } from './Login'
import { Otp } from './Otp'
import SignUp from './SignUp'
import { Player } from '@lottiefiles/react-lottie-player'
import progerss from '@/assets/progerss.json'
import { useRef,useState } from 'react'
import gsap from 'gsap'


export const SignupLoginPage = () => {
    const cardRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);
    const handleFlip = (e)=>{
        e.preventDefault();
        if(!isFlipped){
            gsap.to(cardRef.current, {rotationY:180, duration:0.8, ease:"power2.inOut"});
        }
        else{
            gsap.to(cardRef.current, {rotationY:0, duration:0.8, ease:"power2.inOut"});
        }
        setIsFlipped((prev)=>!prev);
    }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]'>
        <div className='h-screen w-3/5 '>
            <h1 className='text-5xl font-bold text-white text-center mt-20 font-sans'>Master Your Money</h1>
            <Player
                autoplay
                loop
                src={progerss}
                className='h-125 w-175 md:h-141.75 md:w-200 mt-10 @lg:h-150 @lg:w-225 mx-auto'
            >
            </Player>
        </div>
        <div className=' auth-container h-screen w-2/5 flex items-center justify-center'>

            <div ref={cardRef} className='auth-card w-90'>
                
                {isSignUp ? <SignUp handleFlip={handleFlip}/> : <Otp handleFlip={handleFlip}/>}
                <Login handleFlip={handleFlip} setSignUp={setIsSignUp}/>
            </div>
        </div>
    </div>
  )
}
