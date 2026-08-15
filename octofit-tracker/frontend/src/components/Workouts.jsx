import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)).finally(() => setLoading(false)) }, [])
  return <section className="page-section"><PageHeading eyebrow="Library / build your base" title="Workouts" detail="A considered session is a gift to your future self." /><DataState error={error} empty={!workouts.length} loading={loading} label="workouts" /><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.title}><div className="workout-top"><span className="level-label">{workout.level}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p>{workout.description}</p><div className="focus-list">{workout.focusAreas?.map((focus) => <span key={focus}>{focus}</span>)}</div><footer>{workout.exercises?.length || 0} exercises <span>→</span></footer></article>)}</div></section>
}
function PageHeading({ eyebrow, title, detail }) { return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{detail}</p></div> }
function DataState({ error, empty, loading, label }) { if (loading) return <div className="empty-state">Loading {label}…</div>; if (error) return <div className="alert alert-warning">{error}</div>; if (empty) return <div className="empty-state">No {label} to show yet.</div>; return null }