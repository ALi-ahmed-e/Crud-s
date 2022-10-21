import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTaskAction } from '../../store/Slices/AddTaskSlice'
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import useRefreshUser from '../RefreshUser/RefreshUser';


const AddTask = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.User)
    const updatemode = useSelector(state => state.Add.update)
    const { Toggle } = AddTaskAction
    const status = useRef()
    const description = useRef()
    const title = useRef()
    const [btntext, setbtntext] = useState('Create Task');
    const [refreshUser] = useRefreshUser()
    const clg = (e) => {

        if (e.target.id == 'yes') {

            dispatch(Toggle())
        }

    }

    useEffect(() => {
        if (updatemode) {
            title.current.value = updatemode.TaskTitle
            description.current.value = updatemode.TaskDescription
            status.current.value = updatemode.TaskStatus
            setbtntext('Save')
        }

    }, [updatemode]);


    const AddTask = async () => {
        setbtntext(<>Creating Task <div role="status" className='inline'>
            <svg className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div></>)

        if (updatemode) {
            const washingtonRef = doc(db, "Tasks", updatemode.TaskId);
            await updateDoc(washingtonRef, {
                TaskTitle: title.current.value,
                TaskDescription: description.current.value,
                TaskStatus: status.current.value,
            });
            setbtntext('Saving changes') 
        } else {
            const All = '8%b523%76GSsmgfgifro'
            const TaskId = []
            for (let i = 0; i < All.length; i++) {
                TaskId.push(All[Math.floor(Math.random() * All.length)])

            }


            const data = {
                TaskTitle: title.current.value,
                TaskDescription: description.current.value,
                TaskStatus: status.current.value,
                timeStamp: serverTimestamp(),
                Date: Date(),
                TaskId: TaskId.join(''),
            }

            await setDoc(doc(db, "Tasks", TaskId.join('')), data);
            const washingtonRef = doc(db, "users", user.uid);
            await updateDoc(washingtonRef, {
                tasks: arrayUnion(TaskId.join(''))
            });
       setbtntext('Create Task') 
    }
        
        refreshUser()
        dispatch(Toggle())
    }








    return (
        <div id='yes' className='fixed  top-0 right-0 bottom-0 left-0 bg-black/40 backdrop-blur-[3px] flex justify-center items-center z-50' onClick={(e) => clg(e)}>

            <div id='not' className='w-[95%] ring-blue-500 ring-[.4px] max-w-[450px] h-[520px] dark:bg-slate-800 bg-white dark:text-white rounded-lg'>


                <div className="mb-6 w-[90%] mx-auto flex flex-col items-start my-10 ">
                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input ref={title} type="text" id="default-input" placeholder='Task Title...' className="bg-gray-50 border scrol border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>



                <div className='w-[90%] mx-auto flex flex-col items-start my-10'>

                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <textarea ref={description} id="message" rows="4" className="block p-2.5 w-full max-h-[100px] min-h-[100px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task Description..."></textarea>

                </div>



                <div className=' w-[90%] mx-auto flex flex-col items-start my-10'>

                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Status
                    </label>
                    <select
                        ref={status}
                        id="countries"
                        className="bg-gray-50 border border-gray-300  text-gray-900 outline-none  text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    >
                        <option defaultValue>Todo</option>
                        <option >Done</option>
                        {/* <option value="CA">which</option>
                        <option value="FR">Favourites</option> */}
                    </select>


                </div>

                <button onClick={e => AddTask(e)} className='bn632-hover bn24 w-[90%] py-2 rounded-4xl'>{btntext}</button>


            </div>

        </div>
    )
}

export default AddTask