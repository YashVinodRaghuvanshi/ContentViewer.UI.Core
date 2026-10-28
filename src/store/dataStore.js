import { create } from "zustand";

const useDataStore = create((set) => ({
    filename: '',
    columns : [],
    data : [],

    sheets: {},
    activeSheet: null,
    
    selectedColumn : {},
    selectedRowTab : 1,

    selectedRow: {},

    setFilename: (filename) => set({filename}),
    setSelectedRowTab: (selectedRowTab) => set({selectedRowTab}),
    setSelectedRow: (selectedRow) => set({selectedRow}),
    setSelectedColumn: (selectedColumn) => set({selectedColumn}),

    setColumns: (columns) => set({columns}),
    setData : (data) => set({data}),
    setSheets : (sheets) => set({sheets}),
    setActiveSheet : (activeSheet) => set({activeSheet}),
    clearRowData: () => set({selectedRow: {}}),

    clearData : () => set({
        columns: [],
        data : [],
        sheets: {},
        activeSheet: null,
        selectedColumn: {},
        selectedRow: {},
        filename: ''
    })

}))

export default useDataStore