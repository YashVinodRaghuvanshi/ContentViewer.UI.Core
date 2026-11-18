import { create } from "zustand";
import {get as idbGet, set as idbSet, del as idbDel} from 'idb-keyval'
import { createJSONStorage, persist } from "zustand/middleware";
import { handlerPersistenceError } from "../utils/persistenceError";

const indexedDBStorage = {
    getItem: async (name) => {
        try {
            const value = await idbGet(name)
            return value ?? null
        }
        catch (error) {
            handlerPersistenceError(error)
            throw error
        }
    },
    setItem: async (name, value) => {
        try {
            await idbSet(name, value)
        }
        catch (error) {
            handlerPersistenceError(error)
            throw error
        }
    },
    removeItem: async (name) => {
        try {
            await idbDel(name)
        }
        catch(error) {
            handlerPersistenceError(error)
            throw error
        }
    }
}

const useDataStore = create(
    persist(
        (set) => ({
            filename: '',
            file: null,
            columns : [],
            data : [],
            filter: [],
            searchTerm: {},

            sheets: {},
            activeSheet: null,
            
            selectedColumn : {},
            selectedRowTab : 1,

            selectedRow: {},
            selectedRows: {},

            sortOrder: null,
            frozenColumn: {},

            hasHydrated: false,
            setHasHydrated: (value) => set({
                hasHydrated: value
            }),

            setFile: (file) => set({file}),
            setFilename: (filename) => set({filename}),
            setSearchTerm: (searchTerm) => set({searchTerm}),
            setSelectedRowTab: (selectedRowTab) => set({selectedRowTab}),
            setSelectedRow: (selectedRow) => set({selectedRow}),
            setSelectedRows: (selectedRows) => set((state) => ({
                selectedRows: typeof selectedRows === 'function' ? selectedRows(state.selectedRows) : selectedRows
            })),
            setSelectedColumn: (selectedColumn) => set({selectedColumn}),

            setColumns: (columns) => set({columns}),
            setFrozenColumn: (frozenColumn) => set({frozenColumn}),
            setSortOrder: (sortOrder) => set({sortOrder}),
            setData : (data) => set({data}),
            setFilter : (filter) => set({filter}),
            setSheets : (sheets) => set({sheets}),
            setActiveSheet : (activeSheet) => set({activeSheet}),
            clearRowData: () => set({selectedRow: {}}),
            restoreWorkspace: (workspace) => set({
                filename: workspace.filename ?? '',
                file: workspace.file ?? null,
                columns: workspace.columns,
                data: workspace.data,
                filter: workspace.filter ?? [],
                searchTerm: workspace.searchTerm ?? {},
                sheets: workspace.sheets,
                activeSheet: workspace.activeSheet,
                selectedColumn: workspace.selectedColumn ?? {},
                selectedRowTab: workspace.selectedRowTab ?? 1,
                selectedRow: workspace.selectedRow ?? {},
                selectedRows: workspace.selectedRows ?? {},
                sortOrder: workspace.sortOrder ?? null,
                frozenColumn: workspace.frozenColumn ?? {}
            }),
            clearData : () => set({
                columns: [],
                data : [],
                sheets: {},
                activeSheet: null,
                selectedColumn: {},
                selectedRow: {},
                filename: '',
                sortOrder: null,
                frozenColumn: {},
                filter: [],
                file: null,
                selectedRowTab:1,
                selectedRows: {},
                searchTerm: {}
            })

        }), 
        {
            name: 'data-explorer-storage',
            storage: createJSONStorage(() => indexedDBStorage) ,
            partialize : (state) => ({
                filename: state.filename,
                file: state.file,
                columns: state.columns,
                data: state.data,
                filter: state.filter,
                searchTerm: state.searchTerm,
                sheets: state.sheets,
                activeSheet: state.activeSheet,
                selectedColumn: state.selectedColumn,
                selectedRowTab: state.selectedRowTab,
                selectedRow: state.selectedRow,
                selectedRows: state.selectedRows,
                sortOrder: state.sortOrder,
                frozenColumn: state.frozenColumn
            }),
            onRehydrateStorage: () => (state, error) => {
                if(!error) {
                    state?.setHasHydrated(true)
                }
            }
        }
    ))

export default useDataStore