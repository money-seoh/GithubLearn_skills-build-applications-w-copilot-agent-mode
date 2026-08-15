import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Collective / shared momentum" title="Teams" detail="Find your people and make the next session count." /><DataState error={error} empty={!teams.length} label="teams" /><div className="team-grid">{teams.map((team, index) => <article className="team-card" key={team._id || team.name}><span className="team-index">0{index + 1}</span><h3>{team.name}</h3><p>{team.motto}</p><div className="team-meta"><span>{team.members?.length || 0} members</span><span className="team-arrow">→</span></div></article>)}</div></section>
}
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, label }) { if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }