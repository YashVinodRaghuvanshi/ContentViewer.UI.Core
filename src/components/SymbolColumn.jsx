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

const SymbolColumn = ({columnType, title, index, setDraggedColumn, handleDrop}) => {
  return (
    <td 
        draggable
        onDragStart={() => setDraggedColumn(index)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop(index)}
        className={`px-6 py-2 ${title === '_chkbox' ? 'w-10' : (title === '_id' && 'w-20')} bg-gray-50 whitespace-nowrap sticky border-t-1 border-b-1 border-gray-200/80 top-0 z-10 text-xs text-black/70 font-medium`}
      >
        {
          columnType === 'system' && 
            <div className='flex items-center gap-1'>
                {title[0].toUpperCase() + title.slice(1).toLowerCase() || ''}
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
    </td>
  )
}

export default SymbolColumn