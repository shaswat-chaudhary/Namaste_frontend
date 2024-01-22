import React from 'react'
import { DownBar } from '../components'
import { useSelector } from 'react-redux'


export const Chat = () => {

  const { user } = useSelector((state) => state.user);  

  return (
    <div>
      <DownBar />
    </div>
  )
}




