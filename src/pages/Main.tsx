import { AppBar, Button, Container, Grid, Toolbar, Typography, Card, CardMedia, CardContent, CardActions, Checkbox } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import db from '../assets/db.json'
import { synthToStats, minStatsForBuildUp } from '../utils'
import { Link } from 'react-router-dom'

export const Main: React.FC = () => {
	const { t } = useTranslation()

	// const stats = synthToStats({
	//   "attack": 44,
	//   "flame": 45,
	//   "chill": 0,
	//   "lightning": 0,
	//   "cyclone": 45,
	//   "smash": 45,
	//   "exorcism": 0,
	//   "beast": 30,
	//   "scale": 0,
	// }, {
	//   "attack": 60,
	//   "flame": 0,
	//   "chill": 0,
	//   "lightning": 0,
	//   "cyclone": 75,
	//   "smash": 60,
	//   "exorcism": 0,
	//   "beast": 60,
	//   "scale": 45,
	// })

	const stats = minStatsForBuildUp({
		"attack": 55,
		"flame": 60,
		"chill": 0,
		"lightning": 0,
		"cyclone": 0,
		"smash": 0,
		"exorcism": 0,
		"beast": 0,
		"scale": 0,
	})
	console.log(stats)

	return (
		<Container maxWidth="sm">
			<Grid container spacing={2} justify="center">

				{db.guides.map((el, i) => {

					return (<Grid key={i} item xs={12} sm={6} md={4} >
						<Link to={`guide/${el.id}`}>
							<Card>
								<CardContent >
									<Typography gutterBottom variant="h5" component="h2">
										{el.title}
									</Typography>
									<Typography>
										{el.description}
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>)
				})}

			</Grid>
		</Container>
	)
}
