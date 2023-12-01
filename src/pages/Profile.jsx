import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FriendsCard, Loading, PostCard, ProfileCard, TopBar } from '../components';



export const Profile = ({ friends }) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => { };
  const handleLikePost = () => { };

  return (
    <>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-20 h-screen'>

        <TopBar />

        <div className='w-full flex gap-2 lg:gap-4 md:pl-4 pt-4 pb-10 h-full'>

          {/* Left */}

          <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-hidden'>
            <ProfileCard user={userInfo} />

            <div className='block lg:hidden'>
              <FriendsCard friends={userInfo?.friends} />
            </div>

          </div>

          {/* Center */}

          <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto'>

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

          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>

      </div>
    </>

  )
}