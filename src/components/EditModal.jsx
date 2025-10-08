import React, { useState, useEffect, useRef } from 'react'
import { CloseIcon } from './Icons'

export default function EditModal({ entry, onClose, onSave, categories = [] }) {
  const [description, setDescription] = useState(entry?.description || '')
  const [amount, setAmount] = useState(entry?.amount ?? '')
  const [category, setCategory] = useState(entry?.category || (categories[0] || 'Other'))
  const [type, setType] = useState(entry?.type || 'Expense')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    setDescription(entry?.description || '')
    setAmount(entry?.amount ?? '')
    setCategory(entry?.category || (categories[0] || 'Other'))
    setType(entry?.type || 'Expense')
    setError('')
    // trigger enter animation
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [entry, categories])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!entry) return null

  function handleClose() {
    setVisible(false)
    // wait for animation to finish then call parent's onClose
    setTimeout(() => onClose && onClose(), 180)
  }

  function save() {
    if (!description.trim()) {
      setError('Description is required')
      return
    }
    const num = Number(amount)
    if (Number.isNaN(num) || num < 0) {
      setError('Amount must be a number >= 0')
      return
    }
    const updated = { ...entry, description: description.trim(), amount: num, category, type }
    // call save immediately; parent may unmount modal — we don't animate on save
    onSave && onSave(updated)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`modal-overlay ${visible ? 'show' : ''}`} onClick={handleClose} />

      <div ref={panelRef} className={`modal-panel relative bg-white dark:bg-slate-800 text-slate-900 dark:text-gray-100 rounded p-6 w-full max-w-md ${visible ? 'show' : ''}`} role="dialog" aria-modal="true">
  <button className="modal-close absolute right-3 top-3 text-sm" onClick={handleClose} aria-label="Close"><CloseIcon className="w-4 h-4" /></button>
        <h3 className="text-lg font-semibold mb-3">Edit Entry</h3>

        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

        <label className="block text-sm modal-label">Description</label>
        <input className="w-full border p-2 rounded mt-1 mb-2 modal-input" placeholder="e.g. Grocery" value={description} onChange={e => setDescription(e.target.value)} />

        <label className="block text-sm modal-label">Amount</label>
        <input type="number" step="0.01" className="w-full border p-2 rounded mt-1 mb-2 modal-input" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />

        <label className="block text-sm modal-label">Category</label>
        {categories.length ? (
          <select className="w-full border p-2 rounded mt-1 mb-2 modal-input" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        ) : (
          <input className="w-full border p-2 rounded mt-1 mb-2 modal-input" value={category} onChange={e => setCategory(e.target.value)} />
        )}

        <label className="block text-sm modal-label">Type</label>
        <select className="w-full border p-2 rounded mt-1 mb-4 modal-input" value={type} onChange={e => setType(e.target.value)}>
          <option>Expense</option>
          <option>Income</option>
        </select>

        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded border btn-cancel" onClick={handleClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
