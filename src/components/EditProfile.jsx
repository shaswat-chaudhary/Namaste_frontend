import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from './TextInput';
import { Loading } from './Loading';
import { LoginUser, UpdateProfile } from '../redux/userSlice';
import { apiRequest, handleFileUpload } from '../utils';
import toast from 'react-hot-toast';
import { Avatar } from '@mui/material';
import { GoCheck } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";


export const EditProfile = () => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [picture, setPicture] = useState(null);


  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { ...user }, });

  const onSubmit = async (data) => {
    setIsSubmit(true);
    setErrMsg("");

    try {

      const uri = picture && (await handleFileUpload(picture));

      const { firstName, lastName, location, profession } = data;

      const res = await apiRequest({
        url: '/users/update-user',
        data: {
          firstName,
          lastName,
          location,
          profession,
          profileUrl: uri ? uri : user?.profileUrl,
        },

        method: "PUT",
        token: user?.token,
      });


      if (res?.status === "failed") {
        setErrMsg(res);
      }
      else {
        setErrMsg(res);
        const newUser = { token: res?.token, ...res?.user };
        dispatch(LoginUser(newUser));

        setTimeout(() => {
          dispatch(UpdateProfile(false))
        }, 2000);
      }

      toast.success("Profile Updated");
      setIsSubmit(false);

    } catch (error) {
      console.log(error, "update failed");
      setIsSubmit(false);
    }

  };

  const handleClose = () => {
    dispatch(UpdateProfile(false))
  };

  const handleSelect = (e) => {
    setPicture(e.target.files[0])
  };



  return (

    <div className='fixed z-50 inset-0 overflow-y-auto w-full'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-14 text-center sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>

          <div className='absolute inset-0 bg-black opacity-70'> </div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'> </span>
        &#8203;

        <div className='inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full bg-bgColor  border border-ascent-2' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>

          <form
            className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6 items-center py-4'
            onSubmit={handleSubmit(onSubmit)}>

            <div className='flex justify-between items-center w-full'>

              <div className='flex gap-4 text-ascent-1'>
                <button className='text-3xl' onClick={handleClose}>
                  <RxCross2 />
                </button>
                <label
                  htmlFor='name'
                  className='block font-normal text-xl text-left '>
                  Edit Profile
                </label>
              </div>

              <div>
                {isSubmit ? (<Loading />) : (
                  <button type='submit' 
                  className='text-3xl text-blue font-medium'>
                    <GoCheck />
                  </button>
                )}
              </div>
            </div>

            <div className='relative cursor-pointer rounded-full w-24 h-24 items-center ring-1 ring-ascent-1 '>
              <label
                className='absolute top-24 left-3 text-sm text-ascent-1 pt-1 cursor-pointer text-center border-b'
                htmlFor='imgUpload'>
                Edit Picture
              </label>

              <input
                className='w-24 h-24 rounded-full absolute z-10 opacity-0 left-0 top-0 cursor-pointer'
                id="imgUpload"
                onChange={(e) => handleSelect(e)}
                accept='image/*'
                type="file"

              />

              {
                picture === null ? (
                  <Avatar
                    sx={{ width: 96, height: 96 }}
                    src={user?.profileUrl}
                  />
                ) : (
                  <Avatar
                    sx={{ width: 96, height: 96 }}
                    src={URL.createObjectURL(picture)}
                  />
                )
              }

            </div>

            <TextInput
              label='First Name'
              labelStyles='text-ascent-2 mt-3'
              placeholder='First Name'
              type='text'
              styles='w-full bg-bgColor px-0 text-ascent-1 font-medium border-blue bg-transparent border-0 border-b-2 rounded-none '
              register={register('firstName', { required: 'first Name is required' })}
              error={errors.firstName ? errors.firstName?.message : ""}
            />
            <TextInput
              label='Last Name'
              labelStyles='text-ascent-2'
              placeholder='Last Name'
              type='text'
              styles='w-full bg-bgColor text-ascent-1 font-medium px-0 border-blue bg-transparent border-0 border-b-2 rounded-none '
              register={register('lastName', { required: 'last Name is required' })}
              error={errors.lastName ? errors.lastName?.message : ""}
            />
            <TextInput
              label='Location'
              labelStyles='text-ascent-2'
              placeholder='Location'
              type='text'
              styles='w-full bg-bgColor text-ascent-1 font-medium px-0 border-blue bg-transparent border-0 border-b-2 rounded-none '
              register={register('location', { required: 'Location do no match' })}
              error={errors.location ? errors.location?.message : ""}
            />
            <TextInput
              label='Profession'
              labelStyles='text-ascent-2'
              placeholder='Profession'
              type='text'
              styles='w-full bg-bgColor text-ascent-1 font-medium px-0 mb-2 border-blue bg-transparent border-0 border-b-2 rounded-none '
              register={register('profession', { required: 'profession is required!' })}
              error={errors.profession ? errors.profession?.message : ""}
            />
            {
              errMsg?.message && (
                <span role='alert' className={`text-sm ${errMsg?.status === 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>
                  {errMsg?.message}
                </span>
              )
            }

          </form>

        </div>

      </div>
    </div>

  )
}
