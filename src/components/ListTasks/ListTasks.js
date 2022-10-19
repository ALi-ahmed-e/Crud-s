import React, { useLayoutEffect, useState, Fragment } from 'react'
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, query, where, getDocs } from "firebase/firestore";
import useRefreshUser from '../RefreshUser/RefreshUser';





const ListTasks = () => {
    const user = useSelector(state => state.Auth.User)
    const [Tasks, setTasks] = useState([]);
    const [refreshUser] = useRefreshUser()

    const getTasks = async () => {

        let list = []

        const q = query(collection(db, "Tasks"), where("TaskId", "in", user.tasks));

        const querySnapshot = await getDocs(q);
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
                TaskStatus:'Done'
            })
          

        } else {
            await updateDoc(washingtonRef, {
                TaskStatus:'Todo'
            })
            
        }
        refreshUser()
        getTasks()

    }

    return (
        <>

            {Tasks.map(task =>

                <div key={Math.random()} className=' inline-flex w-fit  ameda'>
                    

                    <div className="  p-6 w-full   flex flex-col justify-around m-2  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                        <div className=' flex justify-between'>
                            <div className=' -my-3 items-center cursor-pointer flex dark:text-white' onClick={() => { togglestatus(task) }}><div className={`' w-3 h-3 rounded-full mx-1 ' ${task.TaskStatus == 'Todo' ? 'bg-red-600' : 'bg-green-500'}`}></div>{task.TaskStatus}</div>
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
                            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {task.TaskTitle}
                            </h5>
                        </button>
                        <p className="mb-3 break-words font-normal text-gray-700 dark:text-gray-400">

                            {task.TaskDescription.length > 100 ? task.TaskDescription.slice(0, 100) : task.TaskDescription}

                        </p>

                        <div className='w-full flex justify-between'>
                            <button className="inline-flex items-center self-end py-2 px-3  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Show
                                <EyeIcon className='w-5 -mr-1 ml-1 ' />
                            </button>
                            <p className="mb-3 self-end text-xs font-light text-gray-700 dark:text-gray-400">
                                {task.Date.slice(0, 21)}
                            </p>
                        </div>


                    </div>
                </div>
            )}


        </>
    )
}

export default ListTasks