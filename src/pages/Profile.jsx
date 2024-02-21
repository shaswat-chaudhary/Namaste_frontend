import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FriendsCard, Loading, PostCard, ProfileCard } from '../components';
import { DownBar } from '../components/DownBar';
import { EditProfile } from '../components/EditProfile';
import { fetchPosts, getUserInfo } from '../utils';


export const Profile = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const data = user?._id === id ? user : null;

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const uri = '/posts/get-user-post/' + id;

  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);

  }

  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  }

  const handleDelete = () => { };
  const handleLikePost = () => { };

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
  }, [id])

  return (
    <>
      <div className='w-full lg:px-10 md:pb-20 2xl:px-20 h-screen overflow-auto bg-bgColor'>


        <div className='w-full md:flex gap-2 lg:gap-4 md:pl-4
         md:pt-4 pb-10 h-full'>

          {/* Left */}

          <div className='md:w-1/3 lg:w-1/4 w-full flex flex-col gap-6 overflow-hidden'>
            <ProfileCard user={userInfo} />

          </div>

          {/* Center */}

          <div className='hidden md:flex-1 h-full px-4 md:flex flex-col gap-6 overflow-y-auto'>

            {loading ? (<Loading />) : posts?.length > 0 ?
              (posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?.id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <p className='text-lg text-ascent-2'>No Post Available</p>
                </div>
              )}
          </div>

          {/* Right */}

          <div className='md:w-1/4 lg:flex flex-col gap-8 pt-1 pb-14 overflow-y-auto'>
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>

        <DownBar />
      </div>

      {edit && <EditProfile />}
    </>

  )
}
