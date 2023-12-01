import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { TextInput } from './TextInput';
import { Loading } from './Loading';
import { CustomBtn } from './CustomBtn';
import { apiRequest } from '../utils';
import { MdDelete } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsChat } from "react-icons/bs";


const getPostComments = async (id) => {

    try {
        const res = await apiRequest({
            url: "posts/comment/" + id,
            method: "GET",
        });
        return res?.data;

    } catch (error) {
        console.log(error, "api error");
    }
}


const ReplyCard = ({ reply, user, handleLike }) => {


    return (

        <div className='w-full py-3'>
            <div className='flex gap-3 items-center mb-1'>
                <Link>
                    <img
                        src={reply?.userId?.profileUrl}
                        alt={reply?.userId.firstName}
                        className='w-10 h-10 rounded-full object-cover'
                    />
                </Link>

                <div>
                    <Link to={"/profile/" + reply?.userId?._id} >
                        <p className='font-medium text-base text-ascent-1'>
                            {reply?.userId?.firstName} {reply?.userId?.lastName}
                        </p>
                    </Link>
                    <span>
                        {moment(reply?.createAt ?? new Date).fromNow()}
                    </span>
                </div>

            </div>

            <div className='ml-12'>
                <p className='text-ascent-2'>{reply?.comment}</p>
                <div className='mt-2 flex gap-6'>
                    <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
                        onClick={handleLike()}>
                        {reply?.likes?.includes(user?._id) ?

                            (<FaHeart size={20} className='text-red-500' />)
                            :
                            (<FaRegHeart size={20} />)
                        }
                        {
                            reply?.like?.length
                        }Likes
                    </p>
                </div>
            </div>
        </div>
    )

}


