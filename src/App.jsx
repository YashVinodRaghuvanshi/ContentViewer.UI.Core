import React from 'react'
import UploadFile from './pages/UploadFile'
import { Route, Routes } from 'react-router-dom'
import ViewData from './pages/ViewData'

const App = () => {
  return (
    // <div>
    //    <UploadFile />
    // </div>
    <Routes>
      <Route element = {<UploadFile />} path='/'/>
      <Route element = {<ViewData />} path='/viewdata'/>
    </Routes>
  )
}

export default App