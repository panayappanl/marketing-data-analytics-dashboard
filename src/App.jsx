/**
  * Live Demo: https://marketing-data-analytics-dashboard.vercel.app/
 * GitHub Repo: https://github.com/panayappanl/marketing-data-analytics-dashboard
 */

import Filters from './components/Filters/Filters.jsx'
import SummaryCards from './components/Summary/SummaryCards.jsx'
import DataTable from './components/Table/DataTable.jsx'
import PerformanceChart from './components/Charts/PerformanceChart.jsx'
import './styles/layout.css'
import './styles/table.css'
import './styles/filters.css'
import './styles/cards.css'

function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="page-title">Marketing Performance Dashboard</h1>
        
        <div className="filters-section">
          <Filters />
        </div>
        
        <div className="summary-section">
          <SummaryCards />
        </div>
        
        <div className="dashboard-row">
          <div className="dashboard-left table-section">
            <DataTable />
          </div>
          <div className="dashboard-right chart-section">
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
