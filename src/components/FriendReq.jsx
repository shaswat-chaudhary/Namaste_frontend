import React from 'react'
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';


export const FriendReq = ({ friendRequest, acceptFriendReq }) => {

    return (
        <div>{
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
    )
}