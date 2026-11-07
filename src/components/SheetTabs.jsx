import React, { useState } from 'react'
import useDataStore from '../store/dataStore'
import { LuSheet } from "react-icons/lu";
import { PiGridFourDuotone } from "react-icons/pi";
import { MdReportProblem } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretLeft } from "react-icons/fa6";

const SheetTabs = () => {
    const sheets = useDataStore((state) => state.sheets)
    const activeSheet = useDataStore((state) => state.activeSheet)
    
    const setColumns = useDataStore((state) => state.setColumns)
    const setData = useDataStore((state) => state.setData)
    const setSheets = useDataStore((state) => state.setSheets)
    const setActiveSheet = useDataStore((state) => state.setActiveSheet)
    const selectedRowTab = useDataStore((state) => state.selectedRowTab)
    const setSelectedRowTab = useDataStore((state) => state.setSelectedRowTab)
    const setSortOrder = useDataStore((state) => state.setSortOrder)

    const [currentPageGroup, setCurrentPageGroup] = useState(0)
    const pageNames = Object.keys(sheets)
    const pageSize = 3

    const totalGroups = Math.ceil((pageNames.length) / pageSize)

    const startIndex = currentPageGroup * pageSize
    const endIndex = startIndex + pageSize
    const pagableSheet = pageNames.slice(startIndex, endIndex)

    const goToNextGroup = () => {
        setCurrentPageGroup((prev) => Math.min(prev + 1, totalGroups - 1))
    }

    const goToPrevGroup = () => {
        setCurrentPageGroup((prev) => Math.max(prev - 1, 0))
    }

    const handleSheetChange = (sheetName) => {
        const selectedSheet = sheets[sheetName]
        setSelectedRowTab(1)
        setActiveSheet(sheetName)
        setColumns(selectedSheet.columns)
        setData(selectedSheet.data)
        setSortOrder(null)
    }

  return (
    <div className={`${(currentPageGroup > 0) || (currentPageGroup < totalGroups -1) ? 'px-1' : 'px-0.5'} py-0.5 rounded-lg flex flex-wrap relative items-center gap-2 bg-gray-50 min-w-60 outline-1 outline-black/10`}>
            {
                currentPageGroup > 0 &&
                <button onClick={goToPrevGroup} className='text-black/40 hover:bg-gray-100 p-2 rounded-xl hover:cursor-pointer'>
                    <FaCaretLeft />
                </button>
            }
            <div className='flex items-center gap-2 flex-wrap'>
                {
                    pagableSheet.map((sheetName, ind) => (
                        <div key={sheetName+ind} className='flex flex-col items-center'>
                            <button title={sheetName} key={sheetName} onClick={() => handleSheetChange(sheetName)} className={`py-1.5 px-3  flex text-xs items-center gap-1 rounded-md ${activeSheet == sheetName ? 'bg-white font-medium outline-1 outline-black/10' : 'text-black/70'} hover:cursor-pointer`}>
                                <p className='mix-w-10 max-w-30 truncate'>{sheetName}</p>
                                <p>({sheets[sheetName]?.rows})</p>
                            </button>
                        </div>
                    ))
                }
            </div>
            {
                currentPageGroup < totalGroups -1 &&
                <button onClick={goToNextGroup} className='text-black/40 hover:bg-gray-100 p-2 rounded-xl hover:cursor-pointer'>
                    <FaCaretRight />
                </button>
            }
    </div>
  )
}

export default SheetTabs