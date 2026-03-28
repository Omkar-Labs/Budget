"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { useContext } from 'react'
import { User } from '@/App'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SearchIcon } from 'lucide-react';
import axios from "axios"
import { useSearchParams } from "react-router-dom"




const TransHeader = ({filter ,setFilter,date,setDate}) => {
    const { data } = useContext(User);
    const[searchParams,setSearchParams] = useSearchParams();
    const handleFilterChange = (value, name) => {
    // 1. Update your local state
    setFilter(prev => ({ ...prev, [name]: value }));


    // 2. Update the URL
    setSearchParams((prev) => {
        // Create a new instance to avoid mutation issues
        const params = new URLSearchParams(prev);

        // Update name-based filters
        if (name === "search") {
            value ? params.set("search", value) : params.delete("search");
        } else if (name === "type" || name === "category") {
            value !== "all" ? params.set(name, value) : params.delete(name);
        }

        // Update date-based filters (ensure 'date' is accessible here)
        if (date?.from) {

            params.set("startDate", date.from.toLocaleDateString("sv-SE"));
            params.set("endDate", date.to.toLocaleDateString("sv-SE") );
        }else{
            params.delete("startDate");
            params.delete("endDate");
        }
        

        // CRITICAL: Return the modified object
        return params;
    }, { replace: true }); // Using 'replace' prevents clogging browser history
    };
    React.useEffect(()=>{
        handleFilterChange(date,"date");
    },[date])

    
    return (
        <div className=' flex flex-col xl:flex-row items-center self-start sticky justify-between gap-4 p-4 mt-2 mb-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl w-full z-0'>
            <div className='flex items-center justify-evenly gap-4 w-full xl:w-auto'>

                <h1 className='text-white text-2xl w-full text-center xl:text-left' >Transactions</h1>
            </div>
            <div className="w-full xl:w-auto">
                <InputGroup className="bg-white/10 border-white/20 text-white w-full md:w-64">
                    <InputGroupInput placeholder="Search transactions..." value={filter.search} name="search" onChange={(e) => handleFilterChange(e.target.value, "search")} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div className="flex flex-wrap gap-4 w-full xl:w-auto justify-center">
                <Select onValueChange={(value) => handleFilterChange(value, "category")} name="category" value={filter.category}>
                    <SelectTrigger className="w-full md:w-45 bg-white/10 border-white/20 ">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Category</SelectItem>
                            {data.stats.categoryStats.map((item,index) => (<SelectItem value={`${item._id}`} key={index}>{item._id}</SelectItem>))} 
                        </SelectGroup>
                    </SelectContent>
                </Select>
                
                <Select onValueChange={(value) => handleFilterChange(value, "type")} name="type" value={filter.type}>
                    <SelectTrigger className="w-full md:w-45 bg-white/10 border-white/20 ">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                           
                
            </div>
            <div className="w-full xl:w-auto flex justify-center">



                <Field className="mx-auto w-full md:w-60 bg-white/10 border-white/20 " >
                    
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date-picker-range"
                                className="justify-start px-2.5 font-normal w-full"
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                
                            />
                        </PopoverContent>
                    </Popover>
                </Field>

            </div>

        </div>
    )
}

export default TransHeader