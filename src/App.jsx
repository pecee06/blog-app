import { Outlet } from "react-router-dom"
import { UserProvider, BlogProvider } from "./contexts/contexts"
import { useState, useCallback } from "react"

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [blogs, setBlogs] = useState([])

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

  return (
    <UserProvider value={{loggedIn, login, logout}}>
      <BlogProvider value={{blogs, addBlog, updateBlog, deleteBlog}}>
        <Outlet/>
      </BlogProvider>
    </UserProvider>
  )
}

export default App