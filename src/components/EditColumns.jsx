import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { PiSelectionDuotone } from "react-icons/pi";
import { MdOutlineBorderClear } from "react-icons/md";
import { HiArrowTurnDownRight } from "react-icons/hi2";
import { HiEye } from "react-icons/hi";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GrDrag } from "react-icons/gr";
import { PiSparkleDuotone } from "react-icons/pi";

import useDataStore from '../store/dataStore';

const EditColumns = ({setOpenFilter}) => {

    const [showValidation, setShowValidation] = useState(false)
    const closePopup = () => {
        setOpenFilter(false)
    }

    const applyFilter = () => {
        if(localSelectedColumn.every(val => val.ishidden === true)) {
            return
        }

        setSelectedColumns({
            ...selectedColumn,
            [activeSheet]: localSelectedColumn
        })

        closePopup()
    }

    const sheets = useDataStore((state) => state.sheets)
    const activeSheet = useDataStore((state) => state.activeSheet)

    const [draggedItem, setDraggedItem] = useState(null)
    const columns = sheets[activeSheet]?.columns


    const [localSelectedColumn, setLocalSelectedColumn] = useState(columns)

    const selectedColumn = useDataStore((state) => state.selectedColumn)
    const setSelectedColumns = useDataStore((state) => state.setSelectedColumn)

    const handleSelection = (columnName, columnType) => {
        const visibilityMangedColumn = localSelectedColumn.map((val, ind) => {
            if(val.name === columnName) {
                return {
                    ...val,
                    ishidden: !val.ishidden
                }
            }

            return val
        })
        
        setLocalSelectedColumn(visibilityMangedColumn)

    }

    const selectAllFields = () => {
        setLocalSelectedColumn(columns)
    }

    const clearAllFields = () => {
        const setAllHidden = localSelectedColumn.map((val, ind) => {
            return ({
                ...val,
                ishidden: true
            })
        })

        setLocalSelectedColumn(setAllHidden)
    }

    const handleDropItem = (dropIndex) => {
        const newList = [...localSelectedColumn]
        const [dropItem] = newList.splice(draggedItem, 1)
        newList.splice(dropIndex, 0, dropItem)
        setLocalSelectedColumn(newList)

        setDraggedItem(null)
    }

    const visibilityFields = selectedColumn[activeSheet] !== undefined ? selectedColumn[activeSheet] : columns

    useEffect(() => {
        
        setLocalSelectedColumn(
            selectedColumn[activeSheet] || columns || []
        )
        
    }, [activeSheet, selectedColumn, columns])

    useEffect(() => {
        if(localSelectedColumn.every(val => val.ishidden === false))
            setShowValidation(false)
        else if (localSelectedColumn.every(val => val.ishidden === true)) {
            setShowValidation(true)
        }
        
    }, [localSelectedColumn])

    

  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-30 flex items-center justify-center'>
        <div className='px-4 py-2 bg-white outline-1 outline-black/10 w-160 rounded-2xl shadow-lg'>
            
            <div className='p-2 border-b-1 border-black/10 flex items-center justify-between'>
                <p className='font-medium text-lg text-black/80'>Manage Columns</p>
                <button onClick={closePopup} className='hover:cursor-pointer'>
                    <RxCross2 className='text-xl text-black/60'/>
                </button>
            </div>

            <div className='px-2 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Visible Columns</p>
                    <p className='text-xs text-black/50'>{localSelectedColumn.filter(val => val.ishidden == false).length} of {columns.length} Selected</p>
                </div>
                <div className='flex flex-wrap gap-3 mt-4'>
                    {
                        localSelectedColumn?.map((col, ind) => {
                            const isSelected = localSelectedColumn?.some((val) => val.name === col.name && val.ishidden === false)
                            
                            return (
                                <button 
                                    draggable
                                    onDragStart={() => setDraggedItem(ind)}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={() => handleDropItem(ind)} 
                                    key={col+ind} 
                                    onClick={() => handleSelection(col?.name, col?.type)} 
                                    className={` outline-1 ${isSelected ? 'outline-black/20 shadow-md' : 'text-black/50 outline-black/10'} flex items-center pl-3 pr-5 py-2 gap-2 rounded-xl text-xs hover:cursor-pointer`}>
                                    <GrDrag className='text-black/30'/>
                                    {
                                        isSelected ? <HiEye className='text-black/70 text-lg'/>  : <BsFillEyeSlashFill className='text-black/20 text-lg'/>
                                    }
                                    {col?.name[0]?.toUpperCase() + col?.name?.slice(1)?.toLowerCase()}

                                    {col?.info && <PiSparkleDuotone title={col?.info} className={`text-base ${isSelected ? 'text-green-600' : 'text-black/30'} `}/>}
                                </button>
                            )})
                    }
                </div>
            </div>

            <div className='flex items-center gap-1 px-2 py-4'>
                <HiArrowTurnDownRight className='text-black/40'/>

                <div className='flex items-center gap-2'>
                    <button onClick={selectAllFields} className='flex items-center gap-1.5 px-1.5 rounded-sm hover:cursor-pointer hover:bg-gray-100'>
                        <PiSelectionDuotone className='text-black/70'/>
                        <p className='text-sm text-black/70 '>Select all</p>
                    </button>

                    <div className='w-[1px] h-5 bg-black/10'></div>

                    <button onClick={clearAllFields} className='flex items-center gap-1.5 px-1.5 rounded-sm  hover:cursor-pointer hover:bg-gray-100'>
                        <MdOutlineBorderClear className='text-black/70'/>
                        <p className='text-sm text-black/70'>Clear all</p>
                    </button>
                </div>
            </div>

            {
                showValidation &&
                <div className='flex'>
                    <p className='my-2 bg-red-100 text-red-700 font-medium py-1.5 px-3 rounded-full text-sm'>
                        ⓘ Please select atleast one column.
                    </p>
                </div>
            }

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

export default EditColumns