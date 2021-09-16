import axios from 'axios'
import React,{useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router'
import { TodoContext } from './Context/Context'
function TaskCard({task}) {
    const history = useHistory()
    const {getTodoData} = useContext(TodoContext)
    const handleDelete = async () => {
        try {
            console.log(task._id)
            let result = await axios.delete(`https://task-bed.herokuapp.com/api/todo/removeTask/${task._id}`)
            toast(result.data.message,{
                position: "top-right",
                autoClose : 1000
            })
            /* getTodoData() - will update the state - No need to reload page */
            getTodoData()

        } catch (error) {
            console.log(error)
            toast.warning('Issue in removing Task.. Check the console for details')
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='top'>
                <h5>{task.title}</h5>
                <div>
                    <span className='edit pr-3' onClick={()=>history.push(`/editTask/${task._id}`)}><i class="fad fa-edit"></i></span>
                    <span className='delete' onClick={handleDelete}><i class="fad fa-trash"></i></span>
                </div>
            </div>
            <hr />
            <div className='bottom'>
                {task.description}
            </div> 
        </>
    )
}

export default TaskCard
