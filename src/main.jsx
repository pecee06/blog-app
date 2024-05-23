import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import {Landing, Auth, DialogBox, Blog} from "./components/components.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Landing/>} />
      <Route path='signup' element={<Auth label='signup' />}/>
      <Route path='signin' element={<Auth label='signin' />}/>
      <Route path='create-post' element={<DialogBox/>} />
      <Route path='blog' element={<Blog/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)