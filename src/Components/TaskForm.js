import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState,useEffect } from 'react'
import * as Yup from 'yup'
import { Formik,Form } from 'formik'
import FormControl from './Formik/FormControl'

import { useHistory, useParams } from 'react-router'

function TaskForm() {
/*      */
    const history = useHistory()

    /* checking whether EDIT or CREATE */
    const [editTask,setEditTask] = useState(undefined)
    const pathFlag = history.location.pathname.includes('edit') ? 1 : 0;
    /* Code gets executed when user is on - EDIT */
    const taskid = useParams();
    console.log(taskid)
    const getTask = async () => {
        let task_to_be_updated = await axios.get(`https://task-bed.herokuapp.com/api/todo/gettask/${taskid.id}`)
        setEditTask(task_to_be_updated.data.task)
        console.log(task_to_be_updated.data.task)
    }

    useEffect(() => {
        if(pathFlag){
            getTask()
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathFlag])
    
    const initialValues = {
        title : editTask?.title || '',
        description : editTask?.description ||  '',
        status : editTask?.status || ''
    }
    const validationSchema = Yup.object({
        title : Yup.string().required('Title is required'),
        description : Yup.string().required('Description is required'),
        status : Yup.string().required('Status is required')
   })
    const statusTypes = [
        {key : 'open', value : 'Open'},
        {key : 'inprogress' , value : 'InProgress'},
        {key : 'completed', value : 'Completed'}
    ]
    const onSubmit = async (values,onSubmitProps) => {
        console.log(values)
        let toastify,msg,result;
        const {title,description,status} = values
        try {
            if(!pathFlag){
                result = await axios.post(`https://task-bed.herokuapp.com/api/todo/createTask`,{
                    title,description,status
                })
            }else{
                result = await axios.patch(`https://task-bed.herokuapp.com/api/todo/update/${taskid.id}`,{
                    title,description,status
                })
            }
            
            toastify = toast.success
            msg = result.data.message;
            
            setTimeout(() => {
                history.push('/')
            }, 2000);
        } catch (error) {
            toastify = toast.error
            msg = error.response.data.message
        }
        onSubmitProps.resetForm() /* reset form data */
        toastify(msg,{  /* Display msg that we got from server */
            position: "top-right"
        })
    }
    
    return (
        <>
            <ToastContainer />
            {/* 
                enableReinitialize - set it to true, so that the form will reinitialize every time the initialValues prop changes
                validateOnMount - validate on page load - to disable the submit button
            */ }
            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit = {onSubmit} enableReinitialize validateOnMount>
                {
                    (formik) => {
                        
                        return <Form>
                            <FormControl control = 'input' type='text' label = 'Title' name='title' placeholder='New Task...' />
                            <FormControl control = 'textarea' type='text' label = 'Description' name='description' placeholder='Task Description...' />
                            <FormControl control = 'select' type = 'text' label = 'Status' name='status' placeholder = 'choose ...' options = {statusTypes}  />
                            <div>
                                <button type='submit'  className={`btn btn-success display-inline mr-3`} disabled= {!(formik.isValid)} style={{width: '100px'}}>
                                    {pathFlag ? 'Update' : 'Create'}
                                </button>
                                <button type='submit'  className={`btn btn-danger display-inline`} style={{width: '100px'}}
                                    onClick = {()=>history.push('/')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    }
                }
            </Formik>
        </>
    )
}

export default TaskForm
