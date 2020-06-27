import { AppBar, Button, Container, Grid, Toolbar, Typography, Card, CardMedia, CardContent, CardActions, Checkbox, Paper, Table, TableHead, TableRow, TableCell, TableBody, List } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dbJson from '../assets/db.json'
import { synthToStats, minStatsForBuildUp } from '../utils'
import { Link, useLocation, useParams } from 'react-router-dom'
import { TABLE_GUIDE, GuideStepAll, WeaponStatsAll, GuideStepEvolution, DB } from '../TypeUtils'
import { Weapon } from '../lib/Weapon'

const db = dbJson as any as DB

export const Guide: React.FC = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const wGuide: TABLE_GUIDE = db.guides.find(el => el.id === parseInt(id)) as TABLE_GUIDE

	const weapon = new Weapon(db.weapons.find(el => el.id === wGuide.startWeapon))

	const steps = () => {
		return wGuide.steps.map((el, i) => <Card key={i} style={{ margin: '20px auto', padding: '10px' }}>
			{mapStepTypeToUI(el)}
		</Card>
		)
	}

	const mapStepTypeToUI = (step: GuideStepAll) => {
		const result = []
		result.push(
			<Typography variant='h5'>{t(step.type)}</Typography>,
			<Typography>{step.description}</Typography>,
		)

		switch (step.type) {
			case "level_up":
				for (let i = 0;i < step.levels;i++) {
					weapon.levelUp()
				}
				break

			case "synth_item":
				const items = synthToStats(weapon.currentStats, step.stats)
				result.push(mapItemsToUI(items.shopingList))
				break

			case "synth_weapon":

				break

			case "evolution":
				weapon.buildUp(step.weaponId)
				break

			default:
				break
		}

		result.push(
			mapStatsToUI(weapon.currentStats),
		)

		return <React.Fragment>{result}</React.Fragment>
	}

	const mapStatsToUI = (stats: WeaponStatsAll) => {
		return <>
			<Typography variant='h6'>{t('guide.stats')}</Typography>
			<Table style={{ margin: '5px auto' }} size="small">
				<TableBody>
					<TableRow>
						<TableCell>{t('stat_attack')}</TableCell>
						<TableCell>{stats.attack}</TableCell>
						<TableCell>{t('stat_durability')}</TableCell>
						<TableCell>{stats.durability}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('stat_flame')}</TableCell>
						<TableCell>{stats.flame}</TableCell>
						<TableCell>{t('stat_chill')}</TableCell>
						<TableCell>{stats.chill}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('stat_lightning')}</TableCell>
						<TableCell>{stats.lightning}</TableCell>
						<TableCell>{t('stat_cyclone')}</TableCell>
						<TableCell>{stats.cyclone}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('stat_smash')}</TableCell>
						<TableCell>{stats.smash}</TableCell>
						<TableCell>{t('stat_exorcism')}</TableCell>
						<TableCell>{stats.exorcism}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('stat_beast')}</TableCell>
						<TableCell>{stats.beast}</TableCell>
						<TableCell>{t('stat_scale')}</TableCell>
						<TableCell>{stats.scale}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('stat_sp')}</TableCell>
						<TableCell>{stats.sp}</TableCell>
						<TableCell>{t('abilities')}</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	}
	const mapItemsToUI = (items: Record<number, number>) => {
		console.log(items)
		return <>
			<Typography variant='h6'>{t('guide.synth_list')}</Typography>
			<Table style={{ margin: '5px auto' }} size="small">
				<TableHead>

					<TableRow>
						<TableCell>{t('guide.table.item_name')}</TableCell>
						<TableCell>{t('guide.table.item_quantity')}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(items).map((el, i) => <TableRow key={i}>
						<TableCell>{db.items.find(ell => ell.id === parseInt(el)).name}</TableCell>
						<TableCell>{items[el]}</TableCell>
					</TableRow>)}

				</TableBody>
			</Table>
		</>
	}

	return <Paper style={{ padding: '20px' }}>
		<Typography>ID: {id}</Typography>
		<Typography>{wGuide.title}</Typography>
		<Typography>{wGuide.description}</Typography>
		{mapStatsToUI(weapon.currentStats)}
		<Typography>Steps:</Typography>
		{steps()}
	</Paper>
}