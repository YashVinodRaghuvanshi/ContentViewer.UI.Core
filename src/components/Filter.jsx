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
import { PiSelectionDuotone } from "react-icons/pi";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { MdOutlineBorderClear } from "react-icons/md";
import { PiAlignCenterHorizontalSimpleDuotone } from "react-icons/pi";
import { BsPlusSquare } from "react-icons/bs";
import { PiPlusDuotone } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { TbFilterPlus } from "react-icons/tb";
import { FiFilter } from "react-icons/fi";
import { SlPlus } from "react-icons/sl";
import { HiPlus } from "react-icons/hi";
import FilterDeletePopup from './FilterDeletePopup';

const Filter = ({setOpenFilter}) => {

    const activeSheet = useDataStore((state) => state.activeSheet)
    const [clearFilter, setClearFilter] = useState(false)
    const selectedColumn = useDataStore((state) => state.selectedColumn)
    const filter = useDataStore((state) => state.filter)
    const setFilter = useDataStore((state) => state.setFilter)
    const [tempFilter, setTempFilter] = useState(filter[activeSheet] || [])
    const [nullValue, setNullValue] = useState(-1)
    const [draggedItem, setDraggedItem] = useState(null)

    const closePopup = () => {
        setOpenFilter(false)
    }

    const handleDropInFIlter = (droppedIndex) => {
        const dragableFilter = [...tempFilter]
        const [draggedFilter] = dragableFilter.splice(draggedItem, 1)
        dragableFilter.splice(droppedIndex, 0, draggedFilter)
        setTempFilter(dragableFilter)
    }

    const addWhereFilter = () => {

        const pickedIndex = tempFilter.length - 1

        if(tempFilter.length > 0 && tempFilter[pickedIndex]?.value == null) {
            setNullValue(tempFilter[pickedIndex]?.id)
            return
        }

        setTempFilter([...tempFilter, {
                id: Date.now(),
                column:null,
                datatype:null,
                operator:null,
                value:null,
                operand: 'And'
            }
        ])

        setNullValue(-1)
    }

    const clearAllFilter = () => {
        setTempFilter([])
    }

    const isEmptyVal = (value) => {
        return value === null || value === undefined || String(value).trim() === ""
    }

    const applyFilter = () => {
        const pickedIndex = tempFilter.length - 1

        const isAnyFilterValueEmpty = tempFilter.some(val => isEmptyVal(val.value))
        const filterHavingValueEmptyList = tempFilter.filter(val => isEmptyVal(val.value))

        if(tempFilter.length > 0 && isAnyFilterValueEmpty) {
            setNullValue(filterHavingValueEmptyList?.[0]?.id)
            return
        }

        setFilter({
            ...filter,
            [activeSheet]: tempFilter
        })

        closePopup()
    }


  return (
    <div className='w-screen h-screen bg-black/30 inset-0 absolute z-30 flex items-center justify-center'>
        <div className='px-4 py-2 bg-white outline-1 outline-black/10 w-180 rounded-2xl shadow-lg'>
            <div className='p-2 border-b-1 border-black/10 flex items-center justify-between'>
                <p className='font-medium text-lg text-black/80'>Filters</p>
                <button onClick={closePopup} className='hover:cursor-pointer'>
                    <RxCross2 className='text-xl text-black/60'/>
                </button>
            </div>

            {clearFilter && <FilterDeletePopup setOpenFilter={setClearFilter} handleFileRemoved={clearAllFilter} fromBulkDelete = {'bulkDelete'}/>}

            <div className='flex flex-col items-start gap-2.5 pt-6 pb-3'>
                {
                    tempFilter?.map((val, ind) => {
                        return (
                            <FilterHandle
                                setDraggedItem = {setDraggedItem}
                                onDrop = {handleDropInFIlter}
                                key={val?.id}
                                ind = {ind}
                                id = {val?.id}
                                column = {val?.column}
                                datatype = {val?.datatype}
                                operator = {val?.operator}
                                value = {val?.value} 
                                operatorIsHide = {ind == 0}
                                tempFilter = {tempFilter}
                                setTempFilter = {setTempFilter}
                                operand = {val?.operand}
                                showValidation = {nullValue == val?.id}
                            />
                        )
                    })
                }

                {
                    tempFilter.length === 0 &&
                    <div className='w-full flex items-center justify-center mb-4'>
                        <div className='w-110 flex flex-col items-center text-center gap-1.5'>
                            <div className='text-2xl p-3 text-green-600 bg-green-100 rounded-2xl mb-2'>
                                <FiFilter />
                            </div>
                            <p className='text-base text-black/90'>All filters cleared</p>
                            <p className='text-sm text-black/50'>Your filters have been removed. All records are now displayed. You can add new filters anytime.</p>
                            <button onClick={() => addWhereFilter()} className='text-sm outline-1 mt-4 flex items-center gap-1 outline-black/10 px-3 py-1 text-green-700 hover:cursor-pointer rounded-full'>
                                <HiOutlinePlus/>
                                Add condition
                            </button>
                        </div>
                    </div>
                }

                {
                    tempFilter.length > 0 &&
                    <div className='flex items-center gap-1 px-2 py-2 mt-2'>
                        <HiArrowTurnDownRight className='text-black/40'/>
        
                        <div className='flex items-center gap-2'>
                            <button onClick={() => addWhereFilter()} className='flex items-center gap-1.5 px-1.5 rounded-sm hover:cursor-pointer hover:bg-gray-100'>
                                <HiOutlinePlus className='text-black/70'/>
                                <p className='text-sm text-black/70 '>Add condition</p>
                            </button>
        
                            <div className='w-[1px] h-5 bg-black/10'></div>
        
                            <button  onClick={() => setClearFilter(true)} className='flex items-center gap-1.5 px-1.5 rounded-sm  hover:cursor-pointer hover:bg-gray-100'>
                                <MdOutlineBorderClear className='text-black/70'/>
                                <p className='text-sm text-black/70'>Clear all</p>
                            </button>
                        </div>
                    </div>
                }

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