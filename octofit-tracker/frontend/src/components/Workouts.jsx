import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'title',
    label: 'Workout',
    render: (workout) => (
      <div className="workout-name">
        <strong>{workout.title || 'Untitled workout'}</strong>
        <span>{workout.description || 'No description provided'}</span>
      </div>
    ),
  },
  {
    key: 'activityType',
    label: 'Activity',
    render: (workout) => workout.activityType || 'Other',
  },
  {
    key: 'difficulty',
    label: 'Level',
    render: (workout) => workout.difficulty || 'Unspecified',
  },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (workout) => `${workout.durationMinutes ?? 0} min`,
  },
  {
    key: 'fitnessGoals',
    label: 'Goals',
    render: (workout) => Array.isArray(workout.fitnessGoals) && workout.fitnessGoals.length
      ? workout.fitnessGoals.join(', ')
      : 'All goals',
  },
]

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Ideas to help members make their next session count."
      endpoint="workouts"
      columns={columns}
    />
  )
}

export default Workouts