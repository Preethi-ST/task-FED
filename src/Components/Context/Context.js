import React, { useState,useEffect } from 'react'
import axios from 'axios'

/* Create context */
export const TodoContext = React.createContext()

/* Create provider - so that all the enclosed component will have access to the states - to avoid props drilling */
export const TodoContextProvider = ({children}) => {
    /* const [alltask, setAllTask] = useState({}) */
    const [openTask, setOpenTask] = useState([])
    const [inProgTask, setInProgTask] = useState([])
    const [compTask,setCompTask] = useState([])

    async function getTodoData() {
        await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/todo/allTask`)
            .then(res => {
                console.log(res.data)
                /* setAllTask(res.data.alltask) */
                setOpenTask(res.data.openTask)
                setCompTask(res.data.compTask)
                setInProgTask(res.data.InPTask)
            }
        )
    }
    useEffect(()=> {
        getTodoData()
        return () => {
            <></>
        }
    },[])
    return (
        <TodoContext.Provider value={{openTask,compTask,inProgTask,getTodoData}}>
            {children}
        </TodoContext.Provider>
    )
}