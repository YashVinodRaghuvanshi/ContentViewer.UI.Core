import React from 'react'
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TbFileNeutralFilled } from "react-icons/tb";

const FileCard = ({selectedFileInfo, setFileUploaded, type, className, invalid = false}) => {
  return (
    <div className={`flex items-start gap-4 outline-1 py-3 px-3.5 rounded-xl outline-black/10 shadow-lg ${className}`}>
        <div className='flex items-center gap-2'>
            {
                !invalid && (type == 'xlsx' || type == 'xls') &&
                <BsFillFileEarmarkExcelFill className='text-green-600 text-4xl'/>
            }

            {
                (!invalid && type == 'csv') &&
                <FaFileCsv className='text-green-600 text-4xl'/>
            }

            {
                (invalid) &&
                <TbFileNeutralFilled className='text-red-600 text-4xl'/>
            }

            <div>
                <p className='font-medium'>{selectedFileInfo?.name || ''}</p>
                <p className='text-black/60 text-sm'>{selectedFileInfo?.size || ''}</p>
            </div>
        </div>
        <button onClick={() => setFileUploaded(false)} className='my-1 mx-2 text-black/60 hover:cursor-pointer'>
            <RxCross2/>
        </button>
    </div>
  )
}

export default FileCard