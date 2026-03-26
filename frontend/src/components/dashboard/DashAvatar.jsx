import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UsersIcon , SettingsIcon,LogOutIcon } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"

export function DashAvatar({imageSrc, setProfileOpen,profileOpen}) {
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try{
      await axios.post(import.meta.env.VITE_LOGOUT,{},{withCredentials:true});
      return navigate("/login");
    }
    catch(err){
      if(err.response?.status === 401){
        try{
          await axios.post(import.meta.env.VITE_REFRESH_TOKEN,{},{withCredentials:true});
          await handleLogout();
        }
        catch(refreshErr){
          return navigate("/login");
        }
      }
      return navigate("/login");
    }
  }
  
  
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild  disabled={profileOpen}>
        <Button variant="ghost" size="icon" className="rounded-full" >
          <Avatar>
            <AvatarImage src={imageSrc} alt="profile Image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            <UsersIcon/>
            Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
            <LogOutIcon/>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
