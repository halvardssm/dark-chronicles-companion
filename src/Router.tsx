import * as React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { Main } from "./pages/Main"
import { Guide } from './pages/Guide'
import { Header } from './components/Header'
import { Container } from '@material-ui/core'

export const ROUTE_HOME = "/"
export const ROUTE_GUIDE = "/guide/:id"
export const routes = [
	{
		path: ROUTE_HOME,
		name: "Main",
		exact: true,
		component: Main,
	},
	{
		path: ROUTE_GUIDE,
		name: "Guide",
		exact: true,
		component: Guide,
	},
]

export const Router: React.FC = (props) => {
	return (
		<BrowserRouter>
			<Header />
			<Container id="app-root" >

				<Switch>
					{routes.map((props, i) => (
						<Route key={i} {...props} />
					))}
					<Redirect to={ROUTE_HOME} />
				</Switch>
			</Container>
		</BrowserRouter>
	)
}
