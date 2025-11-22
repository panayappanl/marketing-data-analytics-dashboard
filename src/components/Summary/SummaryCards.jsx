import { useDataContext } from '../../context/DataContext.jsx'
import { formatMoney, formatNumber, formatPercent } from '../../utils/format.js'
import '../../styles/cards.css'

function SummaryCards() {
  const { totals } = useDataContext()

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-label">Total Spend</div>
        <div className="card-value">{formatMoney(totals.spend)}</div>
      </div>

      <div className="summary-card">
        <div className="card-label">Total Impressions</div>
        <div className="card-value">{formatNumber(totals.impressions)}</div>
      </div>

      <div className="summary-card">
        <div className="card-label">Total Clicks</div>
        <div className="card-value">{formatNumber(totals.clicks)}</div>
      </div>

      <div className="summary-card">
        <div className="card-label">Total Conversions</div>
        <div className="card-value">{formatNumber(totals.conversions)}</div>
      </div>

      <div className="summary-card">
        <div className="card-label">CTR</div>
        <div className="card-value">{formatPercent(totals.ctr)}</div>
      </div>
    </div>
  )
}

export default SummaryCards

