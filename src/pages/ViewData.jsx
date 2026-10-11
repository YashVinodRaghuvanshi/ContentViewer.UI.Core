import React from 'react'
import Grid from '../components/Grid'
import SheetTabs from '../components/SheetTabs'

const ViewData = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-start pt-8 px-20 overflow-hidden'>
        <div className=''>
            <p className='text-2xl font-medium'>View Data</p>
            <p className='text-black/70'>You can explore your data your own way.</p>
        </div>

        <div className='mt-1 w-full flex-1 min-h-0 flex flex-col'>
            <SheetTabs />
            <div className='w-full h-[2px] bg-gray-100 mb-5 mt-1'></div>
            <Grid />
        </div>
    </div>
  )
}

export default ViewData