import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createContext } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const fetchPosts = createAsyncThunk(
    'posts/getPost',
    async (userId) => {
        try {
            const postRef = collection(db, `users/${userId}/posts`)
            const querySnapShot = await getDocs(postRef)
            const docs = querySnapShot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            return docs
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)


export const savePost = createAsyncThunk(
    'posts/savePosts',
    async ({ userId, postContent, file }) => {
        try {
            let imageUrl = ''
            if (file !== null) {
                const imageRef = ref(storage, `posts/${file.name}`)
                const response = await uploadBytes(imageRef, file)
                imageUrl = await getDownloadURL(response.ref)
            }
            const postsRef = collection(db, `users/${userId}/posts`)


            const newPostRef = doc(postsRef)

            await setDoc(newPostRef, { content: postContent, likes: [], imageUrl })
            const newPost = getDoc(newPostRef)




            const post = {
                id: newPost.id,
                ...(await newPost).data()
            }

            return post
        } catch (error) {
            console.error(error)
            throw error
        }
    }

)

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ userId, postId, newPostContent, newFile }) => {
        try {
            // Upload the new file to the storage if it exists and get its URL
            let newImageUrl;
            if (newFile) {
                const imageRef = ref(storage, `posts/${newFile.name}`);
                const response = await uploadBytes(imageRef, newFile);
                newImageUrl = await getDownloadURL(response.ref);
            }
            // Reference to the existing post
            const postRef = doc(db, `users/${userId}/posts/${postId}`);
            // Get the current post data
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const postData = postSnap.data();
                // Update the post content and the image URL
                const updatedData = {
                    ...postData,
                    content: newPostContent || postData.content,
                    imageUrl: newImageUrl || postData.imageUrl,
                };
                // Update the existing document in Firestore
                await updateDoc(postRef, updatedData);
                // Return the post with updated data
                const updatedPost = { id: postId, ...updatedData };
                return updatedPost;
            } else {
                throw new Error("Post does not exist");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`)
            await deleteDoc(postRef)
            return postId
        } catch (error) {
            console.error(error)
            throw error
        }
    }

)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`)
            const docSnap = await getDoc(postRef)
            if (docSnap.exists()) {
                const postData = docSnap.data()
                const likes = [...postData.likes, userId]
                await setDoc(postRef, { ...postData, likes })
            }

            return { userId, postId }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

)

export const removeLikes = createAsyncThunk(
    'posts/removeLikes',
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`)
            const docSnap = await getDoc(postRef)
            if (docSnap.exists()) {
                const postData = docSnap.data()
                const likes = postData.likes.filter((id) => id !== userId)
                await setDoc(postRef, { ...postData, likes })
            }
            return { userId, postId }

        }
        catch (error) {
            console.error(error)
            throw error
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts]
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const { userId, postId } = action.payload
                const postIndex = state.posts.findIndex((post) => post.id === postId)
                if (postIndex !== 1) {
                    state.posts[postIndex].likes.push(userId)
                }
            })
            .addCase(removeLikes.fulfilled, (state, action) => {
                const { userId, postId } = action.payload
                const postIndex = state.posts.findIndex((post) => post.id === postId)
                if (postIndex !== -1) {
                    state.posts[postIndex].likes = state.posts[postIndex].likes.filter((id) => id !== userId)
                }
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatePost = action.payload
                const postIndex = state.posts.findIndex((post) => post.id === updatePost.id)
                if (postIndex !== -1) {
                    state.posts[postIndex] = updatePost
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const deletePostid = action.payload
                state.posts = state.posts.filter((post) => post.id !== deletePostid)
            })
    }

})


export default postSlice.reducer
export const AuthContext = createContext()
