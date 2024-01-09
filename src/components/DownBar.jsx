import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GoHome, GoSearch, GoHomeFill } from 'react-icons/go'
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { Avatar } from '@mui/material';
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";


export const DownBar = () => {

    const { user } = useSelector((state) => state.user);

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname)

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }


    return (
        <div className='flex w-full h-12 bg-bg3 justify-between items-center sticky top-0 z-50 px-5 md:hidden text-ascent-1 '>

            <Link to='/' onClick={() => handleCurrentPage('/')} className='w-10 h-10 p-1.5'>
                {currentPage === '/' ? <GoHomeFill size={27} /> : <GoHome size={27} />}
            </Link>

            <Link to='/friends' className='w-10 h-10 p-1 flex items-center'>
                {currentPage === '/friends' ? <HiMiniUsers size={27} /> : <HiOutlineUsers size={27} />}

            </Link>


            <div className='w-10 h-10 p-2'>
                <GoSearch size={25} />
            </div>

            <Link to='/chat' onClick={() => handleCurrentPage('/chat')} className=' p-1'>
                {currentPage === '/chat' ? <RiMessengerFill size={28} /> : <RiMessengerLine size={28} />}
            </Link>


            <Link to="/profile/:id" onClick={() => handleCurrentPage('/profile/:id')} >
                {currentPage === '/profile/:id' ?
                    <Avatar
                        src={user?.profileUrl}
                        className='ring-1 ring-[#D332FC]'
                        sx={{ width: 28, height: 28 }}
                    /> : <Avatar
                        src={user?.profileUrl}
                        sx={{ width: 28, height: 28 }}
                    />

                }

            </Link>



        </div>
    )
}


