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
import { TbTableColumn } from "react-icons/tb";
import { PiSelectionDuotone } from "react-icons/pi";
import { MdOutlineBorderClear } from "react-icons/md";
import { HiArrowTurnDownRight } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { CgEye } from "react-icons/cg";

import { AiTwotoneDatabase } from "react-icons/ai";
import { MdOutlineTabUnselected } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";
import { PiSelectionInverseDuotone } from "react-icons/pi";
import { PiSelectionBold } from "react-icons/pi";
import { GrFormView } from "react-icons/gr";

import { FaSquareCheck } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa6";
import { FiSquare } from "react-icons/fi";
import { GoSidebarCollapse } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { PiSelectionForegroundDuotone } from "react-icons/pi";

import SymbolColumn from './SymbolColumn';
import Filter from './Filter';
import EditColumns from './EditColumns';
import ViewDetails from './ViewDetails';

const Grid = ({children}) => {

    const columns = useDataStore((state) => state.columns)
    const data = useDataStore((state) => state.data)

    const activeSheet = useDataStore((state) => state.activeSheet)
    const sheets = useDataStore((state) => state.sheets)

    const [searchTerm, setSearchTerm] = useState('')
    const selectedRowTab = useDataStore((state) => state.selectedRowTab)
    const setSelectedRowTab = useDataStore((state) => state.setSelectedRowTab)

    const filter = useDataStore((state) => state.filter)
    const setFilter = useDataStore((state) => state.setFilter)

    const frozenColumn = useDataStore((state) => state.frozenColumn)

    const selectedRow = useDataStore((state) => state.selectedRow)
    const sortOrder = useDataStore((state) => state.sortOrder)
    const setSelectedRow = useDataStore((state) => state.setSelectedRow)

    const searchedData = data.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const activeSheetFilter = filter?.[activeSheet] || []

    const filteredData = searchedData.filter((row) => {

        const validFilter = activeSheetFilter?.filter((condition) => 
            condition.column &&
            condition.operator &&
            condition.value !== null &&
            String(condition.value).trim() !== ""
        )

        if (validFilter.length === 0) {
            return true;
        }
            
        return validFilter?.reduce((result, val, ind) => {
            const rowValue = row[val?.column]
            let isMatched = false

            if (val.operator === 'Equal') {
                isMatched = String( rowValue ?? "").toLowerCase() 
                    === String(val?.value ?? "").toLowerCase()
            }
            else if (val.operator === 'Not Equal') {
                isMatched = String( rowValue ?? "").toLowerCase() 
                !== String(val?.value ?? "").toLowerCase()
            }

            if (ind === 0) {
                return isMatched
            }

            if(val.operand === "Or") {
                return result || isMatched
            }
        
            return result && isMatched

        }, false)

    })

    const sortedData = [...filteredData].sort((a,b) => {
       
            if (!sortOrder?.order) return

            const valueA = a[sortOrder?.name]
            const valueB = b[sortOrder?.name]

            let result = 0

            if (valueA == null && valueB == null) {
                result = 0
            }
            else if (valueA == null) {
                result = 1
            }
            else if (valueB == null) {
                result = -1
            }
            else if (typeof valueA == 'number' && typeof valueB == 'number') {
                result = valueA - valueB
            }
            else {
                result = String(valueA).localeCompare(String(valueB), undefined, {numeric: true, sensitivity: 'base'})
            }

            if (result !== 0) {
                return sortOrder?.order == 'desc' ? -result : result
            }

        return 0
    })

    const [selectedRows, setSelectedRows] = useState({})
    const selectedRowIds = selectedRows[activeSheet] || []
    const rowFilteredData = sortedData.filter((row) => {

        if(selectedRowTab === 1) {
            return true 
        }

        if(selectedRowTab === 2) {
            return selectedRowIds.includes(row._id)
        }

        if(selectedRowTab == 3) {
            return !selectedRowIds.includes(row._id)
        }

        return true

    })

    const [openDrp, setOpenDrp] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [openFieldSetting, setOpenFieldSetting] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    
    const rowSelection = (row) => {
        const currentRow = selectedRows[activeSheet] || []
        if(currentRow.includes(row._id)) {
            setSelectedRows((prev) => ({
                ...prev,
                [activeSheet]: prev[activeSheet].filter((id) => id !== row._id)
            }))
        }
        else 
        {
            setSelectedRows((prev) => ({
                ...prev, 
                [activeSheet]: [
                    ...(prev[activeSheet] || []),
                    row._id
                ]
            }))
        }
    }

    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(rowFilteredData.length / currentPageSize)

    const startIndex = (currentPage - 1) * currentPageSize
    const endIndex = startIndex + currentPageSize
    const endRow = Math.min(endIndex, rowFilteredData.length)

    const paginatedData = rowFilteredData?.slice(startIndex, endIndex)

    const totalColumns = sheets[activeSheet]?.columns || []
    const selectedColumn = useDataStore((state) => state.selectedColumn)
    const visibleColumns = selectedColumn[activeSheet] || totalColumns
    const setSelectedColumn = useDataStore((state) => state.setSelectedColumn)
    const [showSearch, setShowSearch] = useState(true)

    const pageSizes = [5,10,15,20, 30, 40]
    const dropdownRef = useRef(null)

    const [draggedColumn, setDraggedColumn] = useState(null)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    const goToFirstPage = () => {
        setCurrentGroupPage(0)
        setCurrentPage(1)
    }

    const goToLastPage = () => {
        setCurrentGroupPage(totalGroups-1)
        setCurrentPage(totalPages)
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page-1, 1))

        if (currentPage % groupPageSize === 1) {
            setCurrentGroupPage((prev) => Math.max(prev - 1, 0))
        }
    }

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages))

        if (currentPage % groupPageSize === 0) {
            setCurrentGroupPage((prev) => Math.min(prev + 1, totalGroups - 1))
        }
        
    }

    const handlePageSizeSelection = (sizes) => {
        setCurrentPageSize(sizes); 
        setCurrentPage(1)
        setOpenDrp(false);
    }

    const actionAllRows = (id) => {
        setSelectedRowTab(id)
        setCurrentPage(1)
    }
    const actionSelectedRows = (id) => {
        setSelectedRowTab(id)
        setCurrentPage(1)
    }
    const actionUnselectedRows = (id) => {
        setSelectedRowTab(id)
        setCurrentPage(1)
    }

    const handleAddFilter = () => {
        if (filter[activeSheet] == undefined || filter[activeSheet].length == 0) {
            setFilter({
                ...filter,
                [activeSheet]: [{
                    id: Date.now(),
                    column:null,
                    datatype:null,
                    operator:null,
                    value:null,
                    operand: 'And'
                }]
            })
        }
        setOpenFilter(true)

    }

    const handleDrop = (dropIndex) => {
        const newColumns = [...visibleColumns]
        const [movedColumn] = newColumns.splice(draggedColumn, 1)
        newColumns.splice(dropIndex, 0, movedColumn)
        setSelectedColumn({
            ...selectedColumn,
            [activeSheet]: newColumns
        })

        setDraggedColumn(null)
    }

    const rowSelectionPanel = [
        {
            id:1,
            title: 'All rows:',
            count: filteredData?.length,
            icon: AiTwotoneDatabase,
            handler: actionAllRows
        },
        {
            id:2,
            title: 'Mark rows:',
            count: selectedRows[activeSheet]?.length || 0,
            icon: PiSelectionInverseDuotone,
            handler: actionSelectedRows
        },
        {
            id:3,
            title: 'Unmark rows:',
            count: data.length - (selectedRows[activeSheet]?.length || 0),
            icon: PiSelectionBold,
            handler: actionUnselectedRows
        }
    ]

    const paginationPages = Array.from({length: totalPages}, (_, index) => index + 1)
    const [currentGroupPage, setCurrentGroupPage] = useState(0)
    const groupPageSize = 4
    const totalGroups = Math.ceil((paginationPages.length) / groupPageSize)
    const startIndexPager = currentGroupPage * groupPageSize
    const endIndexPager = startIndexPager + groupPageSize
    const paginationViewPages = paginationPages.slice(startIndexPager, endIndexPager)


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

    // if (columns.length === 0) {
    //     return (
    //        <div className='flex'>
    //             <p className='mt-8 bg-red-100 text-red-700 font-medium py-1.5 px-3 rounded-full text-sm'>
    //                 ⓘ No columns available. Please upload a valid data file.
    //             </p>
    //        </div>
    //     )
    // }

  return (
    <>

    {
        openFieldSetting &&
        <EditColumns setOpenFilter = {setOpenFieldSetting}/>
    }

    {
        openFilter &&
        <Filter setOpenFilter = {setOpenFilter}/>
    }

    {
        openView &&
        <ViewDetails setOpenFilter = {setOpenView}/>
    }

        <div className='flex items-center justify-between mb-4 gap-10'>
            {children}

            <div className='flex items-center gap-2'>

            <div className='flex items-center gap-2'>
                <button onClick={() => setOpenFieldSetting(true)} className={`flex items-center gap-1.5 px-3 py-1 rounded-full hover:cursor-pointer hover:bg-gray-100`}>
                    <TbTableColumn className={`text-black/60`}/>
                    <p className={`text-sm text-black/70 font-medium`}>Hide Columns {selectedColumn[activeSheet]?.some(val => val.ishidden == true) ? '(' + selectedColumn[activeSheet]?.filter(val => val.ishidden == true).length + ')' : ''}</p>
                </button>

                <div className='w-[1px] h-5 bg-black/10'></div>
                
                <button onClick={() => handleAddFilter()} className={`flex items-center gap-1.5 px-3 py-1 rounded-full hover:cursor-pointer hover:bg-gray-100`}>
                    <LuSettings2 className={`text-black/60`}/>
                    <p className={`text-sm text-black/70 font-medium`}>Add Filters {filter[activeSheet]?.length > 0 && (filter[activeSheet]?.every(val => val.column && val.operator && val.value && val.operand)) ? '('+filter[activeSheet]?.length + ')' : ''}</p>
                </button>

                <div className='w-[1px] h-5 bg-black/10'></div>
                
                {
                    !showSearch &&
                    <button onClick={() => setShowSearch(true)} className={`flex items-center gap-1.5 px-3 py-1 rounded-full hover:cursor-pointer hover:bg-gray-100`}>
                        <FiSearch className={`text-black/60`}/>
                        <p className={`text-sm text-black/70 font-medium`}>Search</p>
                    </button>
                }

                {
                    showSearch && 
                    <div className='outline-1 relative flex-1 ml-4 outline-black/10 px-3 h-9 flex items-center rounded-lg'>
                        <CiSearch className='absolute text-black/60 text-lg'/>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Your Data...' className='pl-6 w-full min-w-80 text-sm focus:outline-0'/>
                        {
                            searchTerm.length > 0 &&
                            <button onClick={() => setSearchTerm('')} className='text-black/50 hover:bg-gray-100 p-1 rounded-lg hover:cursor-pointer'>
                                <RxCross2 />
                            </button>
                        }
                        {
                            
                            <button onClick={() => setShowSearch(false)} className='text-black/50 hover:bg-gray-100 p-1 rounded-lg hover:cursor-pointer'>
                                <GoSidebarCollapse />
                            </button>
                        }
                    </div>
                }
            </div>
            {
                <div className={`flex items-center gap-1 px-2 ${columns.length === 0 && 'hidden'}`}>
                    <div className='flex items-center gap-2 flex-wrap'>
                        
                        <div className='flex items-center gap-2 flex-wrap outline-1 outline-black/10 p-1 rounded-lg bg-gray-50'>
                        {
                            rowSelectionPanel?.map((item, index) => {
                                const Icon = item.icon
                                const isTabSelected = selectedRowTab === item.id
                                return (
                                <div key={item.id} className='flex items-center gap-2 flex-wrap'>
                                        <button onClick={() => item.handler(item.id)} className={`flex items-center gap-1.5 px-3 py-1 rounded-md hover:cursor-pointer hover:bg-gray-100 ${isTabSelected ? 'bg-white outline-1 outline-black/10' : ''}`}>
                                            <Icon className={`${isTabSelected ? 'text-green-600' :'text-black/40'}`}/>
                                            <p className={`text-sm ${isTabSelected ? 'text-black/70' : 'text-black/40'}`}>{item.title}</p>
                                            <p className={`text-sm font-medium ${isTabSelected ? 'text-green-600' : 'text-black/40'}`}>{item.count}</p>
                                        </button>
                                    { item.id < rowSelectionPanel.length && <div className='w-[1px] h-5 bg-black/10'></div>}
                                </div>
                            )})
                        }
                        </div>

                        {/* <div className='w-[1px] h-5 bg-black/10'></div> */}

                    </div>
                </div>
            }
             </div>
        </div>
        
        {
            columns.length === 0 &&
            <div className='flex'>
                <p className='mt-8 bg-red-100 text-red-700 font-medium py-1.5 px-3 rounded-full text-sm'>
                    ⓘ No columns available. Please upload a valid data file.
                </p>
            </div>
        }


    <div className={`flex-1 min-h-0 flex flex-col justify-between overflow-hidden mb-3 border-l-1 border-r-1 border-b-1 border-gray-200 ${columns.length === 0 && 'hidden'}`}>
        <div className='h-full overflow-auto'>
            <table className='w-full border-separate border-spacing-0'>
                <thead>
                        <tr className=''>
                        {
                            visibleColumns?.filter(val => val?.ishidden === false).map((col, ind) => {
                                return (
                                    <SymbolColumn 
                                        key={col.name+ind} 
                                        index = {ind} 
                                        title={col.title} 
                                        columnType = {col.type} 
                                        isFrozen = {frozenColumn === col.title} 
                                        isSorted = {sortOrder?.name === col.title}
                                        setDraggedColumn = {setDraggedColumn} 
                                        handleDrop={handleDrop}
                                    />
                                )
                            })
                        }
                        </tr>
                </thead>
                <tbody>
                {
                   paginatedData?.map((rows, index) => {
                    const isSelectedRow = selectedRows[activeSheet]?.some((val) => val === rows._id)
                    return (
                        <tr onClick={() => rowSelection(rows)} key={rows._id} className={`hover:bg-green-50 ${isSelectedRow ? 'bg-green-100' : ''}`}>

                            {
                                visibleColumns?.filter(val => val?.ishidden === false).map((item, inde) => {
                                    return (
                                        <td key={inde} className={` ${frozenColumn === item.name ? 'sticky left-0 z-20 bg-white' : ''}  px-6 py-3 text-xs font-medium border-b-1 border-r-1 text-black/70 border-gray-200`}>
                                            {item.type === 'system' && <p title={rows[item.name]} className='max-w-120 truncate'>{rows[item.name]}</p>}
                                            {item.name === '_id' && rows._id}
                                            {item.name === '_chkbox' && (isSelectedRow ? <FaSquareCheck className='text-lg text-green-600'/> : <FiSquare className='text-lg text-black/10'/>)}
                                            {item.name === '_info' && <button onClick={(e) => {e.stopPropagation(); setSelectedRow(rows); setOpenView(true)}} title='View in detail' className='hover:cursor-pointer'><CgEye className='text-base text-green-600'/></button>}
                                        </td>
                                    )
                                })
                            }
                        </tr>)})
                }
                        
                </tbody>
            </table>
            {
                data.length === 0 && 
                <div className='flex items-center text-sm mt-4 justify-center p-4 text-black/70'>
                    {
                        Object.keys(sheets)?.length > 0 ? 
                        <p>No records to display in "{activeSheet}". This sheet doesn't contain any data rows.</p>
                        : <p>No records to display in "{activeSheet}". Your file doesn't contain any data rows.</p>
                    }
                </div>
            }

            {
                (rowFilteredData.length === 0 && selectedRowTab === 2) &&
                <div className='flex items-center text-sm mt-4 justify-center p-4 text-black/70'>
                    <p>Select one or more rows to see them here.</p>
                </div>
            }

            {
                (rowFilteredData.length === 0 && selectedRowTab === 3) &&
                <div className='flex items-center text-sm mt-4 justify-center p-4 text-black/70'>
                    <p>There are no unselected rows to display.</p>
                </div>
            }

            {
                (searchTerm && searchedData.length === 0) && 
                <div className='flex items-center text-sm mt-4 justify-center p-4 text-black/70'>
                    {
                        data.length > 0 && <p>No matching records found in "{activeSheet}" for "{searchTerm}"</p>
                    }
                </div>
            }

            {
                (filter[activeSheet]?.length > 0 && filteredData.length === 0) && 
                <div className='flex items-center text-sm mt-4 justify-center p-4 text-black/70'>
                    {
                        data.length > 0 && <p>No matching records found in "{activeSheet}" for the applied filters</p>
                    }
                </div>
            }

        </div>

        {/* pagination */}
        <div className='px-3 py-3 flex items-center justify-between border-t-1 border-black/10'>

            <div className='flex items-center'>
                <button onClick={goToFirstPage} disabled={currentPage === 1} className={`p-2 rounded-l-md text-sm border-1 border-gray-300 hover:cursor-pointer hover:bg-gray-100 ${currentPage === 1 ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAnglesLeft />
                </button>
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className={`p-2 text-sm rounded-r-md outline-1 outline-gray-300 hover:cursor-pointer hover:bg-gray-100 ${currentPage === 1 ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAngleLeft />
                </button>
                
                <div className='flex flex-wrap items-center gap-2 px-3'>

                    {
                        paginationViewPages.map((page) => (
                            <button onClick={() => setCurrentPage(page)} key={page} className={`p-2 w-7.5 h-7.5 flex rounded-lg items-center hover:cursor-pointer justify-center ${(currentPage == page) ? 'bg-green-600 text-green-100 font-semibold text-base' : 'text-black/80 text-sm'}`}>
                                <p>{page}</p>
                            </button>
                        ))
                    }
                    
                    {
                        (currentPage < paginationPages[paginationPages.length-1] && (currentGroupPage !== totalGroups-1) ) &&
                        <div className='flex items-end ml-1 gap-1'>
                            <BsThreeDots className='text-black/70 mb-0.5'/>
                            <button onClick={() => goToLastPage()} className={`p-2 w-7.5 h-7.5 flex rounded-md items-center hover:cursor-pointer justify-center text-black/80 text-sm`}>
                                <p>{paginationPages[paginationPages.length-1]}</p>
                            </button>
                        </div>
                    }

                </div>
                
                <button onClick={goToNextPage} disabled={(currentPage === totalPages || data.length === 0)} className={`p-2 rounded-l-md text-sm hover:cursor-pointer border-1 border-gray-300 hover:bg-gray-100 ${(currentPage === totalPages || data.length === 0) ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAngleRight />
                </button>
                <button onClick={goToLastPage} disabled={(currentPage == totalPages || data.length === 0)} className={`p-2 rounded-r-md text-sm hover:cursor-pointer outline-1 outline-gray-300 hover:bg-gray-100 ${(currentPage === totalPages || data.length === 0) ? 'text-black/15' : 'text-black/50'}`}>
                    <FaAnglesRight />
                </button>
            </div>

            <div className='flex items-center gap-4'>
                
                {
                    data?.length > 0 &&
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
                }
                
                <div className='w-[2px] h-7 bg-black/10'></div>
                <div>
                    {
                        data.length > 0 ? 
                        <p className='text-sm'>Rows {startIndex + 1} - {endRow} of {filteredData.length}</p>
                        :
                        <p className='text-sm'>Rows 0 - 0 of 0</p>
                    }
                </div>

            </div>

        </div>

    </div>
    </>
  )
}

export default Grid