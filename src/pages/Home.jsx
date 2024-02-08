import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomBtn, EditProfile, Loading, ProfileCard, TextInput, TopBar } from '../components';
import { FriendsCard } from '../components/FriendsCard';
import { BsFiletypeGif } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { BiImages, BiSolidVideo } from 'react-icons/bi'
import { PostCard } from '../components/PostCard';
import { LoginUser } from '../redux/userSlice';
import {
  apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost
} from '../utils/index';
import toast from 'react-hot-toast';
import { DownBar } from '../components/DownBar';
import { FriendList } from './FriendList';
import { Avatar } from '@mui/material';


export const Home = () => {

  const { user, edit } = useSelector((state) => state.user);

  const { posts } = useSelector((state) => state.posts)

  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState('');
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, formState: { error } } = useForm();


  const handlePostSubmit = async (data) => {

    setPosting(true);
    setErrMsg("");

    try {

      const uri = file && (await handleFileUpload(file));

      const newData = uri ? { ...data, image: uri } : data;

      const res = await apiRequest({
        url: "posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "Failed") {
        setErrMsg(res);
      }
      else {
        reset({
          description: "",

        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
      }
      setPosting(false);

    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  }

  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch);

    setLoading(false);
  }

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token })
    await fetchPost();
  }

  const handleDelete = async (id) => {

    await deletePost(id, user?.token)
    toast.success('Post Deleted')
    await fetchPost();
  };

  const getUser = async () => {

    const res = await getUserInfo(user?.token);
    const newData = { token: user?.token, ...res };
    dispatch(LoginUser(newData));

  };

  useEffect(() => {

    setLoading(true);
    getUser();
    fetchPost();

  }, [])

  return (
    <>

      <div className='w-full lg:px-10 md:pb-20 2xl:px-40 lg:rounded-lg h-screen overflow-auto bg-bgColor scroll-smooth'>

        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 pt-1 md:pt-5 h-full">

          {/* Left */}

          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">

            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />

          </div>

          {/* Center */}

          <div className='flex-1 h-full md:px-4 flex flex-col md:gap-4 overflow-y-auto md:rounded-lg'>

            <form onSubmit={handleSubmit(handlePostSubmit)} className='px-2 md:px-4 rounded-lg md:border text-ascent-2 bg-bg2 mb-1.5'>

              <div className='w-full flex gap-4 py-1 items-center text-center border-b justify-between'>

                <Avatar
                  src={user?.profileUrl}
                  alt={user?.firstName}
                  sx={{
                    width: {
                      xs: 45,
                      sm: 55,
                      md: 60,
                      lg: 60,
                    }, height: {
                      xs: 45,
                      sm: 55,
                      md: 60,
                      lg: 60,
                    }
                  }}
                />

                <TextInput
                  styles="w-full rounded-full bg-bg3 text-ascent-2 py-2.5 md:py-4 items-center px-4 mb-1.5"
                  placeholder="what's on your mind..."
                  name="description"
                  register={register('description', { required: "Write something about post" })}
                  error={error?.description ? error.description.message : ""}
                />



              </div>


              {/* file upload  */}
              <div className='flex items-center justify-between py-2 md:py-4'>

                {/* image upload */}
                <label htmlFor='imgUpload' className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size="5120"
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                {/* video upload */}
                <label htmlFor='videoUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    data-max-size="5120"
                    accept='.mp4, .mkv, '
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                {/* gif upload */}
                <label htmlFor='vgifUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    data-max-size="5120"
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {
                    posting ? (<Loading />) :

                      (<CustomBtn
                        type="submit"
                        title='Post'
                        containerStyles='bg-[#0444a4] text-white py-1 px-4 md:px-6 rounded-full font-semibold text-sm' />
                      )
                  }
                </div>


              </div>

            </form>

            {
              loading ? (<Loading />) : posts?.length > 0 ? (
                posts?.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    user={user}
                    deletePost={handleDelete}
                    likePost={handleLikePost}
                  />

                ))

              ) :
                (
                  <div className='flex w-full h-full items-center justify-center'>
                    <p className='text-lg text-ascent-2' >No Post Available</p>
                  </div>
                )
            }

          </div>


          {/* Right */}

          <div className='hidden w-1/4 full lg:flex overflow-y-auto rounded-lg '>
            <FriendList />
          </div>

        </div>

        <DownBar />


      </div>

      {edit && <EditProfile />}

    </>

  );
};




