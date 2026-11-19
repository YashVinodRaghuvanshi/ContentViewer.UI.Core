import React, { useEffect } from 'react'
import Grid from '../components/Grid'
import SheetTabs from '../components/SheetTabs'
import { HiOutlineSlash } from "react-icons/hi2";
import { CiViewTable } from "react-icons/ci";
import { RiHome6Line } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import useDataStore from '../store/dataStore';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const ViewData = () => {

    const filename = useDataStore((state) => state.filename)
    const navigate = useNavigate()

  return (
        <div className='w-full h-full flex flex-col items-start overflow-hidden bg-white'>
            <div className='w-full flex items-center mt-2 gap-1 border-black/10 py-3 px-6'>
                <div className='text-base text-black/50'>
                    <RiHome6Line />
                </div>
                <MdOutlineKeyboardArrowRight className='text-black/30'/>
                <p className='text-xs text-black/60 font-medium'>View Data</p>
                <MdOutlineKeyboardArrowRight className='text-black/30'/>
                <div className='flex items-center gap-1 text-black/80'>
                    {/* <LuFileSpreadsheet/> */}
                    <p className='text-xs font-medium'>{filename || ''}</p>
                </div>
            </div>
            
            <div className='flex flex-col gap-1 px-6 mt-3'>
                <p className='text-lg font-medium'>View Data</p>
                <p className='text-black/60 text-sm'>You can explore your data your own way.</p>
            </div>

            <div className='mt-6 w-full flex-1 min-h-0 flex flex-col px-6'>
                <Grid>
                    <div className='flex'><SheetTabs /></div>
                </Grid>
            </div>
        </div>
    
  )
}

export default ViewData