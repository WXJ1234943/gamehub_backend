import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { authRoutes } from './routes/auth.js'
import { gameRoutes } from './routes/game.js'
import { orderRoutes } from './routes/order.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`)
  })
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/game', gameRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/user', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.json({ code: 401, msg: 'Unauthorized', data: null })
  try {
    const decoded = jwt.verify(token, 'gamehub-secret-2026')
    const user = mockUsers.get(decoded.userId)
    if (user) return res.json({ code: 0, msg: 'ok', data: user })
  } catch {}
  res.json({ code: 401, msg: 'Token expired', data: null })
})

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ code: 500, msg: 'Internal server error', data: null })
})

app.listen(PORT, () => {
  console.log(`GameHub Server running at http://localhost:${PORT}`)
})

export const mockUsers = new Map()
mockUsers.set('u1001', {
  userId: 'u1001',
  username: '游戏玩家',
  avatar: '🎮',
  channel: 'wechat',
  coinBalance: 666,
})
