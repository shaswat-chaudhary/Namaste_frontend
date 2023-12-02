import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { TextInput } from './TextInput';
import { CustomBtn } from './CustomBtn';
import { useForm } from 'react-hook-form';
import { BsMoon, BsFillSunFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Logout } from '../redux/userSlice';
import { SetTheme } from '../redux/theme';
import { SiMessenger } from "react-icons/si";
import { BsFillMoonStarsFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import { toast } from 'react-hot-toast';
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

    // const handleTheme = () => {

    //     if (theme === "dark") {

    //         dispatch(SetTheme("light"));
    //         toast.success("Light Mode Activated");
    //     } else {
    //         dispatch(SetTheme("dark"));
    //         toast.success("Dark Mode Activated");
    //     }

    // };

    const handleSearch = async (data) => { };


    return (

        <div className='topbar w-full h-16 md:h-24 flex items-center justify-between py-3 md:py-5 px-4 rounded-lg bg-primary'>

            <Link to='/' className='flex gap-2 items-center justify-center relative '>
                <div>
                    <img src={logo} className='w-12 h-12' />
                </div>
                <span className='text-xl text-ascent-1 font-semibold'>Namaste India</span>

            </Link>

            <form className='bg-blue rounded-full hidden h-10 pb-2 md:flex items-center justify-center relative' onSubmit={handleSubmit(handleSearch)}>

                <TextInput placeholder='Search....' styles=' w-[16rem] h-10 lg:w-[24rem] rounded-full border-white' register={register('search')}
                />

                <IoSearchSharp className='text-2xl absolute right-3 top-2 cursor-pointer text-ascent-2' />


            </form>

            {/* ICONS */}

            <div className='hidden md:flex w-[22%] justify-between items-center text-ascent-1 text-md md:text-2xl mr-6'>

                {/* <button onClick={() => handleTheme()}>
                    {theme === 'dark' ? (
                        <BsFillSunFill size={25} />
                    ) : (
                        <BsFillMoonStarsFill size={25} />
                    )}
                </button> */}

                <ThemeMode />

                <div className='hidden lg:flex'>
                    <IoMdNotificationsOutline size={25} />
                </div>

                <div className='hidden lg:flex'>
                    <SiMessenger size={25} />
                </div>


                <div onClick={() => dispatch(Logout())}>
                    <CustomBtn title='Log Out' containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border rounded-full transition duration-300  hover:shadow-lg hover:shadow-shadowcolor hover:bg-hovercolor' />
                  
                </div>

            </div>

        </div>
    )
}
