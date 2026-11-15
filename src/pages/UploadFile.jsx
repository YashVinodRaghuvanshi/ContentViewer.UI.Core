import React, { useEffect, useRef, useState } from 'react'
import imglogo from '../assets/img file.png'
import { CiFileOn } from "react-icons/ci";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdArrowOutward } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { TbFileImport } from "react-icons/tb";
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
import RestoringWorkspace from '../components/RestoringWorkspace';
import AlertPopup from '../components/AlertPopup';

const UploadFile = () => {

    const hasHydrated = useDataStore((state) => state.hasHydrated)
    const SIZE_IN_MB = 10 
    const MAX_FILE_SIZE = SIZE_IN_MB * 1024 * 1024 //10 MB
    const [deletionPopup, setDeletionPopup] = useState(false)
    const columns = useDataStore((state) => state.columns)
    const file = useDataStore((state) => state.file)
    const sheets = useDataStore((state) => state.sheets)
    const setFile = useDataStore((state) => state.setFile)
    const setFilename = useDataStore((state) => state.setFilename)
    const setColumns = useDataStore((state) => state.setColumns)
    const setSheets = useDataStore((state) => state.setSheets)
    const setActiveSheet = useDataStore((state) => state.setActiveSheet)
    const setData = useDataStore((state) => state.setData)
    const clearPrevData = useDataStore((state) => state.clearData)

    const [fileUploaded, setFileUploaded] = useState(false)
    const [selectedFileInfo, setSelectedFileInfo] = useState(null)

    const handleFileRemoved = () => {
        setFileUploaded(false)
        clearPrevData()
    }

    useEffect(() => {
        setFileUploaded(Boolean(file))
    }, [file])

    const navigate = useNavigate();

    const customFieldsInfo = {
       checkbox: 'Choose the rows you want to work with.',
        id: 'A unique number to identify each row.',
       info: 'See all the information in a row.'
    }

    const fileInputRef = useRef(null)
    const importFileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const importWorkspaceData = () => {
        importFileInputRef.current.click();
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

        if (file.size > MAX_FILE_SIZE) {
            console.log("File size must be 10 MB or less.")
            event.target.value = ""
            return
        }


        //read file and extract content
        const fileReader = new FileReader()

        fileReader.onload = (event) => {

            const workbook = XLSX.read(event.target.result, {
                type: 'array',
                cellDates: true
            })

            const sheets = {}

            //For multiple sheets
            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    raw: false,
                })
                
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
                    type: 'system',
                    ishidden: false
                }))

                const columnsMap = columns.length > 0 && columns.splice(0,0, 
                    {title: '_chkbox', name: '_chkbox', type: 'custom', ishidden: false, info: customFieldsInfo?.checkbox}, 
                    {title: '_id', name: '_id', type: 'custom', ishidden: false, info: customFieldsInfo?.id}, 
                    {title: '_info', name: '_info', type: 'custom', ishidden: false, info: customFieldsInfo?.info})

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

            setFilename(file?.name)
            setFile({
                name: file?.name,
                size : formateFileSize(file?.size),
                type : file?.name?.split('.').pop(),
                sheets: Object.keys(sheets).length
            })

        }

        fileReader.readAsArrayBuffer(file)

        
        setSelectedFileInfo({
            name : file?.name,
            size : formateFileSize(file?.size),
            type : file?.name?.split('.').pop()
        })
        
        // setFilename(file?.name)
        // setFile({
        //     name: file?.name,
        //     size : formateFileSize(file?.size),
        //     type : file?.name?.split('.').pop(),
        //     sheets: Object.keys(sheets).length
        // })
        
        setFileUploaded(true)
    }

    const importHandleFileChange = (event) => {

        const file = event.target.files[0]
        
        if (!file) return 

        if (file.size > MAX_FILE_SIZE) {
            console.log("File size must be 10 MB or less.")
            event.target.value = ""
            return
        }

        const fileReader = new FileReader()
        
        fileReader.onload = (event) => {
            try {
                const textData = event.target.result
                const jsonString = JSON.parse(textData)

                const workspace = jsonString?.workspace

                if (Object.keys(jsonString ?? {}).length !== 3 ||
                    jsonString?.version !== 1 ||
                    !workspace ||
                    !Array.isArray(workspace?.columns) ||
                    !Array.isArray(workspace?.data) ||
                    !workspace?.sheets ||
                    typeof workspace?.sheets !== "object" ||
                    Array.isArray(workspace?.sheets)) {
                        throw new Error("Invalid workspace backup")
                    }

                useDataStore.getState().restoreWorkspace(workspace)
            }   
            catch(ex) {
                console.error("Import Error:", ex)
            }
        }

        fileReader.readAsText(file)

    }

    // if(!hasHydrated) {
    //     return (
    //         <RestoringWorkspace />
    //     )
    // }

  return (
    <>
    {
        deletionPopup && 
        <AlertPopup 
            setOpenFilter = {setDeletionPopup} 
            handleFileRemoved = {handleFileRemoved}
        />
    }

    {
        !fileUploaded || !file ?
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

                    <input 
                        type="file" 
                        ref={importFileInputRef} 
                        accept=".json" 
                        onChange={importHandleFileChange} 
                        className='hidden'
                    />

                    <div className='flex items-center gap-4'>
                        <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                            <TbUpload size={20}/>
                            Choose a file
                        </button>
                        <button onClick={importWorkspaceData} className='text-base bg-white text-black flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                            <TbFileImport size={20}/>
                            Import Workspace
                        </button>
                    </div>
                    
                    <p className='mt-8 bg-green-100 text-green-700 font-medium py-1.5 px-3 rounded-full text-sm'>ⓘ Supported file types: .XLS, .XLSX | Maximum file size: {SIZE_IN_MB} MB</p>

                </div>
            </div>
            <p className='text-base absolute bottom-10 text-black/30'>Version 1.0.0</p>
        </div> :
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center'>

                <UploadImageNested >
                    <FileCard 
                        selectedFileInfo={selectedFileInfo || file}
                        setDeletionPopup = {setDeletionPopup}
                        setFileUploaded={setFileUploaded}
                        type={selectedFileInfo?.type || file?.type}
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
                    <input 
                        type="file" 
                        ref={importFileInputRef} 
                        accept=".json" 
                        onChange={importHandleFileChange} 
                        className='hidden'
                    />
                    {
                        columns.length > 0 ?
                        <div className='flex items-center gap-4'>
                            <button onClick={() => navigate('/viewdata')} className='text-base bg-white text-black flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <FaTable size={20}/>
                                View Data
                            </button>
                            {/* <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <BsDatabaseFillGear size={20}/>
                                Process Data
                            </button> */}
                        </div>
                        :
                        <div className='flex items-center gap-4'>
                            <button onClick={handleUploadClick} className='text-base bg-black text-white flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <TbUpload size={20}/>
                                Choose a file
                            </button>
                            <button onClick={importWorkspaceData} className='text-base bg-white text-black flex items-center gap-2 font-medium mt-6 hover:cursor-pointer hover:shadow-lg outline-1 py-3 px-5 rounded-xl outline-black/20'>
                                <TbFileImport size={20}/>
                                Import Workspace
                            </button>
                        </div>
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
            <p className='text-base absolute bottom-10 text-black/30'>ExploreExcelSheet | Version 1.0.0</p>
        </div>
    }
    
    </>
    
  )
}

export default UploadFile