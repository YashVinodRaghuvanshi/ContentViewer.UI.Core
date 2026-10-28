import React from 'react'
import Grid from '../components/Grid'
import SheetTabs from '../components/SheetTabs'

const ViewData = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-start pt-8 px-8 overflow-hidden'>
        <div className='flex flex-col gap-1'>
            <p className='text-xl font-medium'>View Data</p>
            <p className='text-black/60 text-sm'>You can explore your data your own way.</p>
        </div>

        <div className='mt-6 w-full flex-1 min-h-0 flex flex-col'>
            <Grid>
                <div className='flex'><SheetTabs /></div>
            </Grid>
        </div>
    </div>
  )
}

export default ViewData