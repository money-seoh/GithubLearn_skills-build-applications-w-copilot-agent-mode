import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '★' },
  { to: '/teams', label: 'Teams', icon: '◎' },
  { to: '/users', label: 'Athletes', icon: '◌' },
  { to: '/workouts', label: 'Workouts', icon: '▦' },
]

export default function App() {
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/activities" aria-label="OctoFit home"><span className="brand-mark">O</span><span>OctoFit <strong>Tracker</strong></span></NavLink><span className="environment-pill">LIVE TRAINING GRID</span></header><div className="app-layout"><aside className="sidebar" aria-label="Primary navigation"><div className="sidebar-intro"><span className="eyebrow">Command center</span><h1>Move with purpose.</h1><p>One place for your people, pace, and progress.</p></div><nav className="nav-list" aria-label="OctoFit sections">{navigation.map((item) => <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} key={item.to} to={item.to}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</NavLink>)}</nav><div className="sidebar-footer"><span className="status-dot" /> API connected</div></aside><main className="main-content"><Routes><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate replace to="/activities" />} /></Routes></main></div></div>
}