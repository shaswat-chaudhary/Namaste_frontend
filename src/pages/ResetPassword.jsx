import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TextInput } from '../components';
import { CustomBtn } from '../components/CustomBtn';
import { Loading } from '../components';

export const ResetPassword = () => {

  const [errMsg, setErrMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { register, handleSubmit, formState: { error }, } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => { };

  return (
    <div className='w-full h-[100vh] flex items-start justify-center p-6'>

      <div className='w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>

        <p className='text-ascent-1 text-lg font-semibold'>
          Email Address
        </p>
        <span className='text-sm text-ascent-2'>
          Enter email address used during registration
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className='py-4 flex flex-col gap-5'>

          <TextInput
            name='email'
            placeholder='email@example.com'
            label="Email Address"
            type='email'
            register={register('email', { require: "Email is required" })}
            styles='w-full rounded-full'
            labelStyles='ml-2'
            error={error?.email ? error.email.message : ""}
          />

          {
            errMsg?.message && (
              <span className={`text-sm mt-0.5 ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>
                {errMsg?.message}
              </span>
            )
          }

          {
            isSubmit ? <Loading /> : <CustomBtn type='Submit' containerStyles={`inline-flex justify-center rounded-md bg-blue-300 px-8 py-3 text-sm font-medium text-white outline-none w-full`}
              title='Login'
            />
          }


        </form>

      </div>
    </div>
  )
}
