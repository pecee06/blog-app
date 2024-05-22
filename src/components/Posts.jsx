import { useEffect } from "react"
import dbService from "../services/db.service"
import { useBlogContext } from "../contexts/blog.context"

const Posts = () => {
    const {blogs, addBlog} = useBlogContext()

    useEffect(()=>{
        dbService.fetchAll()
        .then(blogs => {
            blogs.forEach(blog => {
                addBlog(blog)
            })
        })
    },[])

  return (
    <main>
        
    </main>
  )
}

export default Posts