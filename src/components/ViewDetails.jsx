import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import useDataStore from '../store/dataStore';
import { FaInfo } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { ImList } from "react-icons/im";

const ViewDetails = ({setOpenFilter}) => {

    const selectedRow = useDataStore((state) => state.selectedRow)
    const setSelectedRow = useDataStore((state) => state.setSelectedRow)
    const clearRowData = useDataStore((state) => state.clearRowData)

    const [expandState, setExpandState] = useState([])
    const readMoreLength = 140

    const readMoreRecord = (row) => {
        if (expandState.includes(row)) {
            setExpandState(expandState.filter(val => val !== row))
        }
        else {
            setExpandState([...expandState, row])
        }
    }

    const closePopup = () => {
        setOpenFilter(false)
        clearRowData()
    }

    const applyFilter = () => {
        closePopup()
        clearRowData()
    }

  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-30 flex items-start justify-end p-4'>
        <div className='px-4 py-2 bg-white outline-1 relative flex flex-col outline-black/10 w-200 h-full rounded-xl shadow-lg overflow-hidden'>
            
            <div className='p-3.5 border-b-1 border-black/10 flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg text-black/80'>View Details</p>
                </div>
                <button onClick={closePopup} className='hover:cursor-pointer'>
                    <RxCross2 className='text-xl font-semibold text-black/60'/>
                </button>
            </div>

            <div className='px-3.5 pt-8 mb-20 grid grid-cols-3 gap-6 min-h-0 overflow-y-auto'>
                {
                   Object.keys(selectedRow).map((row) => {
                    const content = selectedRow[row]

                    if(row !== '_id' && row !== '_chkbox' && row !== '_info')
                        return(
                                <div key={row} className={`col-span-3 grid grid-cols-3 `}>
                                    <p className='text-base  text-black/60'>{row}</p>
                                    {/* <p className='col-span-2'> */}
                                        <div className='col-span-2'>
                                            <p className={`text-base col-span-2 text-black/90 ${(content.length  > readMoreLength && !expandState.includes(row)) && 'line-clamp-3'}`}>{content}</p> 
                                            {
                                                content?.length > readMoreLength && <button onClick={() => readMoreRecord(row)} className='text-green-600 rounded-2xl font-medium hover:cursor-pointer'>{expandState.includes(row) ? 'Read less' : 'Read more...'}</button>
                                            }
                                        </div>
                                        {/* <p className='text-green-600 font-medium'>Read More</p> */}
                                    {/* </p> */}
                                </div>
                        )
                    else 
                    return null
                   })
                }
                
            </div>

            <div className='flex items-center border-t-1 border-black/10 gap-2 bg-white absolute bottom-1 right-0 p-4 justify-end w-full'>
                <button onClick={closePopup} className='flex items-center hover:cursor-pointer gap-2 outline-1 outline-black/20 px-3 py-2 rounded-lg text-sm'>
                    Cancel
                </button>
                {/* <button onClick={applyFilter} className='flex items-center hover:cursor-pointer gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm'>
                    Apply
                </button> */}
            </div>

        </div>
    </div>
  )
}

export default ViewDetails