import { formatDate } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'date',
    label: 'Date',
    render: (activity) => formatDate(activity.date),
  },
  {
    key: 'type',
    label: 'Activity',
    render: (activity) => (
      <span className="type-label">{activity.type || 'Other'}</span>
    ),
  },
  {
    key: 'user',
    label: 'Member',
    render: (activity) => activity.user?.name || activity.user?.username || 'Unknown member',
  },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (activity) => `${activity.durationMinutes ?? 0} min`,
  },
  {
    key: 'distanceKm',
    label: 'Distance',
    render: (activity) => activity.distanceKm == null ? '—' : `${activity.distanceKm} km`,
  },
  { key: 'points', label: 'Points' },
]

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="Recent movement logged across your Octofit community."
      endpoint="activities"
      columns={columns}
    />
  )
}

export default Activities