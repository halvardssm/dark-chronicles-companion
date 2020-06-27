import { WeaponStats, Budget } from 'TypeUtils'
import db from './assets/db.json';

export const STATS_ARRAY = ["attack", "flame", "chill", "lightning", "cyclone", "smash", "exorcism", "beast", "scale"]

export const absToNextLevel = (base: number, level = 0) => base + (level ? ((level - 1) * base / 2) : 0)

export const absToLevel = (base: number, level = 0) => base + ((level * (level + 1)) / 2 - 1) * base / 2
export const absBetweenLevels = (base: number, currentLevel = 0, targetLevel = 0) => absToLevel(base, targetLevel) - absToLevel(base, currentLevel)

export const statsAfterSpectrumizing = (stats: WeaponStats, targetAttackStat: number) => {
  const result = {}
  STATS_ARRAY.map(key => {
    if (key === "attack") {
      if (targetAttackStat && targetAttackStat >= stats[key]) {
        result[key] = Math.floor((0.25 * stats[key]) + (0.75 * (stats[key] - targetAttackStat)))
      } else {
        result[key] = Math.floor(0.25 * stats[key])
      }
    } else {
      result[key] = Math.floor(stats[key] * 0.6)
    }
  })
  return result
}

export const minStatsForBuildUp = (targetWeapon: WeaponStats) => {
  const result: Record<string, any> = {}
  STATS_ARRAY.map((key: any) => result[key] = targetWeapon[key] - Math.floor(0.1 * targetWeapon[key]))
  return result
}

export const synthToStats = (stats: WeaponStats, targetStats: WeaponStats, budget: Budget = 'gilda') => {
  const shopingList = []
  let totalAbs = 0
  STATS_ARRAY.forEach(stat => {
    const statPoints = targetStats[stat] - stats[stat]
    if (statPoints > 0) {
      const spectrumizeIndex = budget === "abs" ? db.spectrumize[stat].length - 1 : 0
      const item = db.items.find(el => el.id === db.spectrumize[stat][spectrumizeIndex])
      console.log({ stat, item, val: item.specs[stat] })
      const quantity = item.specs[stat] !== 0 ? Math.ceil(statPoints / item.specs[stat]) : 0
      const costGilda = quantity * item.price
      totalAbs += quantity
      shopingList.push({
        item,
        quantity,
        costGilda
      })
    }
  })

  return { totalAbs, shopingList }
}
