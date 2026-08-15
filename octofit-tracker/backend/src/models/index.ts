import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    weeklyTargetMinutes: { type: Number, required: true },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    motto: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusAreas: [{ type: String, required: true }],
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
export const Team = model('Team', teamSchema)
export const Activity = model('Activity', activitySchema)
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema)
export const Workout = model('Workout', workoutSchema)