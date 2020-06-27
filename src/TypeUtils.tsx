export type ValueOf<T> = T[keyof T]

export type WeaponStats = {
  attack: number
  flame: number
  chill: number
  lightning: number
  cyclone: number
  smash: number
  exorcism: number
  beast: number
  scale: number
}
export type WeaponStatsSP = {
  sp: number
}
export type WeaponStatsDurability = {
  durability: number
}
export type WeaponStatsAll = WeaponStats & WeaponStatsSP & WeaponStatsDurability

export type GuideStepEvolution = {
  type: "evolution"
  description: string
  weaponId: number
  stats: WeaponStatsAll
}
export type GuideStepLevelUp = {
  type: "level_up"
  chapter: boolean //If the player follows the guide from chapter 1
  levels: number
  description: string
}
export type GuideStepSynth = {
  type: "synth"
  description: string
  stats: WeaponStatsAll //Target stats after synth
}





export type WEAPON_TYPE = "wrench" | "gun" | "club" | "sword" | "bracelet"
export type CHARACTER = "max" | "monica"
export type ABILITY = "wealth" | "poverty" | "poison" | "stop" | "steal" | "critical" | "durable" | "fragile" | "absorb" | "heal" | "dark" | "abs up"
export type STATS = {
  at: number
  fl: number
  ch: number
  li: number
  cy: number
  sm: number
  ex: number
  be: number
  sc: number
  sp: number
}
export type TABLE_WEAPONS = {
  id: number
  name: string
  description: string
  type: WEAPON_TYPE
  character: CHARACTER
  abs: number
  sp: number
  combo: number
  attack_type: string
  ability: ABILITY[]
  base_stats: STATS
  max_stats: STATS
}
export type TABLE_BUILD_UP = {
  from: number,
  to: number
}

export type DB = {
  weapons: TABLE_WEAPONS[]
  build_up: TABLE_BUILD_UP[]
}

export type Budget = 'abs' | 'gilda' | 'optimized'