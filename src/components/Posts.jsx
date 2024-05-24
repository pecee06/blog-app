import { useEffect } from "react"
import dbService from "../services/db.service"
import { useBlogContext } from "../contexts/blog.context"
import {Button, Post} from "./components"
import { useNavigate } from "react-router-dom"

const Posts = () => {
    const {blogs, addBlog} = useBlogContext()
    const navigate = useNavigate()

    useEffect(()=>{
        dbService.fetchAll()
        .then(res => {
            res.documents.forEach(blog => {
                addBlog(blog)
            })
        }).catch(err => {
            console.error(err);
        })
    },[])

  return (
    <main className="min-h-[58vh] flex flex-col gap-10">
        <div className="flex justify-end">
            <Button label="+ Create Post" functionality={()=>{
                navigate("/create-post")
            }} className="bg-orange-400 hover:bg-orange-500 text-white p-2" />
        </div>
        <div className="grid grid-cols-3 gap-10 justify-items-center">
            {
                blogs.length > 0?
                blogs.map((blog, index) => (
                    <Post key={index} blog={blog} />
                ))
                :
                <h2 className="font-bold" style={{
                    fontSize: "2vmax"
                }}>No Blogs Added</h2>
            }
        </div>
    </main>
  )
}

export default Posts