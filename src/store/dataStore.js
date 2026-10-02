import { create } from "zustand";

const useDataStore = create((set) => ({
    columns : [],
    data : [],

    sheets: {},
    activeSheet: null,

    setColumns: (columns) => set({columns}),
    setData : (data) => set({data}),
    setSheets : (sheets) => set({sheets}),
    setActiveSheet : (activeSheet) => set({activeSheet}),

    clearData : () => set({
        columns: [],
        data : [],
        sheets: {},
        activeSheet: null
    })

}))

export default useDataStore