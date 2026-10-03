import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function CollectionPage({ title, description, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint, reloadKey])

  function reload() {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / TRACKER</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="page-tools">
          <span className="record-count" aria-live="polite">
            {loading ? 'Loading' : `${records.length} ${records.length === 1 ? 'record' : 'records'}`}
          </span>
          <button
            className="refresh-button"
            type="button"
            onClick={reload}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="collection-panel">
        {error ? (
          <div className="request-error" role="alert">
            <strong>Could not load {title.toLowerCase()}.</strong>
            <span>{error}</span>
            <button type="button" onClick={reload}>
              Try again
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="tracker-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="table-message" colSpan={columns.length}>
                      Loading {title.toLowerCase()}...
                    </td>
                  </tr>
                ) : records.length ? (
                  records.map((record, index) => (
                    <tr key={record._id ?? record.id ?? `${endpoint}-${index}`}>
                      {columns.map((column) => (
                        <td key={column.key}>
                          {column.render
                            ? column.render(record, index)
                            : record[column.key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="table-message empty-message" colSpan={columns.length}>
                      <span className="empty-mark" aria-hidden="true">0</span>
                      <strong>No {title.toLowerCase()} yet</strong>
                      <span>New entries will appear here when they are added.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage