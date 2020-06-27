import { WeaponStats, Budget } from 'TypeUtils'
import db from './assets/db.json'

export const ABILITIES_CANCELATION_MAP = {
	poison: "",
	stop: "",
	steal: "",
	abs_up: "",
	wealth: "poverty",
	poverty: "wealth",
	durable: "fragile",
	fragile: "durable",
	absorb: "heal",
	heal: "absorb",
	critical: "dark",
	dark: "critical"
}

export const STATS_ARRAY = ["attack", "flame", "chill", "lightning", "cyclone", "smash", "exorcism", "beast", "scale"]

export const absToNextLevel = (base: number, level = 0) => base + (level ? ((level - 1) * base / 2) : 0)

export const absToLevel = (base: number, level = 0) => base + ((level * (level + 1)) / 2 - 1) * base / 2
export const absBetweenLevels = (base: number, currentLevel = 0, targetLevel = 0) => absToLevel(base, targetLevel) - absToLevel(base, currentLevel)

export const statsAfterSpectrumizing = (stats: WeaponStats, targetAttackStat: number = stats.attack) => {
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
	const result: Partial<WeaponStats> = {}
	STATS_ARRAY.map((key: any) => result[key] = targetWeapon[key] - Math.floor(0.1 * targetWeapon[key]))
	return result as WeaponStats
}

export const minReqForBuildUpMet = (currentWeapon: WeaponStats, targetWeapon: WeaponStats) => {
	const minReq = minStatsForBuildUp(targetWeapon)

	for (const stat of STATS_ARRAY) {
		if (currentWeapon[stat] < minReq[stat]) return false
	}

	return true
}

export const synthToStats = (stats: WeaponStats, targetStats: WeaponStats, budget: Budget = 'gilda') => {
	const shopingList = {}
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
			shopingList[item.id] = quantity
		}
	})

	return { totalAbs, shopingList }
}
