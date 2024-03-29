import React, { useState } from 'react'
import { TextInput } from '../components/TextInput'
import { set, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loading } from '../components'
import { CustomBtn } from '../components/CustomBtn'
import { apiRequest } from '../utils/index'
import namaste_logo from "../assets/namaste_logo.jpg"
import logo from '../assets/logo.png'
import { GoArrowLeft } from 'react-icons/go'


export const Register = () => {

  const [errMsg, setErrMsg] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();


  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }, } = useForm({
      mode: "onChange"
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSubmit((prev) => ({ ...prev, [name]: value }));
  }

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const prevStep = () => {
    setStep((prev) => prev - 1);
  }

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {

      const res = await apiRequest({
        url: "auth/register",
        data: data,
        method: "POST",
      });

      console.log(res);

      if (res?.status === "failed") {
        setErrMsg(res);
      }
      else {
        setTimeout(() => {
          setErrMsg("");
          window.location.replace("/login");
        }, 2000);
      }
      setIsSubmit(false);
    }
    catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  };



  return (
    <div className='bg-slate-800 w-full h-[100vh] flex items-center justify-center p-2 md:p-6'>

      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 lg:py-0 flex flex-row-reverse overflow-hidden shadow-xl border rounded-xl'>

        {/* Right SIDE  */}

        <div className='w-full lg:w-1/2 h-full px-3 pb-2 md:p-10 2xl:px-20 flex flex-col justify-center'>

          <div className='w-full flex md:gap-1 items-center place-content-center md:place-content-start md:mb-4'>

          <GoArrowLeft 
            onClick={prevStep}
            className={`w-7 h-7 cursor-pointer absolute top-4 left-4 ${step === 1 ? 'hidden' : 'block'}`}
            />
            <img src={logo}
              className='w-14 h-14' />

            <span className='text-2xl md:text-2xl text-[#3d85a8] font-semibold'>Namaste</span>

          </div>
          <p className='text-base font-semibold'>
            Create Your Account
          </p>


          <form onSubmit={handleSubmit(onSubmit)}
            className=' py-2 md:py-8 flex flex-col gap-3 md:gap-5 '>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>

              {
                step === 1 && (
                  <div>
                    <TextInput
                      name='firstName'
                      placeholder='First Name'
                      label="First Name"
                      type='text'
                      register={register('firstName', { require: "First Name is required" })}
                      styles='w-full px-4'
                      labelStyles='ml-2'
                      onChange={handleChange}
                      error={errors?.email ? errors.email.message : ""}
                    />

                    <TextInput
                      name='lastName'
                      placeholder='Last Name'
                      label="Last Name"
                      type='text'
                      register={register('lastName', { require: "Last Name is required" })}
                      styles='w-full px-4'
                      labelStyles='ml-2'
                      onChange={handleChange}
                      error={errors?.email ? errors.email.message : ""}
                    />

                    <CustomBtn
                      onClick={nextStep}
                      type='Submit'
                      containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-2 mt-4 text-lg font-medium text-white outline-none w-full`}
                      title='Next'
                    />
                  </div>
                )
              }

              {
                step === 2 && (
                  <div>
                    <TextInput
                      name='email'
                      placeholder='Email@gmail.com'
                      label="Email Address"
                      type='email'
                      register={register('email', { require: "Email is required" })}
                      styles='w-full px-4'
                      labelStyles='ml-2'
                      error={errors?.email ? errors.email.message : ""}
                    />

                      <CustomBtn
                        onClick={nextStep}
                        type='Submit'
                        containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-2 text-lg mt-4 font-medium text-white outline-none w-full`}
                        title='Next'
                      />
                  

                  </div>
                )
              }

              {
                step === 3 && (
                  <div>
                    <TextInput
                      name='password'
                      placeholder='Password'
                      label="Password"
                      type='password'
                      register={register('password', { require: "password is required" })}
                      styles='w-full px-4'
                      labelStyles='ml-2'
                      error={errors?.password ? errors.password?.message : ""}
                    />

                    <TextInput
                      name='confirm password'
                      placeholder='Confirm Password'
                      label="Confirm Password"
                      type='password'
                      register={register('cPassword', {
                        validate: (value) => {
                          const { password } = getValues();

                          if (password != value) {
                            return "Passwords do not match"
                          }
                        }
                      })}
                      styles='w-full px-4'
                      labelStyles='ml-2'
                      error={
                        errors.cPassword && errors.cPassword.type === 'validate' ? errors.cPassword?.message : ""
                      }
                    />
                    {
                      errMsg.message && (
                        <span
                          className={`text-sm ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                          {errMsg.message}
                        </span>
                      )
                    }

                    {
                      isSubmit ? (
                        <Loading />
                      ) : (
                        <CustomBtn
                          type='Submit'
                          containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 mt-4 text-sm font-medium text-white outline-none w-full`}
                          title='Create Account'
                        />
                      )
                    }
                  </div>
                )
              }


            </div>



            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>


            </div>


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
