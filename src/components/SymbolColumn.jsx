import React from 'react'
import { IoAtOutline } from "react-icons/io5";
import { PiArrowBendRightUpDuotone } from "react-icons/pi";
import { PiArrowBendRightDownDuotone } from "react-icons/pi";
import { PiArrowDownRightDuotone } from "react-icons/pi";
import { PiArrowElbowRightDownDuotone } from "react-icons/pi";
import { PiHandGrabbingDuotone } from "react-icons/pi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { PiSelectionDuotone } from "react-icons/pi";
import { PiCursorClickDuotone } from "react-icons/pi";
import { PiSelectionForegroundDuotone } from "react-icons/pi";
import { HiOutlineCursorClick } from "react-icons/hi";
import { PiListNumbersDuotone } from "react-icons/pi";
import { GoNumber } from "react-icons/go";
import { MdOutlineNumbers } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowUnsorted } from "react-icons/ti";
import { LiaArrowsAltVSolid } from "react-icons/lia";
import { LiaArrowUpSolid } from "react-icons/lia";
import { LiaArrowDownSolid } from "react-icons/lia";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineLockOpen } from "react-icons/hi2";

import { LuView } from "react-icons/lu";
import { IoInformationOutline } from "react-icons/io5";
import useDataStore from '../store/dataStore';

const SymbolColumn = ({isSorted, isFrozen, columnType, title, index, setDraggedColumn, handleDrop}) => {
    const sortOrder = useDataStore((state) => state.sortOrder)
    const setSortOrder = useDataStore((state) => state.setSortOrder)
    const activeSheet = useDataStore((state) => state.activeSheet)
    const frozenColumn = useDataStore((state) => state.frozenColumn)
    const setFrozenColumn = useDataStore((state) => state.setFrozenColumn)

    const handleFreezeColumn = (columnName) => {
        if (frozenColumn?.[activeSheet] === columnName) {
            setFrozenColumn({...frozenColumn, [activeSheet]: null})
        }
        else {
            setFrozenColumn({...frozenColumn, [activeSheet]: columnName})
        }
    }
    
    const handleSortOrder = (columnName) => {
        
        if(sortOrder?.[activeSheet]?.name === columnName && sortOrder?.[activeSheet]?.order === 'asc') {
            setSortOrder({...sortOrder, [activeSheet]: {name: columnName, order: 'desc'}})
        }
        else if(sortOrder?.[activeSheet]?.name === columnName && sortOrder?.[activeSheet]?.order === 'desc') {
            setSortOrder({...sortOrder, [activeSheet]: null})
        }
        else {
            setSortOrder({...sortOrder, [activeSheet]: {name: columnName, order: 'asc'}})
        }
    }

    return (
    <td 
        draggable
        onDragStart={() => setDraggedColumn(index)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop(index)}
        className={`px-6 border-r-1 py-2 ${isSorted ? 'bg-green-50' : ''} ${isFrozen ? 'sticky left-0 z-20 bg-green-50' : ''} ${title === '_chkbox' ? 'w-10' : ''} ${(title === '_id' ? 'w-20' : '')} ${(title === '_info' ? 'w-10' : '')} bg-gray-50 whitespace-nowrap sticky border-t-1 border-b-1 border-gray-200/80 top-0 z-10 text-xs text-black/70 font-medium`}
      >
        {
          columnType === 'system' && 
            <div onClick={() => handleSortOrder(title)} className='flex items-center gap-3'>
                
                <button className='hover: cursor-pointer' title={frozenColumn === title ? 'Column Locked' : 'Column Unlocked'} onClick={(e) => {e.stopPropagation(); handleFreezeColumn(title);}}>
                    {
                        isFrozen ? 
                        <HiOutlineLockClosed
                            className={frozenColumn?.[activeSheet] === title ? 'text-green-600' : 'text-black/40'}
                        />
                        :
                        <HiOutlineLockOpen
                            className={`text-black/40`}
                        />
                    }
                    
                </button>
                
                {title[0]?.toUpperCase() + title?.slice(1)?.toLowerCase() || ''}
                {(sortOrder?.[activeSheet]?.name === title && sortOrder?.[activeSheet]?.order === 'asc') ? <LiaArrowDownSolid title='Ascending' className='text-green-700'/> : 
                    (sortOrder?.[activeSheet]?.name === title && sortOrder?.[activeSheet]?.order === 'desc') ? <LiaArrowUpSolid title='Descending' className='text-green-700'/> : <LiaArrowsAltVSolid title='Unsorted' className='text-black/50'/>}
            </div>
        }

        {
            title === '_chkbox' && 
            <div className='flex items-center gap-1'>
                <HiOutlineCursorClick className='text-lg text-black/50'/>
            </div>
        }

        {
            title == '_id' &&
            <div className='flex items-center gap-1'>
                <MdOutlineNumbers className='text-lg text-black/50'/>
            </div>
        }

        {
            title == '_info' &&
            <div className='flex items-center gap-1'>
                <IoInformationOutline className='text-lg text-black/50'/>
            </div>
        }
    </td>
  )
}

export default SymbolColumn