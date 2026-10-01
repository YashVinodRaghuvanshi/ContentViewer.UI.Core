import React from 'react'

const Grid = ({columns, data}) => {
  return (
    <div className='h-full rounded-lg border-1 border-black/10 overflow-hidden'>
        <div className='h-full overflow-auto'>
            <table className='w-full'>
                <thead>
                        <tr className=' bg-gray-100/60'>
                        {
                            columns?.map((col, ind) => 
                                <td className={`px-6 py-2 text-sm border-l-1 border-black/10 font-medium`}>{col.title}</td>
                            )
                        }
                        </tr>
                </thead>
                <tbody>
                {
                    data?.map((rows, index) => 
                            <tr className='border-t-1 border-black/10'>
                                {
                                    columns?.map((item, inde) =>  
                                        <td className='px-6 py-3 text-sm'>{rows[item.name]}</td>
                                    )
                                }
                            </tr>)
                }
                        
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Grid