import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { TextInput } from './TextInput';
import { CustomBtn } from './CustomBtn';
import { useForm } from 'react-hook-form';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Logout } from '../redux/userSlice';
import { SiMessenger } from "react-icons/si";
import logo from "../assets/logo.png";
import { IoSearchSharp } from "react-icons/io5";
import { ThemeMode } from './ThemeMode';



export const TopBar = () => {

    const { theme } = useSelector((state) => state.theme);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSearch = async (data) => { };


    return (

        <div className='w-full h-12 md:h-24 flex items-center justify-between py-3 md:py-5 px-4 md:rounded-lg bg-primary border-b text-ascent-2 mb-1 sticky top-0 left-0 z-50' >

            <Link to='/' className='flex gap-2 items-center justify-center relative  '>
                <div>
                    <img src={logo} className='w-12 h-12' />
                </div>
                <span className='text-xl text-ascent-1 font-semibold'>Namaste</span>

            </Link>

            <form
                className='bg-blue rounded-full hidden h-10 pb-2 md:flex items-center justify-center relative'
                onSubmit={handleSubmit(handleSearch)}
            >
                <TextInput
                    placeholder='Search....'
                    styles=' w-[16rem] h-10 lg:w-[24rem] px-4 py-3 rounded-full border-white' register={register('search')}
                />

                <IoSearchSharp
                    className='text-2xl absolute right-3 top-2 cursor-pointer text-ascent-2'
                />

            </form>

            {/* ICONS */}

            <div className='hidden md:flex w-[22%] justify-between items-center text-ascent-1 text-md md:text-2xl mr-6'>

                <ThemeMode />

                <div className='hidden lg:flex'>
                    <IoMdNotificationsOutline size={25} />
                </div>

                <div className='hidden lg:flex'>
                    <SiMessenger size={25} />
                </div>

                <div onClick={() => dispatch(Logout())}>
                    <CustomBtn
                        title='Log Out'
                        containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border rounded-full transition duration-300  hover:shadow-lg hover:shadow-shadowcolor hover:bg-hovercolor'
                    />

                </div>
            </div>
        </div>
    )
}
