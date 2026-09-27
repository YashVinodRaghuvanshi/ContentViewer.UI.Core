import React, { useRef } from 'react'
import imglogo from '../assets/img file.png'
import { CiFileOn } from "react-icons/ci";

const UploadFile = () => {

    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if(!file) return 
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center'>
            <img src={imglogo} alt="img logo" className='w-30'/>
            
            <div className='mt-12 flex flex-col gap-3 items-center'>
                <p className='text-2xl font-medium text-black/70'>Upload Your Data. Explore It Your Way.</p>
                <p className='text-base text-black/50'>Search, sort, filter, and paginate your data with ease</p>
            </div>

            <input type="file" ref={fileInputRef} accept=".xls, .xlsx, .csv" onChange={handleFileChange} className='hidden'/>

            <button onClick={handleUploadClick} className='text-base flex items-center gap-2 font-medium mt-10 hover:cursor-pointer hover:shadow-lg text-black/70 outline-1 py-2 px-5 rounded-full outline-black/20'>
                <CiFileOn size={20}/>
                Upload a file
            </button>
            
            <p className='mt-20 bg-green-100 text-green-700 font-medium py-1.5 px-3 rounded-full text-sm'>ⓘ Supported file types : .XLS, .XLSX, .CSV</p>

        </div>
        <p className='text-base absolute bottom-10 text-black/30'>Version 1.0.0</p>
    </div>
  )
}

export default UploadFile