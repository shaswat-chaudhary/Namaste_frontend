import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DownBar } from '../components';
import { searchUser } from '../utils';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { RxCross1} from 'react-icons/rx';

export const Search = () => {

    const { user } = useSelector((state) => state.user);

    const [AllUser, setAllUser] = useState([])

    const AllUsers = async () => {
        const res = await searchUser(user?.token);
        setAllUser(res?.users)
    }

    useEffect(() => {
        AllUsers();
    }, [])

    const [search, setSearch] = useState('');

    const [filterUser, setFilterUser] = useState();

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);

        const filter = AllUser.filter((item) => item.firstName.toLowerCase().includes(val.toLowerCase()));

        setFilterUser(filter);
    }

    const handleClear = () => {
        setSearch('');
        setFilterUser([]);
    }


    return (
        <div className='w-full bg-bg2 h-[100vh]'>
            <DownBar />
            <form className='my-3 relative items-center text-center mx-3 '>
                <input
                    type='text'
                    placeholder='Search...'
                    value={search}
                    onChange={handleSearch}
                    className='w-full h-10 border  rounded-md outline-none px-5'
                />
                <RxCross1
                    onClick={handleClear}
                    className='absolute right-3 top-2 text-2xl cursor-pointer p-1'
                />
            </form>


            {
                filterUser?.map((item) => (
                    <div key={item._id}>
                        <Link to={'/profile/' + item?._id}  >
                            <div className='flex flex-1 gap-5 mx-4 py-2 items-center text-center'>
                                <Avatar src={item.profileUrl}
                                    sx={{ width: 50, height: 50 }}
                                />
                                <p className='text-lg font-semibold text-ascent-1'>{item.firstName} {item.lastName}</p>
                            </div>
                        </Link>

                    </div>
                ))
            }

        </div>
    )
}
