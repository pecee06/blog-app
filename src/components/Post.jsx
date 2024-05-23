import { useEffect, useState } from "react"
import storeService from "../services/store.service"

const Post = ({title, featuredImage, status}) => {
  const [url, setUrl] = useState("")
  useEffect(()=>{
    let res = storeService.fetchFilePreview({fileId: featuredImage})
    setUrl(res)
  },[])

  return (
    <div className="p-4 w-fit flex flex-col items-center rounded-lg border border-violet-800 cursor-pointer gap-5 hover:bg-gray-50 transition-all">
      <img src={url} className="h-[30vh] w-[20vw]" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-violet-800">{title}</p>
        <p className={`uppercase ${status=="active"? "text-green-500" : "text-red-600"}`}>{status}</p>
      </div>
    </div>
  )
}

export default Post