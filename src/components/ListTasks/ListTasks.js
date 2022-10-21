import React, { useLayoutEffect, useState, Fragment, useEffect } from 'react'
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector,useDispatch } from 'react-redux';
import { EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, query, where, getDocs } from "firebase/firestore";
import useRefreshUser from '../RefreshUser/RefreshUser';
import { AddTaskAction } from '../../store/Slices/AddTaskSlice';





const ListTasks = () => {
    const user = useSelector(state => state.Auth.User)
    const [Tasks, setTasks] = useState([]);
    const [refreshUser] = useRefreshUser()
    const [skillton, setskillton] = useState(true)
    const { UpdateTask } = AddTaskAction
    const dispatch = useDispatch()




    const getTasks = async () => {

        let list = []

        const q = query(collection(db, "Tasks"), where("TaskId", "in", user.tasks));

        const querySnapshot = await getDocs(q);
        setskillton(false)
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });


        setTasks(list)
    }


    useLayoutEffect(() => {
        getTasks()
    }, [])

    const deleteTask = async (task) => {
        const theUser = doc(db, "users", user.uid);
        await deleteDoc(doc(db, "Tasks", task.TaskId));
        await updateDoc(theUser, {
            tasks: arrayRemove(task.TaskId)
        });
        refreshUser()
        getTasks()
    }

    const togglestatus = async (task) => {
        const washingtonRef = doc(db, "Tasks", task.TaskId);

        if (task.TaskStatus == 'Todo') {
            await updateDoc(washingtonRef, {
                TaskStatus: 'Done'
            })


        } else {
            await updateDoc(washingtonRef, {
                TaskStatus: 'Todo'
            })

        }
        refreshUser()
        setskillton(false)
        getTasks()

    }


    const Showmore = (task)=>{
        console.log(task)
    }



    const editTask = (task)=>{
        dispatch(UpdateTask(task))
    }

    return (
        <>

            {Tasks.map(task =>

                <div key={Math.random()} className=' inline-flex w-fit  ameda'>


                    <div className="  p-6 w-full   flex flex-col justify-around m-2  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                        <div className=' flex justify-between'>
                          
                            <span className=' -mt-3' onClick={()=>{togglestatus(task)}}>
                            <label
                                htmlFor="checked-toggle"
                                className="inline-flex relative items-center cursor-pointer"
                            >
                                {task.TaskStatus == 'Done' ?<input
                                    type="checkbox"
                                    defaultValue=""
                                    id="checked-toggle"
                                    className="sr-only peer"
                                    defaultChecked
                                />:<input
                                type="checkbox"
                                defaultValue=""
                                id="checked-toggle"
                                className="sr-only peer"
                            />}
                                <div className={` ${task.TaskStatus == 'Done'?'after:bg-green-500 ':'after:bg-red-600'} w-9 h-4 bg-gray-200 rounded-full  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]   after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600`} />
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {task.TaskStatus}
                                </span>
                            </label>
                            </span>

                            
                            
                            
                            
                        <div className=" -my-3 text-right">


                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <EllipsisHorizontalIcon
                                            className="-mx-3 -my-2  h-5 w-6 text-white hover:text-violet-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-[120px] origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-600 dark:text-whtie shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => { deleteTask(task) }}
                                                        className={`${active ? 'bg-black/20 ' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white`}
                                                    >
                                                        <TrashIcon className=' mr-2 w-5' />
                                                        Delete
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                    onClick={()=>editTask(task)}
                                                        className={`${active ? 'bg-black/20 ' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white`}
                                                    >
                                                        <PencilIcon className=' w-5 mr-2' />Edit
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>


                                    </Menu.Items>
                                </Transition>
                            </Menu>



                        </div>




                    </div>


                    <button>
                        <h5 className={`"mb-4 text-2xl font-bold tracking-tight decoration-[4px]  dark:decoration-black text-gray-900 dark:text-white "  ${task.TaskStatus == 'Done' && 'line-through'}`}>
                            {task.TaskTitle}
                        </h5>
                    </button>
                    <p className={`"mb-3 break-words font-normal text-gray-700 dark:text-gray-400 "`}>

                        {task.TaskDescription.length > 100 ? task.TaskDescription.slice(0, 100) : task.TaskDescription}

                    </p>

                    <div className='w-full flex justify-between'>
                        <button onClick={()=>{Showmore(task)}} className="inline-flex items-center self-end py-2 px-3  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Show
                            <EyeIcon className='w-5 -mr-1 ml-1 ' />
                        </button>
                        <p className="mb-3 self-end text-xs font-light text-gray-700 dark:text-gray-400">
                            {task.Date.slice(0, 21)}
                        </p>
                    </div>


                </div>
                </div>
    )
}


{
    skillton == true && <div role="status" className='flex justify-center mt-11 items-center'>
        <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
}
        </>
    )
}

export default ListTasks