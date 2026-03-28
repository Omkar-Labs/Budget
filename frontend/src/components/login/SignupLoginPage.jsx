import { Login } from './Login'
import { Otp } from './Otp'
import SignUp from './SignUp'
import { Player } from '@lottiefiles/react-lottie-player'
import progerss from '@/assets/progerss.json'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

export const SignupLoginPage = () => {
    const cardRef = useRef(null);
    const headingRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);

    useEffect(() => {
        gsap.fromTo(headingRef.current, 
            { opacity: 0, y: -40 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

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
    <div className='min-h-screen w-full flex flex-col lg:flex-row bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d] overflow-y-auto lg:overflow-hidden'>
        <div className='w-full lg:w-3/5 z-0 relative flex flex-col items-center justify-center pt-8 lg:pt-0 lg:h-screen'>
            <h1 ref={headingRef} className='text-4xl lg:text-5xl font-bold text-white text-center lg:mt-20 font-sans drop-shadow-xl'>Master Your Money</h1>
            <div className='hidden lg:block'>
                <Player
                    autoplay
                    loop
                    src={progerss}
                    className='h-125 w-175 lg:h-141.75 lg:w-200 mt-10 xl:h-150 xl:w-225 mx-auto'
                >
                </Player>
            </div>
        </div>
        <div className=' auth-container flex-1 lg:h-screen w-full lg:w-2/5 flex items-center justify-center z-10 px-4 pb-12 lg:pb-0'>

            <div ref={cardRef} className='auth-card w-full max-w-[420px] relative flex justify-center items-center'>
                
                {isSignUp ? <SignUp handleFlip={handleFlip}/> : <Otp handleFlip={handleFlip}/>}
                <Login handleFlip={handleFlip} setSignUp={setIsSignUp}/>
            </div>
        </div>
    </div>
  )
}
