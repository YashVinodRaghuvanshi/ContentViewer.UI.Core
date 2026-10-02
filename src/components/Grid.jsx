import React from 'react'
import useDataStore from '../store/dataStore'

const Grid = () => {

    const columns = useDataStore((state) => state.columns)
    const data = useDataStore((state) => state.data)

    if (columns.length === 0) {
        return (
           <div className='flex'>
                <p className='mt-8 bg-red-100 text-red-700 font-medium py-1.5 px-3 rounded-full text-sm'>
                    ⓘ No columns available. Please upload a valid data file.
                </p>
           </div>
        )
    }

  return (
    <div className={`${data.length > 0 && 'h-full'} rounded-lg border-1 border-black/10 overflow-hidden`}>
        <div className='h-full overflow-auto'>
            <table className='w-full'>
                <thead>
                        <tr className=''>
                        {
                            columns?.map((col, ind) => 
                                <td key={col.name} className={`px-6 py-2 bg-gray-50 outline-1 outline-black/10 sticky top-0 z-10 text-sm font-medium`}>{col.title}</td>
                            )
                        }
                        </tr>
                </thead>
                <tbody>
                {
                   data?.map((rows, index) => 
                            <tr key={index} className='border-b-1 border-black/10'>
                                {
                                    columns?.map((item, inde) =>  
                                        <td key={inde} className='px-6 py-3 text-sm'>{rows[item.name]}</td>
                                    )
                                }
                            </tr>)
                }
                        
                </tbody>
            </table>

            {
                data.length == 0 && 
                <div className='flex items-center justify-center p-4 text-black/70'>
                    <p>No records to display. Your file doesn't contain any data rows.</p>
                </div>
            }
        </div>
    </div>
  )
}

export default Grid