import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { UpdateProfile } from '../redux/userSlice';
import { LiaEditSolid } from 'react-icons/lia'
import { BsBriefcase, BsPersonFillAdd } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { IoLogOut } from "react-icons/io5";
import { Logout } from '../redux/userSlice';

import moment from 'moment';
import { ThemeMode } from './ThemeMode';

export const ProfileCard = ({ user }) => {

    const { user: data, edit } = useSelector((state) => state.user);

    const dispatch = useDispatch();


    return (

        <div className='w-full border flex flex-col items-center rounded-lg px-6 py-4 shadow-sm bg-bg2 text-ascent-2'>

            <div className='w-full flex items-center justify-between border-b pb-3'>

                <Link to={"/profile/" + user?.user?._id} className='flex gap-2 w-[90%]'>

                    <img src={user?.profileUrl} alt={user?.email}

                        className='w-14 h-14 rounded-full object-cover'
                    />

                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-ascent-1'>
                            {user?.firstName} {user?.lastName}
                        </p>
                        <span className='text-ascent-2'>
                            {user?.profession ?? "No Profession"}
                        </span>
                    </div>

                </Link>

                <div>
                    {user?._id === data?._id ?
                        (
                            <button class="relative group">

                                <LiaEditSolid onClick={() => dispatch(UpdateProfile(true))}
                                    size={22}
                                    className='text-ascent-1 hover:text-blue transition duration-150 ease-in-out' />

                                <span class="hidden text-ascent-1 absolute bg-bgColor text-black px-3 py-1 rounded-md group-hover:block top-0 right-8 font-semibold transition duration-300 ease-in-out">Edit</span>
                            </button>



                        ) : (
                            <button className='bg-[#0444a430] text-sm text-white p-1 rounded relative group:'
                                onClick={() => { }}>
                                <BsPersonFillAdd size={20} className='text-[bule-500]' />


                            </button>
                        )}

                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b'>

                <div className='flex gap-2 items-center text-ascent-2' >
                    <CiLocationOn className="text-xl text-ascent-1" />
                    <span className=''>{user?.location ?? "Add Location"}</span>
                </div>

                <div className='flex gap-2 items-center text-ascent-2'>
                    <BsBriefcase className='text-lg text-ascent-1' />
                    <span className=''>{user?.profession ?? "Add Profession"}</span>

                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b'>

                <p className='flex items-center justify-between'>
                    <span className='text-ascent-2  text-xl'>Friends</span>
                    <span className='text-xl text-ascent-1'>{user?.friends?.length}</span>
                </p>

                <div className='flex items-center justify-between'>
                    <span className='text-ascent-2'>Who viewed your profile</span>
                    <span className='text-lg text-ascent-1'>{user?.views?.length}</span>
                </div>
                <span className='text-base text-blue cursor-pointer'>{user?.
                    verifed ? "Verified Account" : "Not Verified"}</span>

                <div className='flex justify-between items-center'>
                    <span className='text-ascent-2'>Joined</span>
                    <span className='text-ascent-1 text-base'>{moment(user?.createdAt).fromNow()}</span>
                </div>
            </div>

            <div className='flex md:hidden justify-between items-center w-full px-4 py-2 mt-5 bg-bgColor rounded-lg text-ascent-1'>
                <span className='font-semibold text-ascent-1'>Log Out</span>
                <IoLogOut onClick={() => dispatch(Logout())} size={25} />
            </div>
            
            <div className='flex md:hidden justify-between items-center w-full px-4 py-2 mt-5 bg-bgColor rounded-lg text-ascent-1'>
                <span className='font-semibold text-ascent-1'>Theme Mode</span>
                <ThemeMode />
            </div>

            

        </div>
    )
}



