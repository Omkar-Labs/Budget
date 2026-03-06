
import { redirect } from "react-router-dom";
import axios from "axios";





export const filterData = async ({request})=>{
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "all";
    const category = url.searchParams.get("category") || "all";
    const search = url.searchParams.get("search") || "";
    const skip = url.searchParams.get("skip") || 0;
    const limit = url.searchParams.get("limit") || 100;
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
        let query = "";
        if(type !== "all"){
            query += `&type=${type}`;
        }
        if(category !== "all"){
            query += `&category=${category}`;
        }
        if(search.trim() !== ""){
            query += `&search=${search}`;
        }
        if(limit !== 100){
            query += `&limit=${limit}`;
        }
        if(skip !== 0){
            query += `&skip=${skip}`;
        }
        if(startDate && endDate){
            query += `&startDate=${startDate}&endDate=${endDate}`;
        }

        try{
            const res = await axios.get(`${import.meta.env.VITE_TRANSACTIONS}?${query}`,{
                withCredentials:true
            });
            return res.data.data;
        }
        catch(err){
            console.log(err.response.data.message);
          if(err.response.data.message === "Access Token expired"){
            try{
                await axios.post(import.meta.env.VITE_REFRESH_TOKEN,{},{withCredentials:true});
                return await filterData({request});
            }
            catch(err){
                
                throw redirect("/login");
            }
          }
          throw redirect("/login");
        }
    }