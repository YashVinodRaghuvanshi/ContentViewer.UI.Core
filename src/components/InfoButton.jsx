import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const InfoButton = ({Icon, title, desc, handleOnClick, bgColor}) => {
  return (
    <button onClick={handleOnClick} className='relative text-base flex flex-col items-start gap-2 font-medium mt-10 hover:cursor-pointer hover:shadow-lg text-black/70 outline-1 py-6 px-7 rounded-2xl outline-black/10'>
        <div className={`${bgColor} p-2.5 rounded-xl`}>
            {Icon}
        </div>
        <div className='flex flex-col items-start gap-1 mt-2'>
            <p className='text-base font-medium'>{title}</p>
            <p className='text-sm text-black/50'>{desc}</p>
        </div>
        <div className='absolute right-5'>
            <MdArrowOutward className='text-black/40' size={24}/>
        </div>
    </button>
  )
}

export default InfoButton