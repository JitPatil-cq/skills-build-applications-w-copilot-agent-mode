import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'rank',
    label: 'Rank',
    render: (_entry, index) => <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>,
  },
  {
    key: 'user',
    label: 'Member',
    render: (entry) => entry.user?.name || entry.user?.username || 'Unknown member',
  },
  {
    key: 'team',
    label: 'Team',
    render: (entry) => entry.team?.name || 'Independent',
  },
  {
    key: 'period',
    label: 'Period',
    render: (entry) => entry.period || 'All-time',
  },
  {
    key: 'points',
    label: 'Points',
    render: (entry) => <strong className="points-value">{entry.points ?? 0}</strong>,
  },
]

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="A running score of the effort your members put in."
      endpoint="leaderboard"
      columns={columns}
    />
  )
}

export default Leaderboard