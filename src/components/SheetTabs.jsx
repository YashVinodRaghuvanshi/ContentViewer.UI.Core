import React from 'react'
import useDataStore from '../store/dataStore'
import { LuSheet } from "react-icons/lu";
import { PiGridFourDuotone } from "react-icons/pi";

const SheetTabs = () => {
    const sheets = useDataStore((state) => state.sheets)
    const activeSheet = useDataStore((state) => state.activeSheet)
    
    const setColumns = useDataStore((state) => state.setColumns)
    const setData = useDataStore((state) => state.setData)
    const setSheets = useDataStore((state) => state.setSheets)
    const setActiveSheet = useDataStore((state) => state.setActiveSheet)

    const handleSheetChange = (sheetName) => {
        const selectedSheet = sheets[sheetName]
        setActiveSheet(sheetName)
        setColumns(selectedSheet.columns)
        setData(selectedSheet.data)
    }

  return (
    <div className='bg-gray-50 my-4 p-1 rounded-xl flex items-center gap-2'>
        {
            Object.keys(sheets).map((sheetName, ind) => (
                <button key={sheetName} onClick={() => handleSheetChange(sheetName)} className={`px-4 py-2 flex items-center gap-2 text-sm rounded-lg ${activeSheet == sheetName ? 'bg-white outline-1 outline-black/10 font-medium shadow-sm' : 'text-black/70'} hover:cursor-pointer`}>
                    <PiGridFourDuotone  className={`text-xl ${activeSheet === sheetName ? 'text-green-600' : 'text-black/40'} `}/>
                    {sheetName} 
                    <div className={`text-black/50 px-1.5 ml-2 rounded-md ${activeSheet === sheetName ? 'bg-green-600 text-green-100' : 'bg-gray-400 text-green-100'}`}>{sheets[sheetName]?.rows}</div>
                </button>
            ))
        }
        
    </div>
  )
}

export default SheetTabs