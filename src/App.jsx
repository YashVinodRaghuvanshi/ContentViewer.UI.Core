import React from 'react'
import UploadFile from './pages/UploadFile'
import { Navigate, Route, Routes } from 'react-router-dom'
import ViewData from './pages/ViewData'
import MainPage from './pages/MainPage'
import useDataStore from './store/dataStore'

const App = () => {
  const existedFile = useDataStore((state) => state.file)
  return (
    <Routes>
      {/* <Route element = {<UploadFile />} path='/'/> */}
      <Route element = {<MainPage />} path='/'>
        <Route path = "upload" element = {<UploadFile />}/>
        <Route path = "viewdata" element = {<ViewData />}/>
      </Route>
    </Routes>
  )
}

export default App