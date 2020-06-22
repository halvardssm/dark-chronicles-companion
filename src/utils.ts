import { WeaponStats } from 'TypeUtils'

const absToNextLevel = (base: number, level = 0) => base + (level ? ((level - 1) * base / 2) : 0)

const absToLevel = (base: number, level = 0) => base + ((level * (level + 1)) / 2 - 1) * base / 2

const statsAfterSpectrumizing = (stats: WeaponStats, targetAttackStat?: number) => Object.keys(stats).map(key => {
  if (key === "attack") {
    if (targetAttackStat && targetAttackStat >= stats[key]) {
      stats[key] = Math.floor((0.25 * stats[key]) + (0.75 * (stats[key] - targetAttackStat)))
    } else {
      stats[key] = Math.floor(0.25 * stats[key])
    }
  } else {
    stats[key] = Math.floor(stats[key] * 0.6)
  }
})