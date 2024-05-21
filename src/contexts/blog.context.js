import { createContext, useContext } from "react"

const BlogContext = createContext({
    blogs: [
        // {
        //     _id: "",
        //     title: "",
        //     content: "",
        //     status: "",
        //     featuredImage: "",
        //     userId: ""
        // }
    ],
    addBlog: (blog)=>{},
    updateBlog: (documentId, changes)=>{},
    deleteBlog: ()=>{}
})

const BlogProvider = BlogContext.Provider

const useBlogContext = ()=>{
    return useContext(BlogContext)
}

export {BlogProvider, useBlogContext}