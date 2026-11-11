import useDataStore from "../store/dataStore"

const exportCustomWorkspace = (exportSelectedTab) => {
    const state = useDataStore.getState()
    const activeSheets = state.activeSheet
    const sheets = state.sheets
    const currentTab = exportSelectedTab === 1
    const selectedSheet = sheets[activeSheets]
    const preparedExportedData = {
        version: 1,
        exportedAt: new Date().toISOString(),
        workspace: {
            filename: state.filename,
            file: state.file,
            columns: state.columns,
            data: state.data,
            filter: state.filter,
            searchTerm: state.searchTerm,
            sheets: currentTab ? {[activeSheets] : selectedSheet} : state.sheets,
            activeSheet: state.activeSheet,
            selectedColumn: state.selectedColumn,
            selectedRowTab: state.selectedRowTab,
            selectedRow: state.selectedRow,
            selectedRows: state.selectedRows,
            sortOrder: state.sortOrder,
            frozenColumn: state.frozenColumn
        }
    }

    const workspaceData = JSON.stringify(preparedExportedData, null, 2)
    const blob = new Blob([workspaceData], {type: "application/json"})
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    
    link.href = url  
    link.download = `${state.filename || 'workspace'}_backup.json`
    
    document.body.appendChild(link)
    
    link.click()
    
    document.body.removeChild(link)
    
    setTimeout(() => {
        URL.revokeObjectURL(url)
    }, 1000)

}

export default exportCustomWorkspace
