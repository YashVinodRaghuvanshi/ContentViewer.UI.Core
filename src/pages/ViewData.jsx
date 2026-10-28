import React from 'react'
import Grid from '../components/Grid'
import SheetTabs from '../components/SheetTabs'
import { HiOutlineSlash } from "react-icons/hi2";
import { CiViewTable } from "react-icons/ci";
import { LuFileSpreadsheet } from "react-icons/lu";
import useDataStore from '../store/dataStore';
import { Link } from 'react-router-dom';

const ViewData = () => {

    const filename = useDataStore((state) => state.filename)

  return (
    <div className='w-screen h-screen flex flex-col items-start overflow-hidden'>
        
        <div className='w-full flex items-center border-b-1 gap-1 border-black/10 py-3 px-8'>
            <Link className='text-xs text-black/60' to={'/'}>Home</Link>
            <HiOutlineSlash className='text-black/60'/>
            <p className='text-xs text-black/60'>View Data</p>
            <HiOutlineSlash className='text-black/60'/>
            <div className='flex items-center gap-1 text-black/80'>
                <LuFileSpreadsheet/>
                <p className='text-xs font-medium'>{filename || ''}</p>
            </div>
        </div>
        
        <div className='flex flex-col gap-1 px-8 mt-6'>
            <p className='text-xl font-medium'>View Data</p>
            <p className='text-black/60 text-sm'>You can explore your data your own way.</p>
        </div>

        <div className='mt-6 w-full flex-1 min-h-0 flex flex-col px-8'>
            <Grid>
                <div className='flex'><SheetTabs /></div>
            </Grid>
        </div>
    </div>
  )
}

export default ViewData