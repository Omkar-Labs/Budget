import { useState } from "react"



const useTrend = (currentData , prevData) =>{
    const trend = 0;
    if(prevData !== 0){
       return ((currentData - prevData) / prevData * 100);
    }
    return trend;
}

export default useTrend;