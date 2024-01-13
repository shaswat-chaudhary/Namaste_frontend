import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { UpdateProfile } from '../redux/userSlice';
import { BsBriefcase } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { IoLogOut } from "react-icons/io5";
import { Logout } from '../redux/userSlice';
import moment from 'moment';
import { ThemeMode } from './ThemeMode';
import { Avatar } from '@mui/material';

export const ProfileCard = ({ user }) => {

    const { user: data, edit } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleShareClick = async () => {
        (navigator.share) ? navigator.share({
            title: "Profile",
            text: "Check out this profile",
            url: "https://namaste-sooty.vercel.app/profile/" + user?._id
        }) : alert("Your browser does not support Web Share API")
    }


    return (

        <div className='w-full md:border flex flex-col items-center rounded-md md:rounded-lg px-3 md:px-6 py-4 shadow-sm bg-bg2 text-ascent-2'>

            <div className='w-full flex flex-col items-start gap-3 border-b pb-3 '>

                <div className='flex items-center w-full'>

                    <Link to={"/profile/" + user?.user?._id}
                        className='flex items-center gap-2 z-0'
                    >
                        <Avatar
                            src={user?.profileUrl}
                            alt={user?.email}
                            sx={{
                                width: {
                                    xs: 60,
                                    sm: 60,
                                    md: 70,
                                    lg: 70,
                                }, height: {
                                    xs: 60,
                                    sm: 60,
                                    md: 70,
                                    lg: 70,
                                }
                            }}
                        />
                        <div className='flex flex-col justify-center gap-1'>
                            <p className='text-lg font-medium text-ascent-1'>
                                {user?.firstName} {user?.lastName}
                            </p>
                            <span className='text-ascent-2'>
                                {user?.profession ?? "No Profession"}
                            </span>
                        </div>
                    </Link>
                </div>


                <div className='flex flex-row w-full justify-between gap-5'>

                    <div className='grow bg-bgColor text-center items-center rounded-md'>
                        {user?._id === data?._id ?
                            (
                                <button onClick={() => dispatch(UpdateProfile(true))} className='text-ascent-1 font-normal w-full h-full rounded-md py-1 hover:text-blue'>
                                    Edit Profile
                                </button>
                            ) : (
                                <></>
                            )}
                    </div>

                    <div className="grow text-center rounded-md bg-bgColor">
                        <button
                            onClick={() => handleShareClick(true)}
                            className='text-ascent-1 font-normal w-full rounded-md h-full py-1 hover:text-blue'>
                            Share Profile
                        </button>
                    </div>
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
                    <span className='text-ascent-1 text-base'>
                        {moment(user?.createdAt).fromNow()}
                    </span>
                </div>
            </div>

            <div className='flex md:hidden justify-between items-center w-full px-4 py-2 mt-5 bg-bgColor rounded-lg text-ascent-1'>
                <span className='font-semibold text-ascent-1'>Theme Change</span>
                <ThemeMode />
            </div>

            <div className='flex md:hidden justify-between items-center w-full px-4 py-2 mt-5 bg-bgColor rounded-lg text-ascent-1'>
                <span className='font-semibold text-ascent-1'>Log Out</span>
                <IoLogOut onClick={() => dispatch(Logout())} size={25} />
            </div>

        </div>
    )
}



