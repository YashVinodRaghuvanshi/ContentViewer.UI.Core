import React, { useEffect, useState } from 'react'
import ViewData from './ViewData'
import { RiFolderUploadLine } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";
import { RiHome6Line } from "react-icons/ri";
import { TbFileInfo } from "react-icons/tb";
import { MdGridOn } from "react-icons/md";
import { TbFileUploadFilled } from "react-icons/tb";
import { PiUploadBold } from "react-icons/pi";
import { BsFileEarmarkBreak } from "react-icons/bs";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsFileEarmarkBreakFill } from "react-icons/bs";
import UploadFile from './UploadFile';
import { NavLink, Outlet } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { registerPersistenceErrorHandler } from '../utils/persistenceError';

const MainPage = () => {
    const existedFile = useDataStore((state) => state.file)
    const columns = useDataStore((state) => state.columns)
    const [persistenceError, setPersistenceError] = useState(false)


    useEffect(() => {
        const unregister = registerPersistenceErrorHandler(() => {
            setPersistenceError(true)
        })

        return unregister

    }, [])

    const navLinks = [
        {
            id:1,
            name: 'Upload',
            icon: <PiUploadBold className='text-xl'/>,
            link: '/upload'
        },
        {
            id:2,
            name: 'View Data',
            icon: <MdGridOn className='text-xl'/>,
            link: '/viewdata'
        },
        // {
        //     id:3,
        //     name: 'Info',
        //     icon: <TbFileInfo />,
        //     link: '/info'
        // },
    ]
  return (
    <div className='flex items-center'>
        <div className='h-screen bg-gray-100 pl-2 pr-1 py-2'>
            <div className='w-full h-full flex flex-col items-center gap-2 p-3 bg-white outline-1 outline-black/10 rounded-xl'>
                <div className='flex flex-col gap-2'>
                    
                    {
                        navLinks?.filter(val => !existedFile || columns?.length === 0 ? val.name == 'Upload' : val ).map((val, ind) => {
                            return (
                                <NavLink 
                                    key={val.id} 
                                    to={val?.link} 
                                    title={val.name} 
                                    className={({isActive}) => `p-2 hover:bg-gray-100 rounded-lg ${isActive ? 'bg-green-100 text-green-600 hover:bg-green-100' : 'text-black/40'}`}>
                                    {val.icon}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className='w-screen h-screen flex flex-col items-start overflow-hidden bg-gray-100 py-2 pl-1 pr-2'>
            <div className='w-full h-full flex flex-col items-start overflow-hidden outline-1 outline-black/10 rounded-xl bg-white'>
                {persistenceError && (
                    <div
                        role="alert"
                        className="w-full flex items-center justify-between gap-3 
                        px-4 py-3 bg-red-50 text-red-700 border-b border-red-200"
                    >
                        <p className="text-sm">
                            Unable to save your changes. Your latest updates may not be saved.
                        </p>

                        <button
                            onClick={() => setPersistenceError(false)}
                            className="font-semibold text-sm"
                        >
                            Dismiss
                        </button>
                    </div>
                )}
                <Outlet />
                {/* <UploadFile /> */}
            </div>
        </div>
    </div>
  )
}

export default MainPage