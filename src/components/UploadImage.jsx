import React from 'react'
import { TbFileUploadFilled } from "react-icons/tb";
import { BsFiletypeCsv } from "react-icons/bs";
import { LiaFileExcel } from "react-icons/lia";
import { LuFileJson } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { BsClipboardData } from "react-icons/bs";
import { FaTable } from "react-icons/fa";
import { BsCloudUpload } from "react-icons/bs";
import { PiUploadDuotone } from "react-icons/pi";

const UploadImage = () => {
  return (
    <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/5'>
        <div className='bg-fuchsia-50 p-2.5 rounded-xl absolute left-4 bottom-16 opacity-30'>
            <FaTable className='text-fuchsia-600' size={16}/>
        </div>
        <div className='bg-amber-100 p-2.5 rounded-xl absolute left-6 top-12 opacity-30'>
            <BsClipboardData className='text-amber-600' size={16}/>
        </div>
        <div className='bg-red-100 p-2.5 rounded-xl absolute right-2 bottom-20 opacity-30'>
            <FaFilter className='text-red-600' size={16}/>
        </div>
        <div className='bg-blue-100 p-2.5 rounded-xl absolute right-5 top-12 opacity-30'>
            <FaSearch className='text-blue-600' size={16}/>
        </div>
        <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/5'>
            <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/8'>
                <div className='bg-orange-100 p-2 rounded-xl absolute -left-2 bottom-4 opacity-50'>
                    <BsFiletypeCsv className='text-orange-600' size={22}/>
                </div>
                <div className='bg-green-100 p-2 rounded-xl absolute left-6 -top-2 opacity-50'>
                    <LiaFileExcel className='text-green-600' size={22}/>
                </div>
                <div className='bg-purple-100 p-2 rounded-xl absolute -right-4 top-16 opacity-50'>
                    <LuFileJson className='text-purple-600' size={22}/>
                </div>

                <div className='flex items-center justify-center p-6 rounded-full outline-1 outline-black/10'>
                    <PiUploadDuotone className='text-green-600' size={46}/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default UploadImage