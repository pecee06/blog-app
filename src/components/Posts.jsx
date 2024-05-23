import { useEffect } from "react"
import dbService from "../services/db.service"
import { useBlogContext } from "../contexts/blog.context"
import {Button, Blog} from "./components"
import { useNavigate } from "react-router-dom"

const Posts = () => {
    const {blogs, addBlog} = useBlogContext()
    const navigate = useNavigate()

    useEffect(()=>{
        dbService.fetchAll()
        .then(res => {
            res.forEach(blog => {
                addBlog(blog)
            })
        })
    },[])

  return (
    <main className="min-h-[58vh]">
        <div className="flex justify-end">
            <Button label="+ Create Post" functionality={()=>{
                navigate("/create-post")
            }} className="bg-orange-400 hover:bg-orange-500 text-white p-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
            {
                blogs.map((blog, index) => (
                    <Blog key={index} title={blog.title} featuredImage={blog.featuredImage} content={blog.content} />
                ))
            }
        </div>
    </main>
  )
}

export default Posts