import { WeaponStats, WeaponStatsAll, WeaponStatsDurability, TABLE_WEAPONS, ABILITY, DB } from '../TypeUtils'
import dbJson from "../assets/db.json"
import { absToNextLevel, absToLevel, STATS_ARRAY, absBetweenLevels, statsAfterSpectrumizing, minStatsForBuildUp, minReqForBuildUpMet, ABILITIES_CANCELATION_MAP } from '../utils'

const db = dbJson as any as DB
export class Weapon {
	info: TABLE_WEAPONS
	level: number
	currentStats: WeaponStatsAll
	abilities: Set<ABILITY> = new Set()

	constructor(
		weapon: TABLE_WEAPONS,
		stats: Partial<WeaponStatsAll> = {},
		level = 0,
		abilities: ABILITY[] = []
	) {
		this.info = weapon
		this.level = level
		this.currentStats = { ...weapon.base_stats, ...stats }
		this._addAbilities(...abilities)
	}

	* buildUp(id?: number) {
		let candidate: TABLE_WEAPONS
		if (id) {
			candidate = db.weapons.find(el => el.id === id)
		} else {
			const candidates = this.getBuildUpCandidates(true)

			if (candidates.length < 1) return []

			candidate = yield candidates
		}
		this._setStatsToMinOfNewWeaponOnBuildUp(candidate.base_stats)
		this._addAbilities(...candidate.ability)

		this.info = candidate
		this.level = 0
	}

	levelUp({ hasFollower = false } = {}) {
		const statsIncrease: Partial<WeaponStatsAll> = {
			attack: this.level < 5 ? 2 : 1,
			sp: this.info.sp + (hasFollower ? 1 : 0),
			durability: 1
		}

		this.synth(statsIncrease)

		if (this.level < 99) this.level++
	}

	synth(stats: Partial<WeaponStats>, abilities: ABILITY[] = []) {
		Object.keys(stats).forEach(el => {
			if (this.currentStats[el] + stats[el] > this.info.max_stats[el]) {
				this.currentStats[el] = this.info.max_stats[el]
			} else {
				this.currentStats[el] += stats[el]
			}
		})
		this._addAbilities(...abilities)
	}

	getAbsToNextLevel() {
		return absToNextLevel(this.info.abs, this.level)
	}

	getAbsToLevel(level: number) {
		return absBetweenLevels(this.info.abs, this.level, level)
	}


	getSynthSphere(targetAttackStat: number) {
		statsAfterSpectrumizing(this.currentStats, targetAttackStat)
	}

	getBuildUpCandidates(onlyMetRequirements = false) {
		const candidateIds = db.build_up.filter(el => el.from === this.info.id).map(el => el.to)

		const candidates = db.weapons.filter(el => candidateIds.includes(el.id))

		if (!onlyMetRequirements) {
			return candidates
		} else {
			return candidates.filter(el => minReqForBuildUpMet(this.currentStats, el.base_stats))
		}
	}

	clone() {
		return new Weapon(this.info, this.currentStats, this.level, [...this.abilities])
	}

	private _setStatsToMinOfNewWeaponOnBuildUp(stats: WeaponStatsAll) {
		STATS_ARRAY.forEach(stat => {
			if (this.currentStats[stat] < stats[stat]) {
				this.currentStats[stat] = stats[stat]
			}
		})
	}

	private _addAbilities(...abilities: ABILITY[]) {
		abilities.forEach(ability => {
			const opositeExists = this.abilities.has(ABILITIES_CANCELATION_MAP[ability])
			if (opositeExists) {
				this.abilities.delete(ABILITIES_CANCELATION_MAP[ability])
			} else {
				this.abilities.add(ability)
			}
		})
	}
}