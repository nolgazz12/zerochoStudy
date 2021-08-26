import React from "react"
import AppLayout from "../components/AppLayout"
import { useSelector } from "react-redux"

import PostForm from "../components/PostForm"
import PostCard from "../components/postCard"

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user) //구조분해한거
    const mainPosts = useSelector((state) => state.post.mainPosts) // 구조분해 안한거
    return (
       <AppLayout>
        {isLoggedIn && <PostForm/>}
        {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
       </AppLayout>
    )
}
 
export default Home