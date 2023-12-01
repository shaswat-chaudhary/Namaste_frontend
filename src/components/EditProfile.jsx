import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { TextInput } from './TextInput';
import { Loading } from './Loading';
import { CustomBtn } from './CustomBtn';
import { LoginUser, UpdateProfile } from '../redux/userSlice';
import { apiRequest, handleFileUpload } from '../utils';
import toast from 'react-hot-toast';


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

    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>

          <div className='absolute inset-0 bg-black opacity-70'> </div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'> </span>
        &#8203;

        <div className='inline-block align-bottom bg-red-400 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-[#708090]  border' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>

          <div className='flex justify-between px-6 pt-5 pb-2'>
            <label
              htmlFor='name'
              className='block font-medium text-xl  text-left'>
              Edit Profile
            </label>

            <button className='text-3xl text-[#270000]' onClick={handleClose}>
              <MdClose />
            </button>
          </div>

          <form
            className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
            onSubmit={handleSubmit(onSubmit)}>

            <TextInput
              label='First Name'
              placeholder='First Name'
              type='text'
              styles='w-full'
              register={register('firstName', { required: 'first Name is required' })}
              error={errors.firstName ? errors.firstName?.message : ""}
            />
            <TextInput
              label='Last Name'
              placeholder='Last Name'
              type='text'
              styles='w-full'
              register={register('lastName', { required: 'last Name is required' })}
              error={errors.lastName ? errors.lastName?.message : ""}
            />
            <TextInput
              label='Location'
              placeholder='Location'
              type='text'
              styles='w-full'
              register={register('location', { required: 'Location do no match' })}
              error={errors.location ? errors.location?.message : ""}
            />
            <TextInput
              label='Profession'
              placeholder='Profession'
              type='text'
              styles='w-full'
              register={register('profession', { required: 'profession is required!' })}
              error={errors.profession ? errors.profession?.message : ""}
            />

            <label
              className='flex items-center gap-1 text-base text-[#fff] hover:text-[#000] cursor-pointer my-4'
              htmlFor='imgUpload'>

              <input
                type='file'
                className=''
                id='imgUpload'
                onChange={(e) => handleSelect(e)}
                accept='.jpg, .png, .jpeg'
              />
            </label>
            {
              errMsg?.message && (
                <span role='alert' className={`text-sm ${errMsg?.status === 'failed' ? "text-red-600" : "text-green-700"}`}>
                  {errMsg?.message}
                </span>
              )
            }

            <div className='py-5 sm:flex sm:flex-row-reverse border-t text-ascent-2'>
              {isSubmit ? (<Loading />) : (
                <CustomBtn
                  type='submit'
                  containerStyles={`inline-flex justify-center rounded-md bg-blue px-6 py-2 text-sm font-medium text-white outline-none`}
                  title='Submit' />
              )}
            </div>
          </form>

        </div>

      </div>
    </div>

  )
}
