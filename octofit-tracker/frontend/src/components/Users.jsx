import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchEndpoint } from '../api.js'

const usersEndpoint = `${apiBaseUrl}/api/users/`

export default function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { fetchEndpoint(usersEndpoint, 'users').then(setUsers).catch((reason) => setError(reason.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Roster / your people" title="Athletes" detail="Know the people behind every personal best." /><DataState error={error} empty={!users.length} loading={loading} label="athletes" /><div className="user-table-wrap"><table className="user-table"><thead><tr><th>Name</th><th>Role</th><th>Focus</th><th>Weekly target</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.email}><td><span className="avatar">{initials(user.name)}</span><strong>{user.name}</strong><small>{user.email}</small></td><td><span className="role-label">{user.role}</span></td><td>{user.fitnessGoal}</td><td><strong>{user.weeklyTargetMinutes}</strong> min</td></tr>)}</tbody></table></div></section>
}
const initials = (name = 'OF') => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, loading, label }) { if (loading) return <div className="empty-state">Loading {label}…</div>; if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }