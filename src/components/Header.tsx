import React from "react"
import { useTranslation } from "react-i18next"
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ROUTE_HOME } from '../Router'

export const Header: React.FC = () => {
	const { t } = useTranslation()
	return (
		<AppBar id="header" position="relative">
			<Toolbar>
				<Typography>
					<Link to={ROUTE_HOME}>
						<Button>Home</Button>
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
