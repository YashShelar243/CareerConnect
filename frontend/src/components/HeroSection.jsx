import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
 
const HeroSection =()=>{

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }


    return(
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">

            <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-blue-600 font-medium">No.1 Career Connect Website</span>
            <h1 className="text-5xl font-bold">Search ,Apply & <br /> Get Your <span className="text-[#FF6B6B]">Dream Jobs</span></h1>
            <p>"Career Connect bridges talent and opportunity, empowering students and recruiters with seamless job-matching solutions."</p>
            <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full item-center gap-4 mx-auto">
                <input 
                type="text"
                placeholder="Find Your dream job"
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none border-none w-full"
                />
                <Button onClick = {searchJobHandler} className="rounded-r-full bg-[#FF6B6B] ">
                    <Search className="h-5 w-5"/>
                </Button>
            </div>
            </div>
        
        </div>
    )
}

export default HeroSection