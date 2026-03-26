import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function usefetchEdit() {
    let [data,setData]=useState(null);
    const fetchEdit=(url,data)=>{
        axios.patch(url,data,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.success){
                setData({serverData:res.data.data});
                toast.success("Record updated..!");
            }
        }).catch((err)=>{
            if(err.response){
                toast.error(err.response.data.message || "Server error !");
            }
            else if(err.request){
                toast.error("Server is not responding...!");
            }
            else{
                toast.error("Something broken!");
            }
        })
    }
    return {data,fetchEdit};
}
