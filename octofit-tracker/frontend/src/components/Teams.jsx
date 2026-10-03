import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'name',
    label: 'Team',
    render: (team) => <strong>{team.name || 'Unnamed team'}</strong>,
  },
  {
    key: 'description',
    label: 'About',
    render: (team) => team.description || 'No description provided',
  },
  {
    key: 'members',
    label: 'Members',
    render: (team) => Array.isArray(team.members) ? team.members.length : 0,
  },
]

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="The crews showing up, building habits, and earning points together."
      endpoint="teams"
      columns={columns}
    />
  )
}

export default Teams