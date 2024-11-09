import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://b547bc77-1cb6-4229-9bcc-de16767dab7c-00-3qjdl2tw568q4.sisko.replit.dev'

export const fetchPosts = createAsyncThunk(
    'posts/getPost',
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`)
        return response.json()
    }
)

export const savePost = createAsyncThunk(
    'posts/savePosts',
    async (postContent) => {
        const token = localStorage.getItem('authToken')
        const decoded = jwtDecode(token)
        const userId = decoded.id

        const data = {
            title: 'post title',
            content: postContent,
            user_id: userId
        }

        const response = await axios.post(`${BASE_URL}/posts`, data)
        return response.data
    }

)


const postSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts]
            })
    }

})


export default postSlice.reducer