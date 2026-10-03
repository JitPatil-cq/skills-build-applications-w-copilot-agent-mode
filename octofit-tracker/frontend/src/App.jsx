import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities" aria-label="Octofit home">
          <img src={logo} alt="" />
          <span className="brand-name">Octofit</span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-caption">TEAM TRACKER</span>
        </NavLink>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="workspace">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>Move well. Move together.</span>
        <span className="api-origin">API {API_BASE_URL.replace(/\/api$/, '')}</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/activities" replace />} />
        <Route path="activities" element={<Activities />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="users" element={<Users />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/activities" replace />} />
      </Route>
    </Routes>
  )
}

export default App
