import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ListTasks from '../ListTasks/ListTasks'

const Home = () => {
  const user = useSelector(state => state.Auth.User)

  return (
    <div>



      <ListTasks />

    </div>

  )
}

export default Home