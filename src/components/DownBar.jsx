import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GoHome,  GoHomeFill } from 'react-icons/go'
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { Avatar } from '@mui/material';
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";


export const DownBar = () => {

    const { user } = useSelector((state) => state.user);

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname)

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }


    return (
        <div className='flex w-full h-12 bg-bg3 border-b border-ascent-2 justify-between items-center fixed bottom-0 z-50 px-5 md:hidden text-ascent-1 '>

            <Link to='/'
                onClick={() => handleCurrentPage('/')}
                className='w-10 h-10 p-1.5'>
                {
                    currentPage === '/' ? <GoHomeFill size={28} /> : <GoHome size={28} />
                }
            </Link>

            <Link to='/friends'
                className='w-10 h-10 p-1 flex items-center'>
                {
                    currentPage === '/friends' ? <HiMiniUsers size={28} /> : <HiOutlineUsers size={28} />
                }

            </Link>

            <Link to='/search' className='w-10 h-10 p-1.5'>

            {
                    currentPage === '/search' ? <IoSearchSharp size={30}/> : <IoSearchOutline size={28}/>
                }
            </Link>

            <Link to='/chat'
                onClick={() => handleCurrentPage('/chat')}
                className=' p-1'>
                {
                    currentPage === '/chat' ?
                        <RiMessengerFill size={29} /> : <RiMessengerLine size={29} />
                }
            </Link>

            <Link to={"/profile/" + user?._id}
                onClick={() => handleCurrentPage("/profile/" + user?._id)} >
                {
                    currentPage === '/profile/' + user?._id ?
                        <Avatar
                            src={user?.profileUrl}
                            className='ring-1 ring-[#D332FC]'
                            sx={{ width: 29, height: 29 }}
                        /> : <Avatar
                            src={user?.profileUrl}
                            sx={{ width: 29, height: 29 }}
                        />
                }
            </Link>

        </div>
    )
}


