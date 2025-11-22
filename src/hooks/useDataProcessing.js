export function filterData(data, filters) {
  return data.filter((record) => {
    // Channel filter
    if (filters.channel !== 'All' && record.channel !== filters.channel) {
      return false
    }
    // Region filter
    if (filters.region !== 'All' && record.region !== filters.region) {
      return false
    }
    // Search filter (case-insensitive search across channel and region)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesChannel = record.channel.toLowerCase().includes(searchLower)
      const matchesRegion = record.region.toLowerCase().includes(searchLower)
      if (!matchesChannel && !matchesRegion) {
        return false
      }
    }
    return true
  })
}

export function sortData(data, sortKey, sortDir) {
  const sorted = [...data]
  sorted.sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]
    
    if (typeof aValue === 'string') {
      return sortDir === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    return sortDir === 'asc'
      ? aValue - bValue
      : bValue - aValue
  })
  return sorted
}

export function paginateData(data, page, pageSize) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
}

export function computeTotals(data) {
  const totalSpend = data.reduce((sum, record) => sum + record.spend, 0)
  const totalImpressions = data.reduce((sum, record) => sum + record.impressions, 0)
  const totalClicks = data.reduce((sum, record) => sum + record.clicks, 0)
  const totalConversions = data.reduce((sum, record) => sum + record.conversions, 0)
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

  return {
    totalSpend,
    totalImpressions,
    totalClicks,
    totalConversions,
    ctr
  }
}

