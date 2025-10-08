import React, { useMemo } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function sumByCategory(entries) {
  const sums = {}
  entries.forEach(e => {
    const key = e.category || 'Other'
    const sign = e.type === 'Income' ? 1 : -1
    sums[key] = (sums[key] || 0) + sign * e.amount
  })
  return sums
}

export default function Charts({ entries, allEntries }) {
  const byCategory = useMemo(() => sumByCategory(entries), [entries])
  const totalIncome = useMemo(() => allEntries.filter(e => e.type==='Income').reduce((s,a)=>s+a.amount,0), [allEntries])
  const totalExpense = useMemo(() => allEntries.filter(e => e.type!=='Income').reduce((s,a)=>s+a.amount,0), [allEntries])

  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [{
      data: Object.values(byCategory).map(v => Math.abs(v)),
      backgroundColor: ['#ef4444', '#60a5fa', '#34d399', '#f59e0b', '#a78bfa', '#f97316']
    }]
  }

  const barData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Amount',
      data: [totalIncome, totalExpense],
      backgroundColor: ['#10b981', '#ef4444']
    }]
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow dark:bg-slate-800 dark:border dark:border-slate-700">
  <h3 className="font-medium mb-2 chart-heading">By Category</h3>
        {Object.keys(byCategory).length ? <Pie data={pieData} /> : <div className="text-gray-500">No data</div>}
      </div>
      <div className="bg-white p-4 rounded shadow dark:bg-slate-800 dark:border dark:border-slate-700">
  <h3 className="font-medium mb-2 chart-heading">Income vs Expense</h3>
        <Bar data={barData} />
      </div>
    </div>
  )
}
