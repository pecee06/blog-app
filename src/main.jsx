import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import {Landing, Auth} from "./components/components.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Landing/>} />
      <Route path='signup' element={<Auth label='signup' />}/>
      <Route path='signin' element={<Auth label='signin' />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)