export const bannerList = [
  { id: 'b1', title: '新人礼包', link: '/pay/game001', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="160"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%236366f1"/%3E%3Cstop offset="100%25" style="stop-color:%23e94560"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="160" rx="12" fill="url(%23g1)"/%3E%3Ctext x="200" y="80" font-size="24" fill="white" text-anchor="middle" font-weight="bold"%3E🎁 新人专属礼包%3C/text%3E%3Ctext x="200" y="110" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle"%3E首充6元送300币%3C/text%3E%3C/svg%3E' },
  { id: 'b2', title: '限时折扣', link: '/pay/game002', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="160"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e94560"/%3E%3Cstop offset="100%25" style="stop-color:%23ffb800"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="160" rx="12" fill="url(%23g2)"/%3E%3Ctext x="200" y="80" font-size="24" fill="white" text-anchor="middle" font-weight="bold"%3E⚡ 限时折扣%3C/text%3E%3Ctext x="200" y="110" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle"%3E充值立减30%25%3C/text%3E%3C/svg%3E' },
  { id: 'b3', title: '热门活动', link: '/pay/game003', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="160"%3E%3Cdefs%3E%3ClinearGradient id="g3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2307c160"/%3E%3Cstop offset="100%25" style="stop-color:%2312b7f5"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="160" rx="12" fill="url(%23g3)"/%3E%3Ctext x="200" y="80" font-size="24" fill="white" text-anchor="middle" font-weight="bold"%3E🔥 周末狂欢%3C/text%3E%3Ctext x="200" y="110" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle"%3E充值送豪礼%3C/text%3E%3C/svg%3E' },
]

export const payPackages = [
  { id: 'p1', coins: 60, bonus: 0, price: 0.1, label: '手' },
  { id: 'p2', coins: 300, bonus: 30, price: 6, label: '日卡' },
  { id: 'p3', coins: 680, bonus: 68, price: 18, popular: true, label: '周卡' },
  { id: 'p4', coins: 1280, bonus: 200, price: 30, originalPrice: 68, label: '月卡' },
  { id: 'p5', coins: 3280, bonus: 500, price: 68, originalPrice: 128 },
  { id: 'p6', coins: 6480, bonus: 1180, price: 128, originalPrice: 328, label: '豪华' },
]

const gameIcons = ['⚔️','🏰','🐉','🎴','🎲','🎯','🎮','🃏','Wizard','🛡️','🔮','⚡','🏹','💀','👾','🧙']
const gameNames = ['剑侠传说','王者征途','幻想大陆','卡牌大师','骰子战争','射箭英雄','冒险岛','魔法使','龙之谷','荣耀战魂','星辰变','雷电出击','弓箭传说','暗黑领主','像素冒险','炼金术士','战棋天下','英雄无敌','梦幻西游','三国争霸','龙城决','永恒之塔','热血江湖','天龙八部','传奇世界','问道修仙','大话修仙','九州志','仙剑奇侠','武魂天下']
const gameCategories = ['rpg','casual','card','strategy','action']

export const gameList = Array.from({ length: 60 }, (_, i) => {
  const idx = i % gameIcons.length
  const catIdx = i % gameCategories.length
  return {
    id: `game${String(i + 1).padStart(3, '0')}`,
    name: `${gameNames[i % gameNames.length]}${i >= gameNames.length ? '2' : ''}`,
    icon: gameIcons[idx],
    category: gameCategories[catIdx],
    tags: [gameCategories[catIdx].toUpperCase(), `HOT${Math.floor(Math.random() * 5) + 1}`],
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    players: `${Math.floor(Math.random() * 900 + 100)}万`,
    description: '一款深受玩家喜爱的精品游戏，快来体验吧',
    hot: i < 10,
  }
})

export const hotGames = gameList.slice(0, 6)
