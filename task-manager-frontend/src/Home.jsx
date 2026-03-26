import { useState } from 'react'
import './App.css'
import axios from "axios";
import Content from './Content';
import { toast, ToastContainer } from 'react-toastify';
import usefetchEdit from './hooks/fecthEdit';
import { useEffect } from 'react';
function Home() {
  const url="http://localhost:3000/user/task/update";
  let {data,error,fetchEdit} =usefetchEdit();
  let [edit,setEdit]=useState(false);
  const [count, setCount] = useState(0)
  let [userData, setUserData] = useState({
    title: "",
    desc: ""
  });
  const handleInput = (e) => {
    const { value, name } = e.target;
    let newData = { ...userData };
    newData[name] = value;
    setUserData(newData);
  }
  const submitForm = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user/title',userData,
      {
        headers:{
          "Content-Type":"application/json",
          authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then((res)=>{
      if(res.data.success)
        toast.success("Task added..!");
      else
        toast.error("Server error..!");        
    }).catch((err)=>{
      if(err.response)
        toast.error(err.response.message || "Sever error!");
      else if(err.request)
        toast.error("No response from server..!");
      else
        toast.error("Something broken..!");
    })
  }
  const editTask=()=>{
    fetchEdit(url,userData);
  }
  return (
    <div className='gap-10'>
      <ToastContainer/>
      <div>
        <header className='head-foot-container bg-black'>
          <div>
            TaskFlow
          </div>
          <div className='sub-txt color-grey'>
            Stay on top of everything
          </div>
        </header>
      </div>
      <div>
        <div className='input-container'>
          <form onSubmit={submitForm} className='gap-10'>
            <div>New Task</div>
            <div className='input-box'>
              <label>Title<span style={{ color: "red" }}>*</span></label>
              <input
                className='bg-black'
                placeholder='What needs to be done?'
                name="title"
                onChange={handleInput}
                value={userData.title}
              ></input>
            </div>
            <div className='input-box'>
              <label>Description<span style={{ color: "red" }}>*</span></label>
              <textarea
                name="desc"
                onChange={handleInput}
                placeholder='What needs to be done?'
                value={userData.desc}
              ></textarea>
            </div>
            <div>
              {
                edit
                ?
                (
                  <button type="button" onClick={()=>{editTask()}}>Edit Task</button>
                )
                :
                (
                 <button>Add Task</button> 
                )
              }
            </div>
          </form>
        </div>
        <Content userData={userData} setData={setUserData} setEdit={setEdit}/>
      </div>
    </div>
  )
}

export default Home