const CommentForm = ({ user, id, replyAt, getComments }) => {

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        setLoading(true);
        setErrMsg("");

        try {
            const URL = !replyAt ? "posts/comment/" + id : "posts/reply-comment/" + id;

            const newData = {
                comment: data?.comment,
                from: user?.firstName + " " + user?.lastName,
                replyAt: replyAt,
            }

            const res = await apiRequest({
                url: URL,
                data: newData,
                token: user?.token,
                method: "POST",
            })

            if (res?.status === "Failed") {
                setErrMsg(res?.message);
            }
            else {
                reset({ comment: "" });
                setErrMsg("");
                await getComments();
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit(onSubmit)}
        className='w-full border-b border-[#66666645]'>

        <div className='w-full flex items-center gap-3 py-4 justify-between'>

            <div className='flex w-full items-center justify-between'>

                <div>
                    <img
                        src={user?.profileUrl}
                        alt='user image'
                        className='w-14 h-14 rounded-full bg-blue object-cover'
                    />
                </div>

                <div className='mr-3 w-[80%]'>
                    <TextInput
                        name='comment'
                        styles='w-full rounded-full py-3'
                        placeholder={replyAt ? `Relpy @${replyAt}` : "Write a comment"}
                        register={register("comment", { required: "Comment is required" })}
                        error={errors?.comment ? errors.comment.message : ""}
                    />
                </div>


            </div>


            <div className='pt-3'>
                {loading ? (<Loading />) : (
                    <CustomBtn title="Submit" type="submit" containerStyles='bg-[#0444a4] text-white py-2 px-4 rounded-full font-semibold text-sm' />)}
            </div>
        </div>
    </form>


}


export const PostCard = ({ post, user, deletePost, likePost }) => {

    const [showAll, setShowAll] = useState(0);
    const [showReply, setShowReply] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyComments, setReplyComments] = useState(0);
    const [showComments, setShowComments] = useState(0);

    const date = new Date();


    const getComments = async (id) => {
        setReplyComments(0);
        const result = await getPostComments(id);

        setComments(result);
        setLoading(false);
    }

    const handleLike = async (uri) => {
        await likePost(uri);
        await getComments(post?._id);

    };

    return (
        <div className='mb-2 p-4 rounded-lg border text-ascent-2 bg-bg2'>
            

            <div className='flex gap-3 items-center mb-2 '>
                <Link to={'/profile/' + post?.userId?._id}>
                    <img src={post?.userId?.profileUrl} alt={post?.userId?.firstName} className='w-16 h-14 rounded-full object-cover' />

                </Link>

                <div className='w-full flex justify-between '>
                    <div className=''>
                        <Link to={'/profile/' + post?.userId?._id}>
                            <p className='font-medium text-lg text-ascent-1'>
                                {post?.userId?.firstName} {post?.userId?.lastName}
                            </p>
                        </Link>
                        <span className='text-ascent-2'>
                            {post?.userId?.location}
                        </span>
                    </div>

                    <div className='flex justify-between items-center'>
                        <span className='text-ascent-2 text-base'>{moment(post?.createdAt).fromNow()}</span>
                    </div>
                </div>

            </div>

            <div>
                <p className='text-ascent-1 '>
                    {
                        showAll === post?._id ? post?.description : post?.description?.slice(0, 200)
                    }
                    {
                        post?.description?.length > 301 && (
                            showAll === post?._id ?
                                (
                                    <span
                                        className='text-blue-700 mt-2 font-medium cursor-pointer'
                                        onClick={() => setShowAll(0)}
                                    >
                                        Show Less
                                    </span>
                                ) : (
                                    <span className='text-blue-700 ml-2 font-medium cursor-pointer'
                                        onClick={() => setShowAll(post?._id)}>
                                        Show More
                                    </span>
                                )
                        )
                    }
                </p>

                {
                    post?.image && (
                        <img src={post?.image}
                            alt="post image"
                            className='w-full mt-2 rounded-lg' />
                    )
                }
            </div>

            <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t '>

                <p className='flex gap-2 items-center text-base cursor-pointer text-ascent-1'
                    onClick={() => handleLike('/posts/like/' + post?._id)}>

                    {post?.likes?.includes(user?._id)
                        ?
                        <FaHeart size={20} className='text-red' />
                        :
                        <FaRegHeart size={20} />
                    }
                    {post?.likes?.length} Likes
                </p>



                <p className='flex gap-2 items-center text-ascent-1 text-base cursor-pointer'
                    onClick={() => {
                        setShowComments(showComments === post?._id ? null : post?._id);
                        getComments(post?._id)
                    }}
                >

                    <BsChat size={20} />
                    {post?.comments?.length} Comments

                </p>


                {user?._id === post?.userId?._id && (
                    <div className='flex gap-2 items-center text-base cursor-pointer text-ascent-1'
                        onClick={() => deletePost(post?._id)}
                    >

                        <MdDelete size={20} />
                        <span>Delete</span>

                    </div>
                )}





            </div>



            {/* Comments  */}



            {
                showComments === post?._id && (
                    <div className='w-full mt-4 border-t border-[#66666645] pt-4 '>
                        <CommentForm
                            user={user}
                            id={post?._id}
                            getComments={() => getComments(post?._id)}
                        />

                        {
                            loading ? (<Loading />) : comments?.length > 0 ? (

                                comments.map((comment) => (

                                    <div className='w-full py-2' key={comments?._id}>

                                        <div className='flex  gap-3 items-center mb-1'>
                                            <Link to={'/profile/' + comments?.userId?._id}>
                                                <img
                                                    src={comment?.userId?.profileUrl}
                                                    alt={comment?.userId?.firstName}
                                                    className='w-11 h-10 rounded-full object-cover'
                                                />
                                            </Link>

                                            <div className='flex justify-between w-full items-center'>

                                                <div>
                                                    <Link to={'/profile' + comment?.userId?._id}>
                                                        <p className='font-medium text-base text-ascent-1'>
                                                            {comment?.userId?.firstName} {comment?.userId?.lastName}
                                                        </p>
                                                    </Link>

                                                    <p className='text-ascent-1'>
                                                        {comment?.comment}
                                                    </p>

                                                </div>
                                                <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
                                                    {comment?.likes?.includes(user?._id) ? (
                                                        <FaHeart size={20} className=' text-red-500' />
                                                    ) : (
                                                        <FaRegHeart size={20} />
                                                    )}

                                                    <span>{comment?.likes?.length}</span>
                                                </p>

                                            </div>


                                        </div>

                                        <div className='ml-12'>

                                            <div className='flex items-center'>

                                                <p className='text-ascent-2 gap-3 flex'>
                                                    <span>
                                                        {moment(comment?.createdAt ?? new Date).fromNow()}
                                                    </span>

                                                    <span className='text-blue cursor-pointer'
                                                        onClick={() => setReplyComments(replyComments === comment?._id ? null : comment?._id)}
                                                    // setShowComments(showComments === post?._id ? null : post?._id);
                                                    >
                                                        Reply
                                                    </span>
                                                </p>

                                            </div>


                                            <div className='mt-2 flex gap-6'>

                                            </div>

                                            {
                                                replyComments === comment?._id && (
                                                    <CommentForm
                                                        user={user}
                                                        id={comment?._id}
                                                        replyAt={comment?.from}
                                                        getComments={() => getComments(post?._id)}
                                                    />

                                                )
                                            }
                                        </div>




                                        {/*  Replies */}




                                        <div className='py-2 px-8 mt-1 '>
                                            {
                                                comment?.replies?.length > 0 && (

                                                    <p className='text-base text-ascent-1 cursor-pointer'
                                                        onClick={() => setShowReply(showReply === comment?.replies?._id ? 0 : comment?.replies?._id)}
                                                    >
                                                        Show Replies({comment?.replies?.length})
                                                    </p>
                                                )
                                            }
                                            {
                                                showReply === comment?.replies?._id && comment?.replies?.map((reply) => (
                                                    <ReplyCard reply={reply} user={user} key={reply?._id}
                                                        handleLike={() => handleLike('/posts/like-comment' + comment?._id + '/' + reply?._id)}
                                                    />

                                                )
                                                )
                                            }
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <span className='flex text-sm py-4 text-ascent-2 text-center'>
                                    No Comments
                                </span>
                            )
                        }

                    </div>
                )
            }
        </div>
    )
}