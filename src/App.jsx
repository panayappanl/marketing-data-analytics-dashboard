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
        <h1 className="page-title">Contribution / Marketing Dashboard</h1>
        
        <Filters />
        
        <SummaryCards />
        
        <div className="dashboard-row">
          <div className="dashboard-left">
            <DataTable />
          </div>
          <div className="dashboard-right">
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
