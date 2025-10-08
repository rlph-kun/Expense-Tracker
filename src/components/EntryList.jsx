import React from 'react'
import { TrashIcon } from './Icons'

function Row({ e, onRemove, onEdit }) {
  return (
  <div className="flex justify-between items-center p-3 rounded-lg hover:shadow transition bg-white dark:bg-slate-800 border dark:border-slate-700">
      <div>
        <div className="font-medium entry-title"><button className="text-left w-full" onClick={() => onEdit && onEdit(e)}>{e.description}</button></div>
  <div className="text-sm entry-sub">{e.category} • {new Date(e.date).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-3">
  <div className={"font-semibold text-lg " + (e.type === 'Income' ? 'text-green-600' : 'text-red-600')}>{e.type === 'Income' ? '+' : '-'}₱{e.amount.toFixed(2)}</div>
  <button className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1" onClick={() => onRemove(e.id)}><TrashIcon className="w-4 h-4" />Delete</button>
      </div>
    </div>
  )
}

export default function EntryList({ entries, onRemove, onEdit }) {
  if (!entries.length) return <div className="text-center text-gray-500 dark:text-gray-400 py-6">No entries yet — add your first one above.</div>
  return (
    <div className="space-y-3">
      {entries.map(e => <Row key={e.id} e={e} onRemove={onRemove} onEdit={onEdit} />)}
    </div>
  )
}
