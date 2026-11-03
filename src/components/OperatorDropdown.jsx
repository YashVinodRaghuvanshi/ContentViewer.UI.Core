import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";

const OperatorDropdown = ({displayList = [], hint, id, tempFilter, setTempFilter}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [menuSearch, setMenuSearch] = useState('')

    const searchableList = menuSearch ? displayList?.filter(val => val?.name?.toLowerCase().includes(menuSearch?.toString().toLowerCase())) : displayList
    const setOperandValue = (operand) => {
         const operandValue = tempFilter.map((val, ind) => {
            if(val.id == id) {
                return ({
                    ...val,
                    operand: operand
                })
            }

            return val;
         })

         setTempFilter(operandValue)
         setOpenMenu(false);
    }

  return (
    <>
        {
            openMenu &&
            <div onClick={() => {setOpenMenu(false); setMenuSearch('')}} className='w-screen h-screen inset-0 absolute z-10'></div>
        }
        <div className='relative'>
            <button onClick={() => setOpenMenu(true)} className='text-xs outline-1 flex items-center gap-1 outline-black/30 rounded-full px-1.5 py-0.5'>
                <p className='text-xs text-black/70'>{hint}</p>
                <FaAngleDown className='text-black/30 text-xs'/>
            </button>
            {
                openMenu &&
                <div className='min-w-15 bg-white outline-1 flex flex-col outline-black/10 shadow-md absolute mt-1 rounded-md z-30'>
                    
                    <div className='flex flex-col gap-0.5 py-1.5 px-1.5 max-h-40 overflow-y-auto'>
                        {
                            searchableList?.map((val, ind) => {
                                return (
                                    <button onClick={() => setOperandValue(val.name)} className={`px-1.5 py-1 rounded-sm flex hover:bg-gray-100 hover:cursor-pointer ${hint == val.name ? 'bg-green-100 hover:bg-green-100 text-green-700' : 'text-black/70'}`}>
                                        <p className='text-xs'>{val.name}</p>
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

export default OperatorDropdown