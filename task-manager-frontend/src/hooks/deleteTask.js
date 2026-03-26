import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function useDeleteTask(userData) {
    const deleteTask = (userData) => {
        axios.delete('http://localhost:3000/user/task/update', {
            data: userData,
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data.success) {
                toast.success("Task deleted..!");
            }
        }).catch((err) => {
            console.log(err);
            if (err.request) {
                toast.error("Server not responding");
            }
            else if (err.response) {
                toast.error("Task fail. Server problem..!");
            }
            else {
                toast.error("Something broken");
            }
        })
    }
    return { deleteTask }
}
