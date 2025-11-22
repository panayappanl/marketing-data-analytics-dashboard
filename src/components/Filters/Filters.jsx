import { useCallback, useMemo } from 'react'
import { useDataContext } from '../../context/DataContext.jsx'
import '../../styles/filters.css'

function Filters() {
  const { rawData, filters, setChannel, setRegion, setSearch } = useDataContext()

  const uniqueChannels = useMemo(() => {
    const channels = [...new Set(rawData.map((record) => record.channel))]
    return channels.sort()
  }, [rawData])

  const uniqueRegions = useMemo(() => {
    const regions = [...new Set(rawData.map((record) => record.region))]
    return regions.sort()
  }, [rawData])

  const handleChannelChange = useCallback((e) => {
    setChannel(e.target.value)
  }, [setChannel])

  const handleRegionChange = useCallback((e) => {
    setRegion(e.target.value)
  }, [setRegion])

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value)
  }, [setSearch])

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="channel-filter">Channel</label>
        <select
          id="channel-filter"
          value={filters.channel}
          onChange={handleChannelChange}
        >
          <option value="All">All</option>
          {uniqueChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="region-filter">Region</label>
        <select
          id="region-filter"
          value={filters.region}
          onChange={handleRegionChange}
        >
          <option value="All">All</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-filter">Search</label>
        <input
          id="search-filter"
          type="text"
          placeholder="Search channel or region..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}

export default Filters

