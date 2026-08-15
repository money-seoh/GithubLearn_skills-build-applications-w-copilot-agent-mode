import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Competition / weekly standings" title="Leaderboard" detail="Consistency compounds. See who is setting the pace." /><DataState error={error} empty={!entries.length} label="rankings" /><div className="leaderboard-list">{entries.map((entry, index) => <article className={`leader-row rank-${index + 1}`} key={entry._id || entry.rank}><span className="rank-number">{String(entry.rank || index + 1).padStart(2, '0')}</span><span className="avatar">{initials(entry.user?.name)}</span><div className="leader-name"><strong>{entry.user?.name || 'Athlete'}</strong><span>{entry.team?.name || 'Independent'}</span></div><div className="leader-streak">{entry.streakDays} day streak</div><strong className="leader-points">{entry.points} <small>pts</small></strong></article>)}</div></section>
}
const initials = (name = 'OF') => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, label }) { if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }