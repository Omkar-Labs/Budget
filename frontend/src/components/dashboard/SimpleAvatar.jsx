import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SimpleAvatar = ({field,type}) => {
    return (
        <div>
            <Avatar className={`${type === "income" ? "bg-emerald-500/80 text-white" : "bg-pink-500/80 text-white"} flex items-center justify-center w-10 h-10 rounded-full`}>
                <p>{field}</p>
                
            </Avatar>
        </div>
    )
}

export default SimpleAvatar