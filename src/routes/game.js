import { Router } from 'express'
import { gameList, bannerList, hotGames, payPackages } from '../data/mock.js'

const router = Router()

router.get('/banners', (req, res) => {
  res.json({ code: 0, msg: 'ok', data: bannerList })
})

router.get('/list', (req, res) => {
  const { page = 1, pageSize = 20, category, keyword } = req.query
  let result = [...gameList]
  if (category && category !== 'all') {
    result = result.filter(g => g.category === category)
  }
  if (keyword) {
    result = result.filter(g => g.name.includes(keyword) || g.tags.some(t => t.includes(keyword)))
  }
  const start = (Number(page) - 1) * Number(pageSize)
  const list = result.slice(start, start + Number(pageSize))
  res.json({ code: 0, msg: 'ok', data: { list, total: result.length } })
})

router.get('/hot', (req, res) => {
  res.json({ code: 0, msg: 'ok', data: hotGames })
})

router.get('/packages/:gameId', (req, res) => {
  res.json({ code: 0, msg: 'ok', data: payPackages })
})

router.get('/:id', (req, res) => {
  const game = gameList.find(g => g.id === req.params.id)
  if (!game) return res.json({ code: 404, msg: '游戏不存在', data: null })
  res.json({ code: 0, msg: 'ok', data: game })
})

export const gameRoutes = router
