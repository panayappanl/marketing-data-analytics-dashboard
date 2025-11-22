import { useState, useMemo, useCallback } from 'react'
import { useDataContext } from '../../context/DataContext.jsx'
import TableRow from './TableRow.jsx'
import '../../styles/table.css'

function DataTable() {
  const { paginatedData, sorting, setSorting, pagination, setPage, sortedData } = useDataContext()
  const [expandedRegions, setExpandedRegions] = useState(new Set())

  // Group data by region
  const groupedData = useMemo(() => {
    const groups = {}
    paginatedData.forEach((record) => {
      if (!groups[record.region]) {
        groups[record.region] = []
      }
      groups[record.region].push(record)
    })
    return groups
  }, [paginatedData])

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / pagination.pageSize)
  }, [sortedData.length, pagination.pageSize])

  const handleSort = useCallback((key) => {
    if (sorting.key === key) {
      setSorting({
        key,
        direction: sorting.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSorting({
        key,
        direction: 'desc'
      })
    }
  }, [sorting, setSorting])

  const toggleRegion = useCallback((region) => {
    setExpandedRegions((prev) => {
      const next = new Set(prev)
      if (next.has(region)) {
        next.delete(region)
      } else {
        next.add(region)
      }
      return next
    })
  }, [])

  const getSortIcon = useCallback((key) => {
    if (sorting.key !== key) return null
    return sorting.direction === 'asc' ? '▲' : '▼'
  }, [sorting])

  const handlePrevPage = useCallback(() => {
    setPage(pagination.page - 1)
  }, [pagination.page, setPage])

  const handleNextPage = useCallback(() => {
    setPage(pagination.page + 1)
  }, [pagination.page, setPage])

  const handleSortChannel = useCallback(() => handleSort('channel'), [handleSort])
  const handleSortRegion = useCallback(() => handleSort('region'), [handleSort])
  const handleSortSpend = useCallback(() => handleSort('spend'), [handleSort])
  const handleSortImpressions = useCallback(() => handleSort('impressions'), [handleSort])
  const handleSortClicks = useCallback(() => handleSort('clicks'), [handleSort])
  const handleSortConversions = useCallback(() => handleSort('conversions'), [handleSort])

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={handleSortChannel} className="sortable">
              Category/Channel {getSortIcon('channel')}
            </th>
            <th onClick={handleSortRegion} className="sortable">
              Region {getSortIcon('region')}
            </th>
            <th onClick={handleSortSpend} className="sortable numeric">
              Spend {getSortIcon('spend')}
            </th>
            <th onClick={handleSortImpressions} className="sortable numeric">
              Impressions {getSortIcon('impressions')}
            </th>
            <th onClick={handleSortClicks} className="sortable numeric">
              Clicks {getSortIcon('clicks')}
            </th>
            <th onClick={handleSortConversions} className="sortable numeric">
              Conversions {getSortIcon('conversions')}
            </th>
            <th className="numeric">CTR</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedData).map(([region, records]) => {
            const handleToggle = () => toggleRegion(region)
            return (
              <TableRow
                key={region}
                region={region}
                records={records}
                isExpanded={expandedRegions.has(region)}
                onToggle={handleToggle}
              />
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={pagination.page === 1}
          className="pagination-btn"
        >
          Prev
        </button>
        <span className="pagination-info">
          Page {pagination.page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pagination.page >= totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DataTable

