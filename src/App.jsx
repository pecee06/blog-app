import { Outlet } from "react-router-dom"
import { UserProvider, BlogProvider } from "./contexts/contexts"
import { useState, useCallback, useEffect } from "react"
import {authService} from "./services/services"

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

  function login() {
    setLoggedIn(true)
  }
  function logout() {
    setLoggedIn(false)
  }

  const addBlog = useCallback((blog={})=>{
    setBlogs(prev => [...prev, blog])
  },[])

  const updateBlog = useCallback((documentId, changes={})=>{
    setBlogs(prev => (
      prev.map(blog => (blog._id == documentId) ? {...blog, ...changes} : blog)
    ))
  },[])
  
  const deleteBlog = useCallback((documentId)=>{
    setBlogs(prev => (
      prev.filter(blog => blog._id != documentId)
    ))
  },[])

  // Checking whether the user is already logged in (from previous session)
  useEffect(()=>{
    authService.getCurrentUser()
    .then(data => {
      if (data){
        setUserData(data)
        login()
      }
      else logout()
    })
    .catch(err => {
      console.error(err);
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return (
    <UserProvider value={{loggedIn, login, logout, userData}}>
      <BlogProvider value={{blogs, addBlog, updateBlog, deleteBlog}}>
      {
        loading ?
        <h1>Loading...</h1>
        :
        <Outlet/>
      }
      </BlogProvider>
    </UserProvider>
  )
}

export default App