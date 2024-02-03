import React, { useEffect, useState } from 'react';
import { DownBar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../utils/index';
import { sendFriendReq } from '../utils/index';
import toast from 'react-hot-toast';
import { Loading } from '../components/Loading';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';


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

      setFriendRequest(res?.data)
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
      toast.success('Friend Request Sent');
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

      <div className='flex flex-col md:gap-5 mt-2 gap-2 md:mt-0'>
        <div className='w-full md:border shadow-sm rounded-md md:rounded-lg px-3 py-1 bg-bg2 text-ascent-2'>
          <div className='flex items-center justify-between text-xl pb-1 border-b'>
            <span className='text-ascent-1'>Friend Request</span>
            <span className='text-ascent-1'>{friendRequest?.length}</span>
          </div>

          <div className='w-full flex flex-col gap-4 pt-2'>
            {
              friendRequest?.map(({ _id, requestFrom: from }) => (
                <div key={_id} className='flex items-center justify-between py-1 mb-1'>

                  <Link to={'/profile/' + from._id}
                    className='w-full flex gap-4 items-center cursor-pointer'>

                    <Avatar
                      src={from?.profileUrl}
                      alt='profile'
                      sx={{ width: 50, height: 50 }}
                    />
                    <div className='flex-1'>
                      <p className='text-ascent-1 font-medium'>
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className='text-sm text-ascent-1'>
                        {from?.profession ?? "No Profession"}
                      </span>
                    </div>

                  </Link>

                  <div className='flex gap-2 w-1/2 text-ascent-1 items-center text-center'>

                    <button
                      onClick={() => acceptFriendReq(_id, 'accepted')}
                      className='grow bg-blue font-medium py-1 rounded-md'>
                      Confirm
                    </button>

                    <RxCross1
                      onClick={() => acceptFriendReq(_id, 'cancle')}
                      className='font-medium cursor-pointer'
                      size={18}
                    />

                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className='w-full md:border shadow-sm rounded-md md:rounded-lg px-3 py-1 bg-bg2 text-ascent-2 '>
          <div className='flex items-center justify-between text-xl border-b pb-1'>
            <span className='text-ascent-1'>Friend Suggestion</span>
          </div>
          <div className='w-full flex flex-col pt-3'>
            {
              loading ? (<Loading />) : suggestFriends?.length > 0 ? (<div>
                {
                  suggestFriends.map((friend) => (
                    <div key={friend?._id} className='flex justify-between items-center mb-2 py-1'>

                      <Link to={'/profile/' + friend?._id}
                        className='w-full flex gap-4 items-center cursor-pointer'>
                        <Avatar
                          src={friend?.profileUrl}
                          alt={friend?.firstName}
                          sx={{ width: 50, height: 50 }} />

                        <div className='flex-1'>
                          <p className='text-ascent-1 font-medium'>
                            {friend?.firstName} {friend?.lastName}
                          </p>
                          <span className='text-sm text-ascent-1'>
                            {friend?.profession ?? ""}
                          </span>
                        </div>
                      </Link>

                      <div className='grow w-1/2 text-center rounded-md bg-bgColor'>
                        <button
                          onClick={() => handlefriendReq(friend?._id)}
                          className='text-ascent-1 font-normal w-full bg-red rounded-md h-full py-1' >
                          {
                            friendRequest?.find((item) => item.requestFrom._id === friend?._id) ? "" : "Add Friend"
                          }
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
              ) : (
                <p> No Friend Suggestion </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}



