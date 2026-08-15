import mongoose from 'mongoose'

import { connectionString } from '../config/database.js'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Seed the octofit_db database with test data')
    console.log('Connected to octofit_db')

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        role: 'athlete',
        fitnessGoal: 'Improve 10K pace',
        weeklyTargetMinutes: 240,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'team captain',
        fitnessGoal: 'Build strength endurance',
        weeklyTargetMinutes: 300,
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        role: 'athlete',
        fitnessGoal: 'Complete first triathlon',
        weeklyTargetMinutes: 360,
      },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crushers',
        motto: 'Every mile counts',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Iron Octos',
        motto: 'Lift smart, recover smarter',
        members: [users[1]._id],
      },
    ])

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 420,
        completedAt: new Date('2026-08-11T13:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 510,
        completedAt: new Date('2026-08-12T22:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 75,
        caloriesBurned: 680,
        completedAt: new Date('2026-08-13T12:15:00Z'),
      },
    ])

    await LeaderboardEntry.insertMany([
      {
        user: users[2]._id,
        team: teams[0]._id,
        rank: 1,
        points: 1480,
        streakDays: 12,
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        rank: 2,
        points: 1325,
        streakDays: 9,
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        rank: 3,
        points: 1190,
        streakDays: 7,
      },
    ])

    await Workout.insertMany([
      {
        title: 'Tempo Builder',
        description: 'A steady run with controlled surges for pace development.',
        level: 'Intermediate',
        durationMinutes: 45,
        focusAreas: ['Cardio', 'Speed'],
        exercises: ['10-minute warmup jog', '4 tempo intervals', 'Cooldown mobility'],
      },
      {
        title: 'Total Body Strength Circuit',
        description: 'Compound movements for strength endurance and core stability.',
        level: 'Beginner',
        durationMinutes: 35,
        focusAreas: ['Strength', 'Core'],
        exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Plank holds'],
      },
      {
        title: 'Triathlon Brick Session',
        description: 'Bike-to-run transition practice for multisport conditioning.',
        level: 'Advanced',
        durationMinutes: 80,
        focusAreas: ['Endurance', 'Transitions'],
        exercises: ['60-minute ride', '15-minute transition run', 'Stretch reset'],
      },
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
