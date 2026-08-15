import express from 'express'
import cors from 'cors'

import { connectDatabase } from './config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceNAME = process.env.CODESPACE_NAME
const baseUrl = codespaceNAME
  ? `https://${codespaceNAME}-8000.app.github.dev`
  : `http://localhost:${port}`
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceNAME ? [`https://${codespaceNAME}-5173.app.github.dev`] : []),
]

const routeHandlers = {
  users: '/api/users/',
  teams: '/api/teams/',
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  workouts: '/api/workouts/',
} as const

app.use(express.json())
app.use(cors({ origin: allowedOrigins }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl, mongoUri })
})

app.get(routeHandlers.users, async (_request, response, next) => {
  try {
    const users = await User.find().sort({ name: 1 })
    response.json({ resource: 'users', data: users })
  } catch (error) {
    next(error)
  }
})

app.get(routeHandlers.teams, async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email').sort({ name: 1 })
    response.json({ resource: 'teams', data: teams })
  } catch (error) {
    next(error)
  }
})

app.get(routeHandlers.activities, async (_request, response, next) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').sort({ completedAt: -1 })
    response.json({ resource: 'activities', data: activities })
  } catch (error) {
    next(error)
  }
})

app.get(routeHandlers.leaderboard, async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ rank: 1 })
    response.json({ resource: 'leaderboard', data: leaderboard })
  } catch (error) {
    next(error)
  }
})

app.get(routeHandlers.workouts, async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ level: 1, title: 1 })
    response.json({ resource: 'workouts', data: workouts })
  } catch (error) {
    next(error)
  }
})

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

await connectDatabase(mongoUri)

app.listen(port, () => {
  console.log(`OctoFit API listening on ${baseUrl}`)
})