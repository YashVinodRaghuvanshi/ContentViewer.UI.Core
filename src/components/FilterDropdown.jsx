import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";

const FilterDropdown = ({displayList = [], hint, id, value, tempFilter, setTempFilter}) => {
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
                        column: value
                    })
                }
                else if(id.split('_')[1] == 'operator') {
                    return ({
                        ...val,
                        operator: value
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
            <button onClick={() => setOpenMenu(true)} className='flex items-center gap-2 justify-between outline-1 outline-black/20 px-2.5 py-1.5 rounded-md bg-white'>
                <p className='text-xs text-black/70'>{value === null ? hint : value}</p>
                <FaAngleDown className='text-black/30 text-xs'/>
            </button>
            {
                openMenu &&
                <div className='min-w-40 bg-white outline-1 flex flex-col outline-black/10 shadow-md absolute mt-1 rounded-md z-30'>
                    <div className='w-full flex items-center relative border-b-1 border-black/10 px-1 py-1'>
                        <RiSearchLine className='text-xs text-black/50 absolute ml-1'/>
                        <input
                            value={menuSearch}
                            onChange={(e) => setMenuSearch(e.target.value)}
                            type="text" 
                            placeholder='Search...' 
                            className='w-full text-xs pl-5 py-1 focus:outline-0'
                        />
                    </div>
                    <div className='flex flex-col gap-0.5 py-1.5 px-1.5 max-h-40 overflow-y-auto'>
                        {
                            searchableList?.map((val, ind) => {
                                return (
                                    <button onClick={() => setValueForDropdowns(val.name)} className='px-1.5 py-1 rounded-sm flex hover:bg-gray-100 hover:cursor-pointer'>
                                        <p className='text-xs text-black/70'>{val.name}</p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default FilterDropdown