import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomBtn, EditProfile, Loading, ProfileCard, TextInput, TopBar } from '../components';
import { FriendsCard } from '../components/FriendsCard';
import { Link } from 'react-router-dom';
import { BsFiletypeGif, BsPersonFillAdd } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { BiImages, BiSolidVideo } from 'react-icons/bi'
import { PostCard } from '../components/PostCard';
import { LoginUser } from '../redux/userSlice';
import {
  apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost, sendFriendReq
} from '../utils/index';
import { MdDownloadDone } from "react-icons/md";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { IoPersonAdd } from "react-icons/io5";
import toast from 'react-hot-toast';
import { DownBar } from '../components/DownBar';


export const Home = () => {

  const { user, edit } = useSelector((state) => state.user);

  const { posts } = useSelector((state) => state.posts)

  const [friendRequest, setFriendRequest] = useState([]);

  const [suggestFriends, setSuggestFriends] = useState([]);

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

  const fetchFriendReq = async () => {

    try {

      const res = await apiRequest({

        url: 'users/get-friend-request',
        token: user?.token,
        method: 'POST'

      });

      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);

    }
  };

  const fetchSuggestFriend = async () => {

    try {
      const res = await apiRequest({
        url: "users/suggest-friend",
        token: user?.token,
        method: "POST",
      });

      setSuggestFriends(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handlefriendReq = async (id) => {

    try {

      const res = await sendFriendReq(user.token, id);
      toast.success('Friend Request Sent')
      await fetchSuggestFriend();

    }
    catch (error) {
      console.log(error);
    }
  };

  const acceptFriendReq = async (id, status) => {

    try {

      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status }
      });

      setFriendRequest(res?.data)
      toast.success('Friend Request Accepted')
    }
    catch (error) {
      console.log(error);
    }
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
    fetchSuggestFriend();
    fetchFriendReq();

  }, [])

  return (
    <>

      <div className='w-full lg:px-10 md:pb-20 2xl:px-40 lg:rounded-lg h-screen overflow-auto bg-bgColor'>

        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 pt-2 md:pt-5 h-full">

          {/* Left */}

          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">

            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />

          </div>

          {/* Center */}

          <div className='flex-1 h-full px-[2px] md:px-4 flex flex-col gap-2  md:gap-8 overflow-y-auto md:rounded-lg'>

            <form onSubmit={handleSubmit(handlePostSubmit)} className='px-2 md:px-4 rounded-lg border text-ascent-2 bg-bg2'>

              <div className='w-full flex items-end pt-1 md:pt-3 pb-4 border-b justify-between'>

                <div>
                  <img src={user?.profileUrl}
                    alt='User Image'
                    className='w-11 h-11 md:w-14 md:h-14 rounded-full object-cover'
                  />
                </div>

                <div className='w-[85%]'>
                  <TextInput
                    styles="w-full rounded-full py-[10px] md:py-[13px] flex"
                    placeholder="what's on your mind..."
                    name="description"
                    register={register('description', { required: "Write something about post" })}
                    error={error?.description ? error.description.message : ""}
                  />
                </div>


              </div>


              {/* file upload  */}
              <div className='flex items-center justify-between py-1 md:py-4'>

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
                <label htmlFor='videoUpload' className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
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
                <label htmlFor='vgifUpload' className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
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
                    <p className='text-lg text-ascent-2'>No Post Available</p>
                  </div>
                )
            }

          </div>


          {/* Right */}

          <div className='hidden w-1/4 full lg:flex flex-col  gap-8 overflow-y-auto rounded-lg '>

            <div className='w-full border shadow-sm rounded-lg px-4 py-3 bg-bg2 text-ascent-2'>
              <div className='flex items-center justify-between text-xl pb-2 border-b'>
                <span className='text-ascent-1'>Friend Request</span>
                <span className='text-ascent-1'>{friendRequest?.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {
                  friendRequest?.map(({ _id, requestFrom: from }) => (
                    <div key={_id} className='flex items-center justify-between'>

                      <Link to={'/profile' + from._id} className='w-full flex gap-4 items-center cursor-pointer'>

                        <img src={from?.profileUrl} className='w-11 h-11 object-cover rounded-full' />
                        <div className='flex-1'>
                          <p className='text-ascent-1 font-medium'>{from?.firstName} {from?.lastName}</p>
                          <span className='text-sm text-ascent-1'>{from?.profession ?? "No Profession"}</span>
                        </div>

                      </Link>

                      <div className='flex gap-1'>
                        <FaCheck
                          onClick={() => acceptFriendReq(_id, 'accepted')}
                          className='text-red border rounded-full w-8 h-8 p-[2px] cursor-pointer' />

                        <FaTimes
                          onClick={() => acceptFriendReq(_id, "cancel")}
                          className='text-ascent-1 text-red-500  border rounded-full w-8 h-8 p-[2px] cursor-pointer' />

                      </div>


                    </div>
                  ))
                }
              </div>
            </div>

            <div className='w-full border shadow-sm rounded-lg px-4 py-3 bg-bg2 text-ascent-2 '>
              <div className='flex items-center justify-between text-xl border-b pb-2'>
                <span className='text-ascent-1'>Friend Suggestion</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4 '>
                {
                  suggestFriends?.map((friend) => (
                    <div key={friend?._id} className='flex justify-between items-center'>

                      <Link to={'/profile' + friend?._id} className='w-full flex gap-4 items-center cursor-pointer'>
                        <img src={friend?.profileUrl} className='w-10 h-10 object-cover rounded-full' />

                        <div className='flex-1'>
                          <p className='text-ascent-1 font-medium'>{friend?.firstName} {friend?.lastName}</p>
                          <span className='text-sm text-ascent-1'>{friend?.profession ?? "No Profession"}</span>
                        </div>

                      </Link>


                      <div className='flex gap-1'>
                        <button onClick={() => handlefriendReq(friend?._id)} className='text-blue p-1 rounded' >

                          {friendRequest?.find((item) => item.requestFrom._id === friend?._id) ? (
                            <MdDownloadDone size={25} />
                          ) : (
                            <IoPersonAdd size={25} />
                          )}

                        </button>


                      </div>
                    </div>
                  ))
                }
              </div>

            </div>
          </div>

        </div>

        <DownBar />

      </div>

      {edit && <EditProfile />}

    </>

  );
};




