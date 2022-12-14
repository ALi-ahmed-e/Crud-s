import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import {CogIcon, ArrowLeftOnRectangleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AddTaskAction } from '../../store/Slices/AddTaskSlice'

const Header = () => {
  useEffect(() => window.addEventListener('resize', (e) => setwindowsize(window.innerWidth)), []);
  const user = useSelector(state => state.Auth.User)
  const classNames = (...classes) => classes.filter(Boolean).join(' ')
  const [windowsize, setwindowsize] = useState(window.innerWidth);
  const navigate = useNavigate()
  const {Toggle} = AddTaskAction
  const dispatch = useDispatch()




  return (
    <div className='text-sm z-40 sm:text-[17px] w-full h-14 bg-[#ffffff80] dark:bg-slate-900 dark:text-white shadow-lg shadow-black/10 backdrop-blur-sm fixed flex justify-between items-center' style={{ 'direction': 'rtl' }}>



 
        <div className='flex items-center'>


          <Menu as="div" className="relative inline-block text-left w-fit h-fit">
            <div>
              <Menu.Button className='flex items-center focus:outline-none'>
                <div className=' flex items-center'>

                  <img className="p-0.5 w-11 h-11 rounded-full ring-2 ring-sky-500 dark:ring-sky-800 mx-4 cursor-pointer active:p-0 active:ring-0 active:border-[2px] dark:border-white border-black" src={user.photoURL} alt="" />

                  <span className=' dark:text-white font-semibold'>{user.displayName}</span>

                  <div className='h-12 mx-3 rounded-md  bg-slate-800/80 w-[1px]'></div>
                </div>


              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-3 z-10 mt-3 w-44 origin-top-right divide-y divide-gray-100 rounded-md dark:divide-black dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 border-[0.5px] dark:border-black focus:outline-none">
                
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => { navigate('/settings') }}
                        className={classNames(
                          active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                        )}
                      >
                        <CogIcon className=' w-5 inline' />      Settings
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item >
                    {({ active }) => (

                      <p
                        onClick={() => {

                          signOut(auth).then(() => {
                            localStorage.clear()
                            window.location.reload()
                          }).catch((error) => {
                            console.log(error)
                          });
                        }}
                        className={classNames(
                          active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                        )}
                      >
                        <ArrowLeftOnRectangleIcon className=' w-5 inline' />        Logout
                      </p>

                    )}
                  </Menu.Item>
                </div>


              </Menu.Items>
            </Transition>
          </Menu>




          <button onClick={()=>{dispatch(Toggle())}} className={`${windowsize > 640 ? 'px-3 py-2 ' : 'px-2 py-1 '} ' bn632-hover bn26  flex justify-center items-center'`}>{windowsize > 640 ? 'Add New Task +' : <PlusIcon className=' w-6' />}</button>

        </div>

        <div className='flex items-center mx-3'>
          {windowsize > 640 ? <span className=' mx-1 font-bold'>
            Task Manger
          </span> : ''}

          <CpuChipIcon onClick={() => navigate('/')} className='w-8 inline cursor-pointer' />
        </div>





    </div>
  )
}

export default Header