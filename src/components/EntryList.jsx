import React, { useState, useRef } from 'react'
import { FixedSizeList as List } from 'react-window'
import { TrashIcon } from './Icons'

function Row({ e, onRemove, onEdit }) {
  return (
  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-3 rounded-lg hover:shadow transition bg-white dark:bg-slate-800 border dark:border-slate-700">
      <div className="w-full sm:max-w-[70%]">
        <div className="font-medium entry-title"><button className="text-left w-full truncate" onClick={() => onEdit && onEdit(e)} title={e.description}>{e.description}</button></div>
    <div className="text-sm entry-sub mt-1 sm:mt-0">{e.category} • {isNaN(new Date(e.date).getTime()) ? e.date : new Date(e.date).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto justify-between">
  <div className={"font-semibold text-lg " + (e.type === 'Income' ? 'text-green-600' : 'text-red-600')}>{e.type === 'Income' ? '+' : '-'}₱{(Number(e.amount) || 0).toFixed(2)}</div>
  <button className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1" onClick={() => onRemove(e.id)}><TrashIcon className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span></button>
      </div>
    </div>
  )
}

export default function EntryList({ entries, onRemove, onEdit }) {
  const [expanded, setExpanded] = useState(false)
  const PREVIEW_COUNT = 5

  if (!entries.length) return <div className="text-center text-gray-500 dark:text-gray-400 py-6">No entries yet  add your first one above.</div>

  const toShow = expanded ? entries : entries.slice(0, PREVIEW_COUNT)

  return (
    <div>
      {!expanded && (
        <div className="space-y-3">
          {toShow.map(e => <Row key={e.id} e={e} onRemove={onRemove} onEdit={onEdit} />)}
        </div>
      )}

      {expanded && (
        // Virtualized list: each row approx 120px tall
        // If the list is relatively small, grow the container to show all items
        // so the user doesn't need to scroll inside the mini-list. For very large
        // lists, cap the height to keep a bounded viewport.
        (() => {
          const ITEM_SIZE = 120
          const AUTO_SHOW_LIMIT = 20 // show all if <= 20 items
          const maxHeight = 600
          const height = entries.length <= AUTO_SHOW_LIMIT ? entries.length * ITEM_SIZE : Math.min(maxHeight, entries.length * ITEM_SIZE)
          return (
            <div style={{ height, width: '100%' }}>
              <List
                height={height}
                itemCount={entries.length}
                itemSize={ITEM_SIZE}
                width={'100%'}
              >
                {({ index, style }) => {
                  const e = entries[index]
                  return (
                    <div style={style} key={e.id} className="p-0">
                      <Row e={e} onRemove={onRemove} onEdit={onEdit} />
                    </div>
                  )
                }}
              </List>
            </div>
          )
        })()
      )}

      {entries.length > PREVIEW_COUNT && (
        <div className="text-center mt-2">
          <button className="text-sm text-blue-600 hover:underline" onClick={() => setExpanded(v => !v)}>
            {expanded ? 'Show less' : `Show more (${entries.length - PREVIEW_COUNT} more)`}
          </button>
        </div>
      )}
    </div>
  )
}
