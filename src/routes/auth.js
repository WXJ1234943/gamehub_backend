import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { mockUsers } from '../index.js'

const router = Router()
const SECRET = 'gamehub-secret-2026'
const REFRESH_SECRET = 'gamehub-refresh-2026'
const AES_KEY = Buffer.from('gamehub2026sec!!', 'utf8')

function aesDecrypt(encryptedBase64) {
  const decipher = crypto.createDecipheriv('aes-128-ecb', AES_KEY, null)
  let dec = decipher.update(encryptedBase64, 'base64', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

router.post('/login', (req, res) => {
  const encryptedData = req.body?.data
  if (!encryptedData) {
    return res.json({ code: 400, msg: '参数缺失', data: null })
  }
  let payload
  try {
    payload = JSON.parse(aesDecrypt(encryptedData))
  } catch {
    return res.json({ code: 401, msg: '数据解密失败', data: null })
  }
  const { channel, code } = payload
  if (!channel || !code) {
    return res.json({ code: 400, msg: '参数缺失', data: null })
  }
  const match = /^mock_(wechat|qq)_\d+$/.exec(code)
  if (!match) {
    return res.json({ code: 401, msg: '授权码格式非法', data: null })
  }
  const codeChannel = match[1]
  if (codeChannel !== channel) {
    return res.json({ code: 401, msg: '渠道不匹配', data: null })
  }
  const user = {
    userId: 'u1001',
    username: '游戏玩家',
    avatar: '🎮',
    channel,
    coinBalance: 666,
  }
  mockUsers.set(user.userId, user)
  const token = jwt.sign({ userId: user.userId, channel }, SECRET, { expiresIn: '2h' })
  const refreshToken = jwt.sign({ userId: user.userId }, REFRESH_SECRET, { expiresIn: '7d' })
  return res.json({
    code: 0,
    msg: '登录成功',
    data: { token, refreshToken, expiresIn: 7200, user },
  })
})

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.json({ code: 400, msg: 'refreshToken缺失', data: null })
  }
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET)
    const token = jwt.sign({ userId: decoded.userId }, SECRET, { expiresIn: '2h' })
    return res.json({
      code: 0,
      msg: 'ok',
      data: { token, expiresIn: 7200 },
    })
  } catch {
    return res.json({ code: 401, msg: 'refreshToken已过期', data: null })
  }
})

router.post('/logout', (req, res) => {
  return res.json({ code: 0, msg: '已退出登录', data: null })
})

export const authRoutes = router
