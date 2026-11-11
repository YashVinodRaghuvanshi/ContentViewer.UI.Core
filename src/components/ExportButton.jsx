import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { CgSoftwareUpload } from "react-icons/cg";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import useDataStore from '../store/dataStore';
import exportCustomWorkspace from '../utils/exportWorkspaceUtils';

const ExportButton = ({displayList = [], hint, id, value, tempFilter, setTempFilter}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [menuSearch, setMenuSearch] = useState('')
    const sheets = useDataStore((state) => state.sheets)
    const [exportSelectedTab, setExportSelectedTab] = useState(2)
    const exportSelectionButton = [
        {
            id:1,
            name: 'This Sheet'
        },
        {
            id:2,
            name: `All Sheets: ${Object.keys(sheets ?? {})?.length}`
        }
    ]

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

    const exportWorkspace = () => {
        exportCustomWorkspace(exportSelectedTab)
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
               
                <button onClick={() => setOpenMenu(true)} className={`flex items-center gap-1.5 px-3 py-1 rounded-md hover:cursor-pointer hover:bg-gray-100 bg-white`}>
                    <CgSoftwareUpload className={`text-black/60`}/>
                    <p className={`text-sm text-black/70 font-medium`}>Export</p>
                    <FaAngleDown className='text-black/50 text-xs'/>
                </button>
                   
            }
            {
                openMenu &&
                <div className='min-w-60 bg-white outline-1 flex flex-col outline-black/10 shadow-md absolute mt-1 rounded-md z-30'>
                    
                    <div className='flex flex-col gap-1 py-1.5 px-1.5 overflow-y-auto'>
                        <div className='w-full flex items-center gap-1 p-0.5 bg-gray-100 outline-1 outline-black/10 mb-2 rounded-md'>
                            {
                                exportSelectionButton?.map((val, ind) => {
                                    const selectedTab = exportSelectedTab === val?.id
                                    return (
                                        <button 
                                            onClick={() => setExportSelectedTab(val?.id)} key={val?.id} 
                                            className={`text-xs flex-1 hover:cursor-pointer px-2 py-1 rounded-sm ${selectedTab ? 'bg-white outline-1 outline-black/10 text-black/90 font-medium' : 'text-black/40'}`}
                                        >
                                            {val?.name}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        {
                            searchableList?.map((item) => {
                                const Icon = item.icon
                                    return (
                                    <div key={item.id} className='flex items-center text-start gap-2 flex-wrap'>
                                            <button className={`w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-md`}>
                                                <div className='flex items-center gap-1.5'>
                                                    <Icon className={`text-black/80`}/>
                                                    <p className={`text-sm text-black/80`}>{item.title}</p>
                                                </div>
                                                {/* <p className={`text-sm font-medium text-black/60`}>{item.count}</p> */}
                                                <FaCheck className='text-sm text-black/40'/>
                                            </button>
                                    </div>
                            )})
                        }
                        <div className='border-t-1 border-black/10 mt-2'>
                            <button onClick={exportWorkspace} className={`w-full flex items-center gap-1.5 px-3 py-1 mt-1 rounded-md hover:cursor-pointer hover:bg-gray-100 bg-white`}>
                                <CgSoftwareUpload className={`text-black/80`}/>
                                <p className={`text-sm text-black/80`}>Export</p>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default ExportButton