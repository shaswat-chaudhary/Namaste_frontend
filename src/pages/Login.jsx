import React, { useState } from 'react'
import { TextInput } from '../components/TextInput'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loading } from '../components'
import { CustomBtn } from '../components/CustomBtn'
import { apiRequest } from '../utils'
import { LoginUser } from '../redux/userSlice'
import namaste_logo from "../assets/namaste_logo.jpg"
import logo from '../assets/logo.png'

export const Login = () => {

  const [errMsg, setErrMsg] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();


  const { register, handleSubmit, formState: { errors }, } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {

      const res = await apiRequest({
        url: "auth/login",
        data: data,
        method: "POST",
      });

      if (res?.status === "Failed") {
        setErrMsg(res);
      }
      else {
        setErrMsg("");

        const newData = { token: res?.token, user: res?.user };
        dispatch(LoginUser(newData));
        window.location.replace("/");
      }
      setIsSubmit(false);
      
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  }



  return (
    <div className='w-full h-[100vh] flex items-center justify-center p-6'>

      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 md:py-8 lg:py-0 flex border rounded-xl overflow-hidden shadow-xl '>

        {/* LEFT SIDE  */}

        <div className='w-full lg:w-1/2 h-full p-4 md:p-10 2xl:px-20 flex flex-col justify-center'>

          <div className='w-full flex gap-2 items-center mb-4'>
            <img
              src={logo}
              className='w-14 h-14'
            />
            <span className='text-2xl font-semibold text-[#3d85a8]'>Namaste India</span>

          </div>
          <p className='text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2'>
            Welcome back
          </span>


          <form onSubmit={handleSubmit(onSubmit)}
            className='py-4 md:py-8 flex flex-col gap-5'>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label="Email Address"
              type='email'
              register={register('email', { require: "Email is required" })}
              styles='w-full md:rounded-full'
              labelStyles='ml-2'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              placeholder='Password'
              label="Password"
              type='password'
              register={register('password', { require: "password is required" })}
              styles='w-full md:rounded-full'
              labelStyles='ml-2 text-[#000]'
              error={errors?.password ? errors.password.message : ""}
            />

            <Link to='/reset password' className='text-sm text-blue text-right font-semibold'>
              Forgot Password ?
            </Link>

            {
              errMsg?.message && (
                <span className={`text-sm mt-0.5 ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>
                  {errMsg?.message}
                </span>
              )
            }

            {
              isSubmit ? <Loading /> : <CustomBtn type='Submit' containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-lg font-medium text-white outline-none w-full`}
                title='Login'
              />
            }
          </form>

          <p className='text-sm text-center'>
            Don't have an account ?
            <Link to='/register' className='text-black font-semibold ml-2 cursor-pointer text-blue'>
              Create Account
            </Link>
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center rounded-r-xl bg-[#4DD0E1]'>

          <div className='relative w-full flex items-center justify-center flex-col gap-5 '>

            <img
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover '
              src={namaste_logo}
            />

            <p className='text-2xl font-bold'>
              Namaste India
            </p>
          </div>

        </div>



      </div>

    </div>
  )
}
