import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Filter = ({setOpenFilter}) => {

    const closePopup = () => {
        setOpenFilter(false)
    }

    const applyFilter = () => {
        closePopup()
    }

  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-30 flex items-center justify-center'>
        <div className='px-4 py-2 bg-white outline-1 outline-black/10 w-140 rounded-2xl shadow-lg'>
            
            <div className='p-2 border-b-1 border-black/10 flex items-center justify-between'>
                <p className='font-medium text-lg text-black/80'>Filters</p>
                <button onClick={closePopup} className='hover:cursor-pointer'>
                    <RxCross2 className='text-xl text-black/60'/>
                </button>
            </div>

            <div className='p-6'>
                
            </div>

            <div className='flex items-center border-t-1 border-black/10 gap-2 justify-end w-full px-4 pb-2 pt-4'>
                <button onClick={closePopup} className='flex items-center hover:cursor-pointer gap-2 outline-1 outline-black/20 px-3 py-2 rounded-lg text-sm'>
                    Cancel
                </button>
                <button onClick={applyFilter} className='flex items-center hover:cursor-pointer gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm'>
                    Apply
                </button>
            </div>

        </div>
    </div>
  )
}

export default Filter