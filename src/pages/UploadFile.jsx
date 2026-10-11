import React, { useRef, useState } from 'react'
import imglogo from '../assets/img file.png'
import { CiFileOn } from "react-icons/ci";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdArrowOutward } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import FileCard from '../components/FileCard';
import InfoButton from '../components/InfoButton';
import CTA from '../components/CTA';
import { FaFileUpload } from "react-icons/fa";
import UploadImage from '../components/UploadImage';
import { FaFile } from "react-icons/fa";
import { TbUpload } from "react-icons/tb";
import UploadImageNested from '../components/UploadImageNested';
import {useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import useDataStore from '../store/dataStore';

const UploadFile = () => {

    const [fileUploaded, setFileUploaded] = useState(false)
    const [selectedFileInfo, setSelectedFileInfo] = useState(null)

    const columns = useDataStore((state) => state.columns)
    const setColumns = useDataStore((state) => state.setColumns)
    const setSheets = useDataStore((state) => state.setSheets)
    const setActiveSheet = useDataStore((state) => state.setActiveSheet)
    const setData = useDataStore((state) => state.setData)
    const clearPrevData = useDataStore((state) => state.clearData)

    const navigate = useNavigate();

    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const formateFileSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} Bytes`
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(2)} KB`
        }

        if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }

    const handleFileChange = (event) => {
        //clear previous data
        clearPrevData()

        const file = event.target.files[0];

        if(!file) return


        //read file and extract content
        const fileReader = new FileReader()

        fileReader.onload = (event) => {

            const workbook = XLSX.read(event.target.result, {
                type: 'array'
            })

            const sheets = {}

            //For multiple sheets
            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(worksheet)
                
                const dataWithId = jsonData.map((row, index) => ({
                    _chkbox: '_chkbox',
                    _id: index + 1,
                    _info: '_info',
                    ...row
                }))

                const columnsWhenNoDataRows = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                })

                const columnsWhenNoData = columnsWhenNoDataRows[0] || []

                const columns = columnsWhenNoData?.map((col) => ({
                    title: col,
                    name: col,
                    type: 'system'
                }))

                const columnsMap = columns.length > 0 && columns.splice(0,0, {title: '_chkbox', name: '_chkbox', type: 'custom'}, {title: '_id', name: '_id', type: 'custom'}, {title: '_info', name: '_info', type: 'custom'})

                // const columns = jsonData.length > 0 ? Object.keys(jsonData[0]).map((key) => ({
                //     title: key,
                //     name: key
                // })) 
                // : (columnsWhenNoDataRows.length > 0) ? columnsWhenNoData?.map((col) => ({
                //     title: col,
                //     name: col
                // })) : []

                sheets[sheetName] = {
                    columns,
                    data: dataWithId,
                    rows: dataWithId?.length || 0,
                    invalid: columns.length === 0
                }

            })
            
            const firstSheet = workbook.SheetNames[0]

            setSheets(sheets)
            setActiveSheet(firstSheet)

            setColumns(sheets[firstSheet].columns)
            setData(sheets[firstSheet].data)

        }

        fileReader.readAsArrayBuffer(file)

        setFileUploaded(true)

        setSelectedFileInfo({
            name : file?.name,
            size : formateFileSize(file?.size),
            type : file?.name?.split('.').pop()
        })
        

    }

  return (
    <>
    {
        !fileUploaded ?
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center'>
                {/* <img src={imglogo} alt="img logo" className='w-30'/> */}

                {/* <div className={`bg-green-100 p-5 rounded-3xl`}>
                    <FaFileUpload className='text-green-500' size={40}/>
                </div> */}

                <UploadImage />

                <div className='flex flex-col items-center -mt-24'>
                    <CTA 
                    title={'Upload. Explore. Transform.'}
                    desc={'Search, sort, filter, and transform your data with ease.'}
                    />

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        accept=".xls, .xlsx" 
                        onChange={handleFileChange} 
                        className='hidden'
                    />

                    <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                        <TbUpload size={20}/>
                        Choose a file
                    </button>
                    
                    <p className='mt-8 bg-green-100 text-green-700 font-medium py-1.5 px-3 rounded-full text-sm'>ⓘ Supported file types : .XLS, .XLSX</p>

                </div>
            </div>
            <p className='text-base absolute bottom-10 text-black/30'>Version 1.0.0</p>
        </div> :
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center'>

                <UploadImageNested >
                    <FileCard 
                        selectedFileInfo={selectedFileInfo}
                        setFileUploaded={setFileUploaded}
                        type={selectedFileInfo?.type}
                        className={'absolute bg-white'}
                        invalid = {columns.length == 0}
                    />
                </UploadImageNested>


                <div className='flex flex-col -mt-36 items-center z-30'>
                    <CTA 
                    title={columns.length > 0 ? 'Let’s work with your data' : 'No columns available'}
                    desc={columns.length > 0 ? 'Your file is ready. Choose an action below to continue.' : 'Make sure your file contains column headers and upload it again.'}
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        accept=".xls, .xlsx" 
                        onChange={handleFileChange} 
                        className='hidden'
                    />
                    {
                        columns.length > 0 ?
                        <div className='flex items-center gap-4'>
                            <button onClick={() => navigate('/viewdata')} className='text-base bg-white text-black flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <FaTable size={20}/>
                                View Data
                            </button>
                            <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <BsDatabaseFillGear size={20}/>
                                Process Data
                            </button>
                        </div>
                        :
                        <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                            <TbUpload size={20}/>
                            Choose a file
                        </button>
                    }

                    {/* <div className='flex flex-row gap-4 mt-2'>

                        <InfoButton 
                            Icon={<FaTable className='text-orange-500' size={22}/>}
                            bgColor={'bg-orange-100'}
                            title={'View Data'}
                            desc={'Explore, search, sort & filter your data'}
                            handleOnClick={null}
                        />

                        <InfoButton 
                            Icon={<BsDatabaseFillGear className='text-purple-500' size={22}/>}
                            bgColor={'bg-purple-100'}
                            title={'Process Data'}
                            desc={'Transform, clean & modify your data'}
                            handleOnClick={null}
                        />

                    </div> */}
                </div>
            </div>
            <p className='text-base absolute bottom-10 text-black/30'>Version 1.0.0</p>
        </div>
    }
    
    </>
    
  )
}

export default UploadFile