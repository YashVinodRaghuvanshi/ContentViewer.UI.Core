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
    sortOrder: [],

    setFilename: (filename) => set({filename}),
    setSelectedRowTab: (selectedRowTab) => set({selectedRowTab}),
    setSelectedRow: (selectedRow) => set({selectedRow}),
    setSelectedColumn: (selectedColumn) => set({selectedColumn}),

    setColumns: (columns) => set({columns}),
    setSortOrder: (sortOrder) => set({sortOrder}),
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
        filename: '',
        sortOrder: []
    })

}))

export default useDataStore