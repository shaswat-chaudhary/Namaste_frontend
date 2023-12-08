import React, { useState } from 'react';
import { CgMenu } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { SiMessenger } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { BiLogoMessenger } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GoHome, GoSearch, GoHomeFill } from 'react-icons/go'
import { FaFacebookMessenger } from 'react-icons/fa6';
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";

export const DownBar = () => {

    const { user } = useSelector((state) => state.user);

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname)

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }


    return (
        <div className='flex w-full h-12 bg-bg3 justify-between items-center sticky top-0 z-50 px-5 md:hidden text-ascent-1 rounded-t-lg'>

            <Link to='/' onClick={() => handleCurrentPage('/')} className='w-10 h-10 p-2'>
                {currentPage === '/' ? <GoHomeFill size={25} /> : <GoHome size={25} />}
            </Link>

            <Link to='/friends' className='w-10 h-10 p-2'>
                <FaUserFriends size={25} />
            </Link>


            <div className='w-10 h-10 p-2'>
                <GoSearch size={25} />
            </div>

            <Link to='/chat' onClick={() => handleCurrentPage('/chat')} className='w-10 h-10 p-2' >
                {currentPage === '/chat' ? <RiMessengerFill size={25} /> : <RiMessengerLine size={25} />}
            </Link>


            <Link to="/profile/:id" onClick={() => handleCurrentPage('/profile/:id')}>
                {currentPage === '/profile/:id' ? <div 
                className='w-10 h-10 p-2'>
                    <img src={user?.profileUrl} className='w-7 h-6 ring-1 ring-[#D332FC] object-cover rounded-full' />
                </div> : <div
                    className='w-10 h-10 p-2'>
                    <img src={user?.profileUrl} className='w-7 h-6 object-cover rounded-full' />
                </div>
                }

            </Link>



        </div>
    )
}


