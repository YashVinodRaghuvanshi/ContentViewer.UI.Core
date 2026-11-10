import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";

const RowDropdown = ({displayList = [], hint, selectedRowTab, id, value, tempFilter, setTempFilter}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [menuSearch, setMenuSearch] = useState('')

    const searchableList = menuSearch ? displayList?.filter(val => val?.name?.toLowerCase().includes(menuSearch?.toString().toLowerCase())) : displayList
    const setValueForDropdowns = (value) => {
        const filterVal = tempFilter.map((val, ind) => {
            const dropdownId = id.split('_')[0]
            if(val.id == dropdownId) {
                if(id.split('_')[1] == 'column') {
                    return ({
                        ...val,
                        column: value,
                        datatype: null,
                        operator: null,
                        value: null
                    })
                }
                else if(id.split('_')[1] == 'operator') {
                    return ({
                        ...val,
                        operator: value,
                        value: value === 'Is Empty' || value === 'Is Not Empty' ? 'Empty' : null
                    })
                }
                else if(id.split('_')[1] == 'datatype') {
                    return ({
                        ...val,
                        datatype: value,
                        operator: null,
                        value: null
                    })
                }
            }

            return val;
        })

        setTempFilter(filterVal)
        setOpenMenu(false)
    }

  return (
    <>
        {
            openMenu &&
            <div onClick={() => {setOpenMenu(false); setMenuSearch('')}} className='w-screen h-screen inset-0 absolute z-10'></div>
        }
        <div className='relative'>
            {
                searchableList?.filter(val => val.id === selectedRowTab).map((item, index) => {
                    const Icon = item.icon
                    return (
                        <button key={item.id} onClick={() => setOpenMenu(true)} className={`flex items-center gap-1.5 px-3 py-1 rounded-md hover:cursor-pointer hover:bg-gray-100 bg-white`}>
                            <Icon className={`text-black/60`}/>
                            <p className={`text-sm text-black/70 font-medium`}>{item.title}</p>
                            <p className={`text-sm text-black/70 font-medium`}>({item.count})</p>
                            <FaAngleDown className='text-black/50 text-xs'/>
                        </button>
                    )
                })
            }
            {
                openMenu &&
                <div className='min-w-50 bg-white outline-1 flex flex-col outline-black/10 shadow-md absolute mt-1 rounded-md z-30'>
                    
                    <div className='flex flex-col gap-1 py-2.5 px-1.5 max-h-40 overflow-y-auto'>
                        {
                            searchableList?.map((item) => {
                                const Icon = item.icon
                                    const isTabSelected = selectedRowTab === item.id
                                    return (
                                    <div key={item.id} className='flex items-center text-start gap-2 flex-wrap'>
                                            <button onClick={() => {item.handler(item.id); setOpenMenu(false);}} className={`w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-md hover:cursor-pointer hover:bg-gray-100 ${isTabSelected ? 'bg-green-50' : ''}`}>
                                                <div className='flex items-center gap-1.5'>
                                                    <Icon className={`${isTabSelected ? 'text-green-600' :'text-black/40'}`}/>
                                                    <p className={`text-sm ${isTabSelected ? 'text-black/70' : 'text-black/40'}`}>{item.title}</p>
                                                </div>
                                                <p className={`text-sm font-medium ${isTabSelected ? 'text-green-600' : 'text-black/40'}`}>{item.count}</p>
                                            </button>
                                    </div>
                            )})
                        }
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default RowDropdown