import React from 'react'
import Grid from '../components/Grid'

const ViewData = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-start mt-8 px-20'>
        <div>
            <p className='text-2xl font-medium'>View Data</p>
            <p className='text-black/70'>You can explore your data your own way.</p>
        </div>

        <div className='mt-8 w-full h-150'>
            <Grid 
                columns={
                    [
                        {id:1, title: 'ID', name: 'id'},
                        {id:2, title: 'Name', name: 'name'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:3, title: 'Phone', name: 'phone'},
                        {id:2, title: 'Name', name: 'name'},
                        {id:2, title: 'Name', name: 'name'},
                    ]
                }
                data={
                    [
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                        {id:1, name: 'yash', phone:9999999999},
                    ]
                }
            />
        </div>
    </div>
  )
}

export default ViewData