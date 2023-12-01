import React, { useState } from 'react'
import { TextInput } from '../components/TextInput'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loading } from '../components'
import { CustomBtn } from '../components/CustomBtn'
import { apiRequest } from '../utils/index'
import namaste_logo from "../assets/namaste_logo.jpg"
import logo from '../assets/logo.png'


export const Register = () => {

  const [errMsg, setErrMsg] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues, formState: { errors }, } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {

      const res = await apiRequest({
        url: "auth/register",
        data: data,
        method: "POST",
      });


      if (res?.status === "Failed") {
        setErrMsg(res);
      }
      else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 3000);
      }
      setIsSubmit(false);
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  };




  return (
    <div className='bg-slate-800 w-full h-[100vh] flex items-center justify-center p-6'>

      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-  overflow-hidden shadow-xl'>

        {/* Right SIDE  */}

        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center border-r border-y rounded-r-xl'>

          <div className='w-full flex gap-2 items-center mb-4'>
            <img src={logo}
              className='w-14 h-14' />

            <span className='text-2xl text-[#3d85a8] font-semibold'>Namaste India</span>

          </div>
          <p className='text-lg font-semibold'>
            Create Your Account
          </p>


          <form onSubmit={handleSubmit(onSubmit)}
            className='py-8 flex flex-col gap-5 '>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>

              <TextInput
                name='firstName'
                placeholder='First Name'
                label="First Name"
                type='text'
                register={register('firstName', { require: "First Name is required" })}
                styles='w-full '
                labelStyles='ml-2'
                error={errors?.email ? errors.email.message : ""}
              />

              <TextInput
                name='lastName'
                placeholder='Last Name'
                label="Last Name"
                type='text'
                register={register('lastName', { require: "Last Name is required" })}
                styles='w-full '
                labelStyles='ml-2'
                error={errors?.email ? errors.email.message : ""}
              />

            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label="Email Address"
              type='email'
              register={register('email', { require: "Email is required" })}
              styles='w-full '
              labelStyles='ml-2'
              error={errors?.email ? errors.email.message : ""}
            />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>

              <TextInput
                name='password'
                placeholder='Password'
                label="Password"
                type='password'
                register={register('password', { require: "password is required" })}
                styles='w-full '
                labelStyles='ml-2'
                error={errors?.password ? errors.password.message : ""}
              />

              <TextInput
                name='confirm password'
                placeholder='Confirm Password'
                label="Confirm Password"
                type='password'
                register={register('cPassword', {
                  validate: (value) => {
                    if (value === getValues('password')) return true;
                    else return "Password does not match"
                  }
                })}
                styles='w-full '
                labelStyles='ml-2'
                error={errors?.cpassword ? errors.password.message : ""}
              />

            </div>

            {
              errMsg?.message && (
                <span className={`text-sm mt-0.5 ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>
                  {errMsg?.message}
                </span>
              )
            }

            {
              isSubmit ? <Loading /> : <CustomBtn type='Submit' containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none w-full`}
                title='Create Account'
              />
            }
          </form>

          <p className='text-center'>
            Already have an account ?
            <Link to='/login' className='text-blue font-semibold ml-2 cursor-pointer'>
              Login
            </Link>
          </p>

        </div>

        {/* Left SIDE */}

        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#4DD0E1] rounded-l-xl'>

          <div className='relative w-full flex items-center justify-center flex-col gap-5'>

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
