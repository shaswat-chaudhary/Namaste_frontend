import React from 'react'
import { useDispatch } from 'react-redux';
import { SetTheme } from '../redux/theme';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export const ThemeMode = () => {

    const { theme } = useSelector((state) => state.theme);

    const dispatch = useDispatch();


    const handleTheme = () => {
        if (theme === "dark") {

            dispatch(SetTheme("light"));
            toast.success("Light Mode Activated");
        } else {
            dispatch(SetTheme("dark"));
            toast.success("Dark Mode Activated");
        }
    }
    return (
        <>
            <button onClick={() => handleTheme()}>
                {theme === 'dark' ? (
                    <BsFillSunFill size={25} />
                ) : (
                    <BsFillMoonStarsFill size={25} />
                )}
            </button>
        </>
    )
}

