import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FriendsCard, Loading, PostCard, ProfileCard, TopBar } from '../components';
import { DownBar } from '../components/DownBar';
import { EditProfile } from '../components/EditProfile';



export const Profile = ({ friends }) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, edit} = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => { };
  const handleLikePost = () => { };

  return (
    <>
      <div className='w-full lg:px-10 md:pb-20 2xl:px-20 h-screen overflow-auto bg-bgColor'>

        <TopBar />
        <DownBar />

        <div className='w-full md:flex gap-2 lg:gap-4 md:pl-4 pt-4 pb-10 h-full'>

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
                  <p className='text-lg text-ascent-2'>No Post</p>
                </div>
              )}
          </div>

          {/* Right */}

          <div className='md:w-1/4 lg:flex flex-col gap-8 pt-3 md:pt-0 overflow-y-auto'>
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
  
      </div>

      {edit && <EditProfile />}
    </>

  )
}
