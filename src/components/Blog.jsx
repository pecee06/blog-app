import { Navigate, useNavigate } from "react-router-dom"
import { useUserContext } from "../contexts/user.context"
import { useBlogContext } from "../contexts/blog.context"
import { useEffect, useState } from "react"
import storeService from "../services/store.service"
import dbService from "../services/db.service"
import {Container, Header, Footer, Button} from "../components/components"
import parse from "html-react-parser"
import { tickIcon, wrongIcon } from "../assets/assets"

const Blog = () => {
    const {loggedIn, userData} = useUserContext()
    const {currentBlog, editBlog, deleteBlog, setCurrentBlog} = useBlogContext()
    const writeAccess = userData.$id == currentBlog.userId
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if (!currentBlog.featuredImage) navigate("/")
        else{
            const res = storeService.fetchFilePreview({fileId: currentBlog.featuredImage})
            setUrl(res)
        }
    },[])

    if (!loggedIn) return <Navigate to="/" />
    return(
        <Container className="flex flex-col gap-10">
            <Header/>
            <div className="min-h-[60vh] flex flex-col gap-5 px-20 py-10">
                <img src={url} className="h-[50vh] self-center" />
                <div className="flex justify-between">
                    <h2 className="font-bold uppercase" style={{fontSize: "3vmax"}}>{currentBlog.title}</h2>
                    <div className={`${currentBlog.status == "active" && "bg-green-500"} ${currentBlog.status == "active" && writeAccess && "hover:bg-green-600"} text-white flex justify-center items-center px-5 rounded-lg uppercase cursor-pointer flex-col gap-1`} onClick={()=>{
                        if (!writeAccess) return
                        // Edit status
                    }}>
                        {currentBlog.status}
                        <img src={currentBlog.status == "active" ? tickIcon : wrongIcon} width={25} height={25} />
                    </div>
                </div>
                <div className="bg-gray-50 rounded p-2 shadow">
                    {currentBlog.content &&
                        parse(currentBlog.content)
                    }
                </div>
            </div>
            {writeAccess &&
                <div className="self-end bg-violet-100 px-1 py-2 rounded">
                    <Button label="Edit" className="p-2 mx-2 bg-yellow-400 text-black hover:bg-yellow-500" functionality={()=>{
                        // Edit blog
                    }}/>
                    <Button label="Delete" className="p-2 mx-2 bg-red-600 hover:bg-red-700" functionality={()=>{
                        storeService.deleteFile({fileId: currentBlog.featuredImage})
                        .then(res => {
                            if (res){
                                dbService.delete({documentId: currentBlog.$id})
                                .then(response => {
                                    if (response){
                                        deleteBlog(currentBlog.$id)
                                        setCurrentBlog({})
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                })
                                .finally(()=>{
                                    navigate("/")
                                })
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    }}/>
                </div>
            }
            <Footer/>
        </Container>
    )
}

export default Blog