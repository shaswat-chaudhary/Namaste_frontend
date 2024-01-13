import React, { useEffect, useState } from 'react'
import { DownBar } from '../components'
import { FriendReq } from '../components/FriendReq'
import { SuggestFriend } from '../components/SuggestFriend'
import { useSelector } from 'react-redux'
import { apiRequest } from '../utils/index'
import { sendFriendReq } from '../utils/index'
import toast from 'react-hot-toast'
import { Loading } from '../components/Loading'


export const FriendList = () => {

  const { user } = useSelector((state) => state.user)

  const [friendRequest, setFriendRequest] = useState([]);

  const [suggestFriends, setSuggestFriends] = useState([]);

  const [loading, setLoading] = useState(false);


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
      setLoading(false);
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

  useEffect(() => {
    setLoading(true);
    fetchFriendReq();
    fetchSuggestFriend();
  }, [])

  return (
    <div className='w-full overflow-hidden h-screen bg-bgColor'>

      <DownBar />

      <div className='flex flex-col md:gap-5 mt-3 gap-3 md:mt-0'>
        <div className='w-full border shadow-sm rounded-md md:rounded-lg px-4 py-3 bg-bg2 text-ascent-2'>
          <div className='flex items-center justify-between text-xl pb-2 border-b'>
            <span className='text-ascent-1'>Friend Request</span>
            <span className='text-ascent-1'>{friendRequest?.length}</span>
          </div>

          <div className='w-full flex flex-col gap-4 pt-4'>
            {
              <FriendReq
                friendRequest={friendRequest}
                acceptFriendReq={acceptFriendReq}
              />
            }
          </div>
        </div>

        <div className='w-full border shadow-sm rounded-md md:rounded-lg px-4 py-3 bg-bg2 text-ascent-2 '>
          <div className='flex items-center justify-between text-xl border-b pb-2'>
            <span className='text-ascent-1'>Friend Suggestion</span>
          </div>
          <div className='w-full flex flex-col pt-4 '>
            {
              loading ? (<Loading />) : suggestFriends?.length > 0 ? (
                <SuggestFriend
                  suggestFriends={suggestFriends}
                  handlefriendReq={handlefriendReq}
                  friendRequest={friendRequest}
                />
              ) : (
                <>
                  <p>
                    No Friend Suggestion
                  </p>
                </>
              )

            }
          </div>

        </div>
      </div>

    </div>
  )
}



