import React from 'react'
import { IoAtOutline } from "react-icons/io5";
import { PiArrowBendRightUpDuotone } from "react-icons/pi";
import { PiArrowBendRightDownDuotone } from "react-icons/pi";
import { PiArrowDownRightDuotone } from "react-icons/pi";
import { PiArrowElbowRightDownDuotone } from "react-icons/pi";
import { PiHandGrabbingDuotone } from "react-icons/pi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { PiSelectionDuotone } from "react-icons/pi";
import { PiSelectionForegroundDuotone } from "react-icons/pi";

const SymbolColumn = ({columnType, title, index, setDraggedColumn, handleDrop}) => {
  return (
    <td 
        draggable
        onDragStart={() => setDraggedColumn(index)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop(index)}
        className={`px-6 py-2 ${title === '_chkbox' ? 'w-10' : (title === '_id' && 'w-20')} bg-gray-50 outline-1 outline-black/10 cursor-grab sticky top-0 z-10 text-xs font-medium`}
      >
        {
          columnType === 'system' && 
            <div className='flex items-center gap-1'>
                {title}
                <PiArrowElbowRightDownDuotone className='text-lg text-black/40'/>
            </div>
        }

        {
            title === '_chkbox' && 
            <div className='flex items-center gap-1'>
                <PiSelectionForegroundDuotone className='text-lg text-black/70'/>
            </div>
        }

        {
            title == '_id' &&
            <div className='flex items-center gap-1'>
                ID
            </div>
        }
    </td>
  )
}

export default SymbolColumn