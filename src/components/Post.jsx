import { useEffect, useState } from "react"
import storeService from "../services/store.service"
import { useNavigate } from "react-router-dom"
import { useBlogContext } from "../contexts/blog.context"

const Post = ({blog={}}) => {
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const {setCurrentBlog} = useBlogContext()

  useEffect(()=>{
    let res = storeService.fetchFilePreview({fileId: blog.featuredImage || ""})
    setUrl(res)
  },[])

  return (
    <div className={`p-4 w-fit flex flex-col items-center rounded-lg border border-violet-800 cursor-pointer gap-5 hover:bg-gray-50 transition-all ${!blog.status && "bg-slate-300 hover:bg-slate-400"}`} onClick={()=>{
      setCurrentBlog(blog)
      navigate("/blog")
    }}>
      <img src={url} className="h-[30vh] w-[20vw]" />
      <div className="flex flex-col items-center gap-1">
        <p className={`${blog.status ? "text-violet-800" : "text-black"} uppercase`}>{blog.title}</p>
        <p className={`uppercase ${blog.status ? "text-green-500" : "text-red-600"}`}>{blog.status ? "Active" : "Inactive"}</p>
      </div>
    </div>
  )
}

export default Post