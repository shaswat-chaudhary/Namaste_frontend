import axios from 'axios';
import { SetPosts } from '../redux/postSlice';

// const API_URL = "https://namaste-2st2.onrender.com"
const API_URL = "http://localhost:3001"


export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
})

export const apiRequest = async ({ url, token, data, method }) => {

    try {
        const result = await API(url, {
          method: method || "GET",
          data: data,
          headers: {
            "content-type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          }

        });

        return result?.data;

    } catch (error) {
        const err = error.response.data.message;
        console.log(err);
        return { status: err.success, message: err.message };

    }
}


export const handleFileUpload = async (updateFile) => {
    const formData = new FormData();
    formData.append("file", updateFile);
    formData.append("upload_preset", "namaste_india");

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dfdsoyxs9/image/upload`,
            formData
        )
        return response.data.secure_url;
    }
    catch (error) {
        console.log(error);

    }
}

export const getUserInfo = async (token, id) => {
    try {
        const uri = id === undefined ? "/users/get-user" : "/users/get-user/"  + id;

        const res = await apiRequest({
            url: uri,
            token: token,
            method: "GET",
        });

        if (res?.message === "Authentication failed") {
            localStorage.removeItem("user");
            window.alert("User session expired. Please login again.");
            window.location.replace("/login");
        }
      
        return res?.user;

    }
    catch (error) {
        console.log(error);
    }
}

export const fetchPosts = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });

        dispatch(SetPosts(res?.data));
        return;
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async ({ uri, token }) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST",
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (id, token) => {
    try {
        const res = await apiRequest({
            url: "/posts/" + id,
            token: token,
            method: "DELETE",
        });

        return res;

    } catch (error) {
        console.log(error);
    }
}

export const sendFriendReq = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "users/friend-request",
            token: token,
            method: "POST",
            data: { requestTo: id,},
        });
        console.log(res, "send friend request");
        return res;

    } catch (error) {
        console.log(error, "not send request");
    }
}

export const viewUserProfile = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/profile-view",
            token: token,
            method: "POST",
            data: { id },
        })
        return;
    } catch (error) {
        console.log(error);
    }
}

export const searchUser = async (token, query) => {
    try {
        const res = await apiRequest({
            url: "/users/search?search=",
            token: token,
            method: "GET",
            data: { query },
        });       
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const replyComment = async (token, data) => {
    try {
        const res = await apiRequest({
            url: "/posts/reply-comment",
            token: token,
            method: "POST",
            data: data,
        })
    }
    catch (error) {
        console.log(error);
    }
}

