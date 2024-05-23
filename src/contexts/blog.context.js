import { createContext, useContext } from "react"

const BlogContext = createContext({
    blogs: [
        // {
        //     $id: "",
        //     title: "",
        //     content: "",
        //     status: "",
        //     featuredImage: "",
        //     userId: ""   // -> userData.$id
        // }
    ],
    currentBlog: {},
    setCurrentBlog: ()=>{},
    addBlog: (blog)=>{},
    editBlog: (documentId, changes)=>{},
    deleteBlog: (documentId)=>{}
})

const BlogProvider = BlogContext.Provider

const useBlogContext = ()=>{
    return useContext(BlogContext)
}

export {BlogProvider, useBlogContext}