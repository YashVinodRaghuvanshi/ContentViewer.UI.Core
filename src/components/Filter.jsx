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
import { SlPlus } from "react-icons/sl";
import { HiPlus } from "react-icons/hi";

const Filter = ({setOpenFilter}) => {

    const activeSheet = useDataStore((state) => state.activeSheet)
    const selectedColumn = useDataStore((state) => state.selectedColumn)
    const filter = useDataStore((state) => state.filter)
    const setFilter = useDataStore((state) => state.setFilter)
    const [tempFilter, setTempFilter] = useState(filter[activeSheet] || [])
    const [nullValue, setNullValue] = useState(-1)

    const closePopup = () => {
        setOpenFilter(false)
    }

    const addWhereFilter = () => {

        const pickedIndex = tempFilter.length - 1

        if(tempFilter.length > 0 && tempFilter[pickedIndex]?.value == null) {
            setNullValue(pickedIndex)
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

    const applyFilter = () => {
        const pickedIndex = tempFilter.length - 1

        if(tempFilter.length > 0 && tempFilter[pickedIndex]?.value == null) {
            setNullValue(pickedIndex)
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

            <div className='flex flex-col items-start gap-2.5 py-6'>
                {
                    tempFilter?.map((val, ind) => {
                        return (
                            <FilterHandle
                                key={val?.id}
                                id = {val?.id}
                                column = {val?.column}
                                datatype = {val?.datatype}
                                operator = {val?.operator}
                                value = {val?.value} 
                                operatorIsHide = {ind == 0}
                                tempFilter = {tempFilter}
                                setTempFilter = {setTempFilter}
                                operand = {val?.operand}
                                showValidation = {nullValue == ind}
                            />
                        )
                    })
                }

                <button onClick={() => addWhereFilter()} className='cursor-pointer flex items-center gap-1.5 mt-2 rounded-lg text-black/70 hover:bg-gray-100 px-2 py-0.5'>
                    <HiPlus className='text-xs'/>
                    <p className='text-xs'>Add condition</p>
                </button>

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