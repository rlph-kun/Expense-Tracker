import React, { useState } from 'react'
import { PlusIcon } from './Icons'

export default function EntryForm({ onAdd, categories }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Other')
  const [type, setType] = useState('Expense')

  function submit(e) {
    e.preventDefault()
    const num = parseFloat(amount)
    if (!description || isNaN(num)) return
    const entry = {
      id: Date.now().toString(),
      description,
      amount: Math.abs(num),
      category,
      type,
      date: new Date().toISOString(),
    }
    onAdd(entry)
    setDescription('')
    setAmount('')
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
      <div className="md:col-span-3">
        <label className="text-sm text-gray-600">Description</label>
  <input className="w-full border p-2 rounded mt-1" placeholder="e.g. Grocery" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="text-sm text-gray-600">Amount</label>
  <input inputMode="decimal" className="w-full border p-2 rounded mt-1" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>

      <div>
        <label className="text-sm text-gray-600">Category</label>
        <select className="w-full border p-2 rounded mt-1" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

        <div className="md:col-span-6 flex flex-col sm:flex-row gap-2 mt-2 items-end">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm header-label">Type</label>
          <select className="border p-2 rounded ml-2" value={type} onChange={e => setType(e.target.value)}>
            <option>Expense</option>
            <option>Income</option>
          </select>
        </div>

  <button type="submit" className="w-full sm:w-auto ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded shadow hover:opacity-95 transition flex items-center gap-2 justify-center"><PlusIcon className="w-4 h-4" />Add Entry</button>
      </div>
    </form>
  )
}
