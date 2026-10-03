import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'name',
    label: 'Member',
    render: (user) => <strong>{user.name || user.username || 'Unnamed member'}</strong>,
  },
  {
    key: 'username',
    label: 'Username',
    render: (user) => user.username ? `@${user.username}` : '—',
  },
  { key: 'email', label: 'Email' },
  {
    key: 'fitnessGoal',
    label: 'Fitness goal',
    render: (user) => user.fitnessGoal || 'Not set',
  },
]

function Users() {
  return (
    <CollectionPage
      title="Members"
      description="People taking part in the Octofit community."
      endpoint="users"
      columns={columns}
    />
  )
}

export default Users