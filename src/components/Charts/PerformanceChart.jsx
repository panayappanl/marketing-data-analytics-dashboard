import { useMemo } from 'react'
import { useDataContext } from '../../context/DataContext.jsx'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import '../../styles/layout.css'

function PerformanceChart() {
  const { filteredData } = useDataContext()

  const chartData = useMemo(() => {
    const channelTotals = {}
    
    filteredData.forEach((record) => {
      if (!channelTotals[record.channel]) {
        channelTotals[record.channel] = {
          channel: record.channel,
          totalSpend: 0,
          totalConversions: 0
        }
      }
      channelTotals[record.channel].totalSpend += record.spend
      channelTotals[record.channel].totalConversions += record.conversions
    })

    return Object.values(channelTotals).sort((a, b) => 
      a.channel.localeCompare(b.channel)
    )
  }, [filteredData])

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Performance by Channel</h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="channel" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#d1d5db"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#d1d5db"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '6px'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar 
            dataKey="totalSpend" 
            name="Spend" 
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="totalConversions" 
            name="Conversions" 
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceChart

