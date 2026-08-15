import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchEndpoint } from '../api.js'

const activitiesEndpoint = `${apiBaseUrl}/api/activities/`

export default function Activities() {
  const [activities, setActivities] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { fetchEndpoint(activitiesEndpoint, 'activities').then(setActivities).catch((reason) => setError(reason.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Pulse / latest movement" title="Activity feed" detail="A live read on the work your crew is putting in." /><DataState error={error} empty={!activities.length} loading={loading} label="activities" /><div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id || `${activity.type}-${activity.completedAt}`}><div className="activity-symbol">{activity.type?.slice(0, 1) || 'A'}</div><div className="activity-main"><strong>{activity.type}</strong><span>{activity.user?.name || 'OctoFit athlete'}</span></div><div className="activity-value"><strong>{activity.durationMinutes} min</strong><span>{activity.caloriesBurned} kcal</span></div><time>{formatDate(activity.completedAt)}</time></article>)}</div></section>
}
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, loading, label }) { if (loading) return <div className="empty-state">Loading {label}…</div>; if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }
function formatDate(value) { return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) : 'Today' }