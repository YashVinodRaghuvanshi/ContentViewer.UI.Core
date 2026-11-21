import React from 'react'
import UploadFile from './pages/UploadFile'
import { Navigate, Route, Routes } from 'react-router-dom'
import ViewData from './pages/ViewData'
import MainPage from './pages/MainPage'
import useDataStore from './store/dataStore'
import LandingPage from './pages/LandingPage'

const App = () => {
  const existedFile = useDataStore((state) => state.file)
  const hasHydrated = useDataStore((state) => state.hasHydrated)

  if (!hasHydrated) {
    return null
  }
  
  return (
    <Routes>
      <Route index element = {<LandingPage />} />
      <Route element = {<MainPage />} path='/'>
        <Route path = "upload" element = {<UploadFile />}/>
        <Route path = "viewdata" element = {existedFile ? <ViewData /> : <Navigate to={"/upload"} replace/> }/>
      </Route>
    </Routes>
  )
}

export default App