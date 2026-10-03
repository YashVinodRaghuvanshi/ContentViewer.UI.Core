import React, { useEffect, useRef, useState } from 'react'
import useDataStore from '../store/dataStore'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LuSettings2 } from "react-icons/lu";

import SymbolColumn from './SymbolColumn';
import Filter from './Filter';

const Grid = () => {

    const columns = useDataStore((state) => state.columns)
    const data = useDataStore((state) => state.data)

    const activeSheet = useDataStore((state) => state.activeSheet)

    const [searchTerm, setSearchTerm] = useState('')
    
    const filteredData = data.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const [openDrp, setOpenDrp] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(filteredData.length / currentPageSize)

    const startIndex = (currentPage - 1) * currentPageSize
    const endIndex = startIndex + currentPageSize
    const endRow = Math.min(endIndex, filteredData.length)

    const paginatedData = filteredData?.slice(startIndex, endIndex)
    
    const pageSizes = [5,10,15,20]
    const dropdownRef = useRef(null)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    const goToFirstPage = () => {
        setCurrentPage(1)
    }

    const goToLastPage = () => {
        setCurrentPage(totalPages)
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page-1, 1))
    }

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages))
    }

    const handlePageSizeSelection = (sizes) => {
        setCurrentPageSize(sizes); 
        setCurrentPage(1)
        setOpenDrp(false);
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDrp(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

    }, [])

    if (columns.length === 0) {
        return (
           <div className='flex'>
                <p className='mt-8 bg-red-100 text-red-700 font-medium py-1.5 px-3 rounded-full text-sm'>
                    ⓘ No columns available. Please upload a valid data file.
                </p>
           </div>
        )
    }

  return (
    <>

    {
        openFilter &&
        <Filter setOpenFilter = {setOpenFilter}/>
    }

    <div className='flex items-center mb-4 gap-2'>

        <button onClick={() => setOpenFilter(true)} className='flex items-center hover:cursor-pointer gap-2 outline-1 outline-black/10 px-3 py-2 rounded-lg text-sm'>
            <LuSettings2 className='text-black/50'/>
            Filters
        </button>

        <div className='outline-1 relative w-full outline-black/10 px-3 py-2 flex items-center rounded-lg'>
            <IoIosSearch className='absolute text-black/40 text-lg'/>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Your Data...' className='pl-6 w-full text-sm focus:outline-0'/>
            {
                searchTerm.length > 0 &&
                <button onClick={() => setSearchTerm('')} className='text-black/50 hover:bg-gray-100 p-1 rounded-lg hover:cursor-pointer'>
                    <RxCross2 />
                </button>
            }
        </div>
    </div>

    <div className={`${data.length > 0 && 'h-full'} border-t-1 border-b-1 border-black/10 flex flex-col justify-between overflow-hidden`}>
        <div className='h-full overflow-auto'>
            <table className='w-full'>
                <thead>
                        <tr className=''>
                        {
                            columns?.map((col, ind) => 
                                <SymbolColumn key={col.name+ind} title={col.title}/>
                            )
                        }
                        </tr>
                </thead>
                <tbody>
                {
                   paginatedData?.map((rows, index) => 
                            <tr key={index} className='border-b-1 border-black/10 hover:bg-green-50'>
                                {
                                    columns?.map((item, inde) =>  
                                        <td key={inde} className='px-6 py-3 text-sm'>{rows[item.name]}</td>
                                    )
                                }
                            </tr>)
                }
                        
                </tbody>
            </table>
            {
                data.length == 0 && 
                <div className='flex items-center justify-center p-4 text-black/70'>
                    <p>No records to display. Your file doesn't contain any data rows.</p>
                </div>
            }

            {
                (searchTerm && filteredData.length == 0) && 
                <div className='flex items-center justify-center p-4 text-black/70'>
                    <p>No matching records found for "{searchTerm}"</p>
                </div>
            }

        </div>

        {/* pagination */}
        <div className='p-3 flex items-center justify-between border-t-1 border-black/10'>

            <div className='flex items-center'>
                <button onClick={goToFirstPage} disabled={currentPage === 1} className={`p-2 rounded-l-md text-sm border-1 border-gray-300 hover:cursor-pointer hover:bg-gray-100 ${currentPage === 1 ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAnglesLeft />
                </button>
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className={`p-2 text-sm rounded-r-md outline-1 outline-gray-300 hover:cursor-pointer hover:bg-gray-100 ${currentPage === 1 ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAngleLeft />
                </button>
                
                <div className='flex flex-wrap items-center gap-2 px-3'>
                    {
                        Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
                            <button onClick={() => setCurrentPage(page)} key={page} className={`p-2 w-7.5 h-7.5 flex rounded-md items-center hover:cursor-pointer justify-center ${(currentPage == page) ? 'bg-green-600 text-green-100 font-semibold text-base' : 'text-black/30 font-medium  text-sm'}`}>
                                <p>{page}</p>
                            </button>
                        ))
                    }
                </div>
                
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-2 rounded-l-md text-sm hover:cursor-pointer border-1 border-gray-300 hover:bg-gray-100 ${currentPage === totalPages ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAngleRight />
                </button>
                <button onClick={goToLastPage} disabled={currentPage == totalPages} className={`p-2 rounded-r-md text-sm hover:cursor-pointer outline-1 outline-gray-300 hover:bg-gray-100 ${currentPage === totalPages ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAnglesRight />
                </button>
            </div>

            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2 pl-4'>
                    <p className='text-sm'>Rows per page</p>
                    <div ref={dropdownRef} className='relative'>
                        <button onClick={() => setOpenDrp(val => !val)} className='flex items-center gap-2 outline-1 outline-black/20 px-3 py-1 rounded-lg'>
                            {currentPageSize}
                            <FaAngleDown className='text-black/40'/>
                        </button>
                        
                        {
                            openDrp && 
                            <div className='p-1 flex flex-col gap-1 outline-1 absolute outline-black/20 bg-white rounded-lg z-10 bottom-8'>
                            {
                                pageSizes?.map((sizes, index) => (
                                  <button
                                    key={sizes} 
                                    onClick={() => handlePageSizeSelection(sizes)}
                                    className='w-14 text-start bg-white hover:bg-gray-200 rounded-md px-2  py-1 text-sm'>
                                        {sizes}
                                  </button>
                                ))
                            }
                            </div>
                        }

                    </div>
                </div>
                <div className='w-[2px] h-7 bg-black/10'></div>
                <div>
                    <p className='text-sm'>Rows {startIndex + 1} - {endRow} of {data.length}</p>
                </div>

            </div>

        </div>

    </div>
    </>
  )
}

export default Grid