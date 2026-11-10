import React, { useState } from 'react'
import { MdOutlineDragIndicator } from "react-icons/md";
import FilterDropdown from './FilterDropdown';
import { RiDeleteBinLine } from "react-icons/ri";
import useDataStore from '../store/dataStore';
import { IoIosArrowDown } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import OperatorDropdown from './OperatorDropdown';
import FilterDeletePopup from './FilterDeletePopup';

const FilterHandle = ({onDrop, setDraggedItem, ind, id = null, column = null, datatype = null, operator = null, value = null, operatorIsHide = false, tempFilter, setTempFilter, operand, showValidation}) => {
    const activeSheet = useDataStore((state) => state.activeSheet)
    const selectedColumn = useDataStore((state) => state.selectedColumn)
    const sheets = useDataStore((state) => state.sheets)
    const [openDeleteFilterHandle, setOpenDeleteFilterHandle] = useState(false)

    const operators = [
        {id:1, name: 'And'},
        {id:2, name: 'Or'},
    ]

    const columnList = (selectedColumn[activeSheet] || sheets[activeSheet]?.columns || [])?.filter(val => val.type === 'system')
    const dataTypeList = [
        {id:1, name: 'Text'},
        {id:2, name: 'Number'},
        {id:3, name: 'Date'},
    ]
    const operatorList = {
        'Text' : [
            {id:1, name: 'Equal'},
            {id:2, name: 'Not Equal'},
            {id:3, name: 'Contains'},
            {id:4, name: 'Does Not Contain' },
            {id:5, name: 'Starts With'},
            {id:6, name: 'Ends With'},
        ],
        'Number' : [
            {id:1, name: 'Equal'},
            {id:2, name: 'Not Equal'},
            {id:3, name: 'Greater Than'},
            {id:4, name: 'Less Than'},
            {id:5, name: 'Greater Than or Equal'},
            {id:6, name: 'Less Than or Equal'},
        ],
        'Date' : [
            {id:1, name: 'Equal'},
        ],
    }

    const setDynamicValue = (dynamicValue) => {
        const filterValue = tempFilter.map((val, ind) => {
            if (val.id == id) {
                return ({
                    ...val,
                    value: dynamicValue
                })
            }
            return val
        })

        setTempFilter(filterValue)
    }

    const handleRemoveFilter = (id) => {
        const deleteFilter = tempFilter.filter((val) => val.id != id)
        setTempFilter(deleteFilter)
    }

  return (
        <div className='w-full flex items-center gap-2'>
        
            {openDeleteFilterHandle && <FilterDeletePopup setOpenFilter={setOpenDeleteFilterHandle} handleFileRemoved={() => handleRemoveFilter(id)}/>}

            {!operatorIsHide && <OperatorDropdown id = {id} displayList={operators} hint={operand} tempFilter = {tempFilter} setTempFilter = {setTempFilter}/>}

            <div 
                draggable
                onDragStart={() => setDraggedItem(ind)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(ind)} 
                className='w-full flex flex-col gap-2'>

                <div className='w-full flex items-center outline-1 bg-gray-50 outline-black/10 rounded-md'>
                        
                    <div className='px-2 py-3 border-r-1 border-black/10'>
                        <MdOutlineDragIndicator className='text-black/30'/>
                    </div>

                    <div className='flex items-start flex-1 px-2 gap-2'>
                        <FilterDropdown key={id+'_column'} id = {id+'_column'} tempFilter = {tempFilter} setTempFilter = {setTempFilter} value = {column} displayList = {columnList} hint = {'Select column'}/>
                        {
                            column != null &&
                            <FilterDropdown key={id+'_datatype'} id = {id+'_datatype'} tempFilter = {tempFilter} setTempFilter = {setTempFilter} value = {datatype} displayList = {dataTypeList} hint = {'Select datatype'}/>
                        }
                        {
                            datatype != null &&
                            <FilterDropdown key={id+'_operator'} id = {id+'_operator'} tempFilter = {tempFilter} setTempFilter = {setTempFilter} value = {operator} displayList = {operatorList?.[datatype]} hint = {'Select operator'}/>
                        }
                        {
                            operator != null &&
                            <input value={value ?? ''} onChange={(e) => setDynamicValue(e.target.value)} type="text" className='outline-1 outline-black/20 px-2.5 py-1.5 text-xs rounded-md bg-white' placeholder='Search value'/>
                        }
                    </div>

                    <button onClick={() => setOpenDeleteFilterHandle(true)} className='px-2 py-3 border-l-1 hover:cursor-pointer border-black/10'>
                        <RiDeleteBinLine className='text-red-500'/>
                    </button>

                </div>

                 {
                    (showValidation && !value) && 
                    <div className='flex'>
                        <div className='flex items-center gap-1 px-2 py-1 rounded-lg outline-1 outline-red-200 text-red-600 bg-red-100'>
                            <RiErrorWarningLine />
                            <p className='text-xs'>Please enter a value.</p>
                        </div>
                    </div>
                }

            </div>

        </div>

       

  )
}

export default FilterHandle