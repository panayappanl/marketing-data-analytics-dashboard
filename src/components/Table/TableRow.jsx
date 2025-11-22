import { formatMoney, formatNumber, formatPercent } from '../../utils/format.js'
import { calculateCTR } from '../../utils/calculate.js'

function TableRow({ region, records, isExpanded, onToggle }) {
  return (
    <>
      {/* Parent row */}
      <tr className="parent-row" onClick={onToggle}>
        <td className="parent-cell">
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          {region}
        </td>
        <td></td>
        <td className="numeric"></td>
        <td className="numeric"></td>
        <td className="numeric"></td>
        <td className="numeric"></td>
        <td className="numeric"></td>
      </tr>
      {/* Child rows */}
      {isExpanded &&
        records.map((record) => {
          const ctr = calculateCTR(record.clicks, record.impressions)
          return (
            <tr key={record.id} className="child-row">
              <td className="child-cell">{record.channel}</td>
              <td>{record.region}</td>
              <td className="numeric">{formatMoney(record.spend)}</td>
              <td className="numeric">{formatNumber(record.impressions)}</td>
              <td className="numeric">{formatNumber(record.clicks)}</td>
              <td className="numeric">{formatNumber(record.conversions)}</td>
              <td className="numeric">{formatPercent(ctr)}</td>
            </tr>
          )
        })}
    </>
  )
}

export default TableRow

