import { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react'
import { filterData, sortData, paginateData, computeTotals } from '../hooks/useDataProcessing.js'

export const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [rawData, setRawData] = useState([])
  const [filters, setFilters] = useState({
    channel: 'All',
    region: 'All',
    search: ''
  })
  const [sorting, setSortingState] = useState({
    key: 'spend',
    direction: 'desc'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 50
  })

  useEffect(() => {
    async function loadData() {
      try {
        const data = await import('../data/marketing.json')
        setRawData(data.default || data)
      } catch (error) {
        console.error('Failed to load marketing data:', error)
      }
    }
    loadData()
  }, [])

  // Derived values
  const filteredData = useMemo(() => {
    return filterData(rawData, filters)
  }, [rawData, filters])

  const sortedData = useMemo(() => {
    return sortData(filteredData, sorting.key, sorting.direction)
  }, [filteredData, sorting])

  const paginatedData = useMemo(() => {
    return paginateData(sortedData, pagination.page, pagination.pageSize)
  }, [sortedData, pagination])

  const totals = useMemo(() => {
    const computed = computeTotals(filteredData)
    return {
      spend: computed.totalSpend,
      impressions: computed.totalImpressions,
      clicks: computed.totalClicks,
      conversions: computed.totalConversions,
      ctr: computed.ctr
    }
  }, [filteredData])

  // Setter functions
  const setChannel = useCallback((channel) => {
    setFilters((prev) => ({ ...prev, channel }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const setRegion = useCallback((region) => {
    setFilters((prev) => ({ ...prev, region }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const setSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const setSorting = useCallback((newSorting) => {
    setSortingState(newSorting)
  }, [])

  const setPage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const value = useMemo(() => ({
    rawData,
    filters,
    sorting,
    pagination,
    filteredData,
    sortedData,
    paginatedData,
    totals,
    setChannel,
    setRegion,
    setSearch,
    setSorting,
    setPage
  }), [rawData, filters, sorting, pagination, filteredData, sortedData, paginatedData, totals, setChannel, setRegion, setSearch, setSorting, setPage])

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}

