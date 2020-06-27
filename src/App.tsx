import * as React from "react"
import { Router } from "./Router"
import { CssBaseline, Container } from '@material-ui/core'
import { Header } from './components/Header'

export const App: React.FC = () => (
	<React.Fragment>
		<CssBaseline />

		<Router />
	</React.Fragment>
)
