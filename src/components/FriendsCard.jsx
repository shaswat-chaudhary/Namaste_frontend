import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const FriendsCard = ({ friends }) => {

    return (
        <div className='w-full shadow-sm rounded-lg md:px-6 px-3 py-5 md:border text-ascent-2 bg-bg2'>

            <div className='flex items-center justify-between text-xl pb-2 border-b'>
                <span className='text-ascent-1'>Friends</span>
                <span className='text-ascent-1'>{friends?.length}</span>

            </div>

            <div className='w-full flex flex-col gap-4 pt-4'>
                {friends?.map((friend) => (
                    <Link to={'/profile' + friend?._id}
                        key={friend?._id}
                        className="w-full flex gap-4 items-center cursor-pointer">

                        <Avatar
                            src={friend?.profileUrl}
                            alt={friend?.firstName}
                            sx={{ width: 50, height: 50 }}
                        />

                        <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>
                                {friend?.firstName} {friend?.lastName}
                            </p>
                            <span className='text-sm text-ascent-1'>
                                {friend?.profession ?? "No Profession"}
                            </span>

                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

