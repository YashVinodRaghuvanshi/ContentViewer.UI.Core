import { create } from "zustand";

const useDataStore = create((set) => ({
    columns : [],
    data : [],

    setColumns: (columns) => set({columns}),
    setData : (data) => set({data}),

    clearData : () => set({
        columns: [],
        data : []
    })

}))

export default useDataStore