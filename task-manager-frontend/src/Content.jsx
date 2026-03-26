import React from 'react'
import './app.css';
import { useState } from 'react';
import { useEffect } from 'react';
import  axios  from 'axios';
import { toast } from 'react-toastify';
import useDeleteTask from './hooks/deleteTask';
export default function Content(props) {
    const {deleteTask}=useDeleteTask();
    let [userData, setData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/user/tasks', {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if (res.data.userData)
                setData(res.data.userData);
        }).catch((err) => {
            if (err.response)
                toast.error(err.response.message || "Server error");
            else if (err.request)
                toast.error("No response from server..!")
            else
                toast.error("Server error..!");
        })
    }, []);
    
    const editTask=(title,desc,id)=>{
       let newUserData={
        oldtitle:"",
        title:"",
        desc:""
       }
       newUserData["oldtitle"]=title;
       newUserData["title"]=title;
       newUserData["desc"]=desc;
       props.setData(newUserData);
       props.setEdit(true);
    }
    return (
        <div>
            {
                userData && (
                   userData.map((item,idx)=>{
                return (
                    <div className='view-container' key={idx}>
                        <div className='view-box'>
                            <div className='bg-blue-line'></div>
                            <div className='task-div'>
                                <div className='title-txt'>
                                    {item.task}
                                </div>
                                <div style={{ wordBreak: 'break-all' }}>
                                    {item.info}
                                </div>
                                <div className='gap-10' style={{ flexDirection: "row" }}>
                                    <button onClick={()=>{editTask(item.task,item.info,idx)}}>Edit</button>
                                    <button onClick={()=>{deleteTask({title:item.task})}}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                   })
                )
            }
        </div>
    )
}
