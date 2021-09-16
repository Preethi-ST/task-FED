import React, { useContext,useEffect } from 'react'

import { TodoContext } from './Context/Context'
import {Link} from 'react-router-dom'
import TaskCard from './TaskCard'
function MainPage() {
    const {getTodoData,openTask,compTask,inProgTask} = useContext(TodoContext)
    
    useEffect(() => {
        getTodoData()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='container'>
            <div className='mb-3'>
                <Link to = '/addTask'>
                    <button type="button" class="btn btn-success btn-circle p-0"><i class="fas fa-plus-circle"></i></button>
                </Link> 
            </div>
            { /* Display open, inprogress and completed Task */ }
            <div className='row'>
                <div className='col-md-4'>
                    <div className='col-md-12'>
                        <h3>Open Task</h3>
                        {
                            openTask.map((task,index) => (
                                <div className='taskcard' key={index}>
                                    <TaskCard task={task} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='col-md-12'>
                        <h3>InProgress Task</h3>
                        {
                            inProgTask.map((task,index) => (
                                <div className='taskcard' key={index}>
                                    <TaskCard task={task} />
                                </div>
                            ))
                        }                    
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='col-md-12'>
                        <h3>Completed Task</h3>
                        {
                            compTask.map((task,index) => (
                                <div className='taskcard' key={index}>
                                    <TaskCard task={task} />
                                </div>
                            ))
                        } 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
