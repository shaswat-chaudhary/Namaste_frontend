import React from 'react';
import { CgMenu } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { SiMessenger } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { BiLogoMessenger } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const DownBar = () => {

    const { user } = useSelector((state) => state.user);


    return (
        <div className='flex w-full h-12 bg-bg3 justify-between items-center sticky bottom-0 px-5 md:hidden text-ascent-1 rounded-t-lg'>

            <Link to='/' className='w-10 h-10 p-2' >
                <TiHome className='w-6 h-6' />
            </Link>

            <div className='w-10 h-10 p-2'>
                <FaUserFriends className='w-6 h-6' />
            </div>


            <div className='w-10 h-10 p-2'>
                <BiSearch className='w-6 h-6' />
            </div>


            <div className='w-10 h-10 p-2'>
                <BiLogoMessenger className='w-7 h-7' />

            </div>

            <Link to="/profile/:id">
                <div className='w-10 h-10 p-2'>
                    <img src={user?.profileUrl} className='w-6 h-6 object-cover rounded-full' />
                </div>
            </Link>



        </div>
    )
}
