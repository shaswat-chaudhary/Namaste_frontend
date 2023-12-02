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
        <div className='flex w-full h-12 bg-bgColor justify-between items-center sticky bottom-0 z-50 px-10 md:hidden text-ascent-1'>

            <Link to='/'>

                <TiHome size={35} />

            </Link>

            <div>
                <BiSearch size={35}/>
            </div>
            <div>
                <FaUserFriends size={35}/>
            </div>


            <div>
                <BiLogoMessenger size={35}/>

            </div>

            <Link to="/profile/:id">
                <div className='w-8 h-8'>
                    <img src={user?.profileUrl} className='w-8 h-8 object-cover rounded-full' />
                </div>
            </Link>



        </div>
    )
}
