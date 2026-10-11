import React from 'react'
import { RxCross2 } from "react-icons/rx";
import useDataStore from '../store/dataStore';

const ViewDetails = ({setOpenFilter}) => {

    const selectedRow = useDataStore((state) => state.selectedRow)
    const setSelectedRow = useDataStore((state) => state.setSelectedRow)
    const clearRowData = useDataStore((state) => state.clearRowData)

    const closePopup = () => {
        setOpenFilter(false)
        clearRowData()
    }

    const applyFilter = () => {
        closePopup()
        clearRowData()
        console.log(selectedRow)
    }

  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-30 flex items-start justify-end p-4'>
        <div className='px-4 py-2 bg-white outline-1 outline-black/10 w-200 h-full rounded-xl shadow-lg'>
            
            <div className='p-2 border-b-1 border-black/10 flex items-center justify-between'>
                <p className='font-medium text-lg text-black/80'>View Details</p>
                <button onClick={closePopup} className='hover:cursor-pointer'>
                    <RxCross2 className='text-xl text-black/60'/>
                </button>
            </div>

            <div className='px-2 py-2 flex gap-4 flex-wrap justify-between'>
                {
                   Object.keys(selectedRow).map((row) => {
                    if(row !== '_id' && row !== '_chkbox' && row !== '_info')
                        return(
                            <div className='mt-4'>
                                <p className='text-base font-medium text-black/90'>{row}</p>
                                <p className='text-base text-black/70'>{selectedRow[row]}</p>
                            </div>
                        )
                    else 
                    return null
                   })
                }
            </div>

            {/* <div className='flex items-center border-t-1 border-black/10 gap-2 justify-end w-full px-4 pb-2 pt-4'>
                <button onClick={closePopup} className='flex items-center hover:cursor-pointer gap-2 outline-1 outline-black/20 px-3 py-2 rounded-lg text-sm'>
                    Cancel
                </button>
                <button onClick={applyFilter} className='flex items-center hover:cursor-pointer gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm'>
                    Apply
                </button>
            </div> */}

        </div>
    </div>
  )
}

export default ViewDetails