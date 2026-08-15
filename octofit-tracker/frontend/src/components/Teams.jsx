import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api.js'

const teamsEndpoint = `${apiBaseUrl}/api/teams/`

export default function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { fetch(teamsEndpoint).then((response) => { if (!response.ok) throw new Error(`Unable to load teams (${response.status})`); return response.json() }).then((payload) => setTeams(normalizeCollection(payload))).catch((reason) => setError(reason.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Collective / shared momentum" title="Teams" detail="Find your people and make the next session count." /><DataState error={error} empty={!teams.length} loading={loading} label="teams" /><div className="team-grid">{teams.map((team, index) => <article className="team-card" key={team._id || team.name}><span className="team-index">0{index + 1}</span><h3>{team.name}</h3><p>{team.motto}</p><div className="team-meta"><span>{team.members?.length || 0} members</span><span className="team-arrow">→</span></div></article>)}</div></section>
}
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, loading, label }) { if (loading) return <div className="empty-state">Loading {label}…</div>; if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }