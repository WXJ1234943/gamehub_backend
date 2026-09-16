import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { mockUsers } from '../index.js'

const router = Router()
const SECRET = 'gamehub-secret-2026'
const orders = new Map()
const orderList = []

router.use((req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.json({ code: 401, msg: 'Unauthorized', data: null })
  try {
    const decoded = jwt.verify(token, SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.json({ code: 401, msg: 'Token expired', data: null })
  }
})

router.post('/create', (req, res) => {
  const { gameId, packageId, channel } = req.body
  if (!gameId || !packageId) {
    return res.json({ code: 400, msg: '参数缺失11', data: null })
  }
  const packages = [
    { id: 'p1', coins: 60, bonus: 0, price: 1 },
    { id: 'p2', coins: 300, bonus: 30, price: 6 },
    { id: 'p3', coins: 680, bonus: 68, price: 18, popular: true },
    { id: 'p4', coins: 1280, bonus: 200, price: 30 },
    { id: 'p5', coins: 3280, bonus: 500, price: 68 },
    { id: 'p6', coins: 6480, bonus: 1180, price: 128 },
  ]
  const pkg = packages.find(p => p.id === packageId) || packages[0]
  const orderId = `GH${Date.now()}${Math.floor(Math.random() * 1000)}`
  const order = {
    orderId,
    gameId,
    gameName: '测试游戏',
    packageId,
    coins: pkg.coins,
    bonus: pkg.bonus,
    amount: pkg.price,
    status: 'pending',
    createdAt: new Date().toISOString(),
    channel: channel || 'wechat',
  }
  orders.set(orderId, order)
  orderList.unshift(order)
  res.json({ code: 0, msg: '创建成功', data: { orderId } })
})

router.post('/:orderId/pay', (req, res) => {
  const { orderId } = req.params
  const { channel } = req.body
  const order = orders.get(orderId)
  if (!order) return res.json({ code: 404, msg: '订单不存在', data: null })
  if (order.status !== 'pending') return res.json({ code: 400, msg: '订单状态异常', data: null })
  order.status = 'paying'
  order.channel = channel || 'wechat'
  setTimeout(() => {
    order.status = 'paid'
    order.paidAt = new Date().toISOString()
    const user = mockUsers.get(order.userId || 'u1001')
    if (user) {
      user.coinBalance += order.coins + (order.bonus || 0)
    }
  }, 3000 + Math.random() * 2000)
  res.json({
    code: 0,
    msg: '支付请求已发起',
    data: {
      orderId,
      payUrl: `https://pay.weixin.qq.com/mock/${orderId}`,
      prepayId: `prepay_${orderId}`,
    },
  })
})

router.get('/:orderId/status', (req, res) => {
  const order = orders.get(req.params.orderId)
  if (!order) return res.json({ code: 404, msg: '订单不存在', data: null })
  res.json({
    code: 0,
    msg: 'ok',
    data: { status: order.status, paidAt: order.paidAt },
  })
})

router.get('/list', (req, res) => {
  const { page = 1, pageSize = 20, status } = req.query
  let result = [...orderList]
  if (status) result = result.filter(o => o.status === status)
  const start = (Number(page) - 1) * Number(pageSize)
  const list = result.slice(start, start + Number(pageSize))
  res.json({ code: 0, msg: 'ok', data: { list, total: result.length } })
})

router.post('/:orderId/cancel', (req, res) => {
  const order = orders.get(req.params.orderId)
  if (!order) return res.json({ code: 404, msg: '订单不存在', data: null })
  if (order.status !== 'pending' && order.status !== 'paying') {
    return res.json({ code: 400, msg: '无法取消', data: null })
  }
  order.status = 'failed'
  res.json({ code: 0, msg: '已取消', data: null })
})

export const orderRoutes = router
