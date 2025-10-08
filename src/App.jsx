import React, { useEffect, useState } from 'react'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'
import Charts from './components/Charts'
import { loadEntries, saveEntries, loadTheme, saveTheme } from './lib/storage'
import EditModal from './components/EditModal'
import { SunIcon, MoonIcon } from './components/Icons'

const DEFAULT_CATEGORIES = ['Allowance','Tuition', 'Food', 'Transport', 'Rent', 'Salary', 'Order Online', 'Electric or Water Bill', 'Other']

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries() || [])
  const [theme, setTheme] = useState(() => loadTheme() || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    saveTheme(theme)
  }, [theme])
  const [filter, setFilter] = useState({ category: 'All', type: 'All' })

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  function addEntry(entry) {
    setEntries(prev => [entry, ...prev])
  }

  function removeEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const categories = Array.from(new Set([...DEFAULT_CATEGORIES, ...entries.map(e => e.category)]))

  const filtered = entries.filter(e => {
    if (filter.category !== 'All' && e.category !== filter.category) return false
    if (filter.type !== 'All' && e.type !== filter.type) return false
    return true
  })

  const balance = entries.reduce((s,e) => {
    const amt = Number(e.amount) || 0
    return s + (e.type === 'Income' ? amt : -amt)
  }, 0)
  const totalIncome = entries.filter(e => e.type === 'Income').reduce((s, a) => s + (Number(a.amount) || 0), 0)
  const totalExpense = entries.filter(e => e.type !== 'Income').reduce((s, a) => s + (Number(a.amount) || 0), 0)

  const [editing, setEditing] = useState(null)

  function handleSaveEdit(updated) {
    setEntries(prev => prev.map(e => e.id === updated.id ? updated : e))
    setEditing(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold app-title">Expense Tracker</h1>
            <p className="text-sm text-b-500 header-sub dark:text-black">Track incomes, expenses and visualize them.</p>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <div className="bg-white shadow rounded p-3 text-center min-w-[110px] flex-1 sm:flex-none">
              <div className="text-xs text-gray-500">Balance</div>
              <div className={"text-xl font-semibold " + (balance>=0? 'text-green-600':'text-red-600')}>₱{Math.abs(balance).toFixed(2)}</div>
            </div>
            <div className="bg-white shadow rounded p-3 text-center min-w-[110px] flex-1 sm:flex-none">
              <div className="text-xs text-gray-500">Income</div>
              <div className="text-lg font-semibold text-green-600">₱{totalIncome.toFixed(2)}</div>
            </div>
            <div className="bg-white shadow rounded p-3 text-center min-w-[110px] flex-1 sm:flex-none">
              <div className="text-xs text-gray-500">Expense</div>
              <div className="text-lg font-semibold text-red-600">₱{totalExpense.toFixed(2)}</div>
            </div>
            <div className={`theme-switch ml-2 ${theme === 'dark' ? 'dark' : ''}`} onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} role="button" aria-label="Toggle theme">
              <div className="icon">{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</div>
              <div className="switch">
                <div className="knob" />
              </div>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow p-4 sm:p-6">
          <EntryForm onAdd={addEntry} categories={categories} />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <select className="border p-2 rounded bg-gray-50" value={filter.category} onChange={e => setFilter(f => ({...f, category: e.target.value}))}>
                  <option>All</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                <select className="border p-2 rounded bg-gray-50" value={filter.type} onChange={e => setFilter(f => ({...f, type: e.target.value}))}>
                  <option>All</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>

              <EntryList entries={filtered} onRemove={removeEntry} onEdit={e => setEditing(e)} />
            </div>

            <aside>
              <Charts entries={filtered} allEntries={entries} />
            </aside>
          </div>
            </main>
      {editing && <EditModal entry={editing} onClose={() => setEditing(null)} onSave={handleSaveEdit} categories={categories} />}
      </div>
    </div>
  )
}
