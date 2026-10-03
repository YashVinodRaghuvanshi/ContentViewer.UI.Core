import React from 'react'
import { IoAtOutline } from "react-icons/io5";
import { PiArrowBendRightUpDuotone } from "react-icons/pi";
import { PiArrowBendRightDownDuotone } from "react-icons/pi";
import { PiArrowDownRightDuotone } from "react-icons/pi";
import { PiArrowElbowRightDownDuotone } from "react-icons/pi";
import { PiHandGrabbingDuotone } from "react-icons/pi";

const SymbolColumn = ({title}) => {
  return (
    <td className={`px-6 py-2 bg-gray-50 outline-1 outline-black/10 sticky top-0 z-10 text-xs font-medium`}>
        <div className='flex items-center gap-1'>
            {title}
            <PiArrowElbowRightDownDuotone className='text-lg text-black/40'/>
        </div>
    </td>
  )
}

export default SymbolColumn