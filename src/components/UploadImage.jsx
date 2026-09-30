import React from 'react'
import { TbFileUploadFilled } from "react-icons/tb";
import { BsFiletypeCsv } from "react-icons/bs";
import { LiaFileExcel } from "react-icons/lia";
import { LuFileJson } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { BsClipboardData } from "react-icons/bs";
import { FaTable } from "react-icons/fa";

const UploadImage = () => {
  return (
    <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/5'>
        <div className='bg-black/10 p-2.5 rounded-xl absolute left-4 bottom-16 opacity-30'>
            <FaTable size={16}/>
        </div>
        <div className='bg-black/10 p-2.5 rounded-xl absolute left-6 top-12 opacity-30'>
            <BsClipboardData size={16}/>
        </div>
        <div className='bg-black/10 p-2.5 rounded-xl absolute right-2 bottom-20 opacity-30'>
            <FaFilter size={16}/>
        </div>
        <div className='bg-black/10 p-2.5 rounded-xl absolute right-5 top-12 opacity-30'>
            <FaSearch size={16}/>
        </div>
        <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/5'>
            <div className='flex items-center justify-center p-12 relative rounded-full outline-1 outline-black/8'>
                <div className='bg-black/10 p-2 rounded-xl absolute -left-2 bottom-4 opacity-50'>
                    <BsFiletypeCsv size={22}/>
                </div>
                <div className='bg-black/10 p-2 rounded-xl absolute left-6 -top-2 opacity-50'>
                    <LiaFileExcel size={22}/>
                </div>
                <div className='bg-black/10 p-2 rounded-xl absolute -right-4 top-16 opacity-50'>
                    <LuFileJson size={22}/>
                </div>

                <div className='flex items-center justify-center p-6 rounded-full outline-1 outline-black/10'>
                    <TbFileUploadFilled size={54}/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default UploadImage