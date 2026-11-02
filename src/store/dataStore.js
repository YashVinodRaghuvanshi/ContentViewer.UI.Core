import { create } from "zustand";

const useDataStore = create((set) => ({
    filename: '',
    columns : [],
    data : [],
    filter: [{
        id: Date.now(),
        column:null,
        datatype:null,
        operator:null,
        value:null,
        operand: 'And'
    }],

    sheets: {},
    activeSheet: null,
    
    selectedColumn : {},
    selectedRowTab : 1,

    selectedRow: {},
    sortOrder: null,

    frozenColumn: null,

    setFilename: (filename) => set({filename}),
    setSelectedRowTab: (selectedRowTab) => set({selectedRowTab}),
    setSelectedRow: (selectedRow) => set({selectedRow}),
    setSelectedColumn: (selectedColumn) => set({selectedColumn}),

    setColumns: (columns) => set({columns}),
    setFrozenColumn: (frozenColumn) => set({frozenColumn}),
    setSortOrder: (sortOrder) => set({sortOrder}),
    setData : (data) => set({data}),
    setFilter : (filter) => set({filter}),
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
        sortOrder: null,
        frozenColumn: null,
        filter: [{
            id: Date.now(),
            column:null,
            datatype:null,
            operator:null,
            value:null,
            operand: 'And'
        }]
    })

}))

export default useDataStore