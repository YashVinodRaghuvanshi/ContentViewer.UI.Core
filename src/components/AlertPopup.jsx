import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { HiArrowTurnDownRight } from "react-icons/hi2";
import { PiPlusCircleDuotone } from "react-icons/pi";
import { PiListPlusDuotone } from "react-icons/pi";
import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import useDataStore from '../store/dataStore';
import FilterDropdown from './FilterDropdown';
import FilterHandle from './FilterHandle';
import { LuFileMinus } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";
import { HiPlus } from "react-icons/hi";

const AlertPopup = ({setOpenFilter, handleFileRemoved}) => {

    const closePopup = () => {
        setOpenFilter(false)
    }

    const handleDelete = () => {
        handleFileRemoved()
        setOpenFilter(false)
    }

  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-40 flex items-center justify-center'>
        <div className='px-4 py-2 bg-white outline-1 outline-black/10 w-120 rounded-2xl shadow-lg'>
            

            <div className='flex flex-col items-center gap-2.5 py-6 px-4'>
                <div className='text-2xl p-3 text-red-600 bg-red-100 rounded-2xl'>
                    <LuFileMinus />
                </div>
                <div className='flex flex-col gap-2 items-center text-center mt-3'>
                    <p className='text-lg text-black/90 font-medium'>Remove File?</p>
                    <p className='text-sm text-black/60'>This will delete your file and all its changes. You can upload it again anytime.</p>
                </div>
            </div>

            <div className='flex items-center border-t-1 border-black/10 gap-2 justify-end w-full px-4 pb-2 pt-4'>
                <button onClick={closePopup} className='flex items-center hover:cursor-pointer gap-2 outline-1 outline-black/20 px-3 py-2 rounded-lg text-sm'>
                    Cancel
                </button>
                <button onClick={handleDelete} className='flex items-center hover:cursor-pointer gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm'>
                    Yes, Remove
                </button>
            </div>

        </div>
    </div>
  )
}

export default AlertPopup