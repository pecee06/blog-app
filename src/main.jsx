import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import {Landing} from "./components/components.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Landing/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)