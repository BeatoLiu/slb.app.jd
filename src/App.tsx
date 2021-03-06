import React from 'react'
import Routes from './routes'
import { ConfigProvider, NavBar } from 'react-vant'
import { useLocation, useNavigate } from 'react-router'
import { routes } from './routes'
import { getPageTitle } from '@/utils'
import './App.less'

const themeVars = {
	'--rv-button-primary-background-color': '#39b9b9',
	'--rv-button-primary-border-color': '#39b9b9'
}
const arr = getPageTitle(routes)
const App: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location
	const isNeedArrow = () => {
		return !['/', '/mine'].includes(pathname)
	}

	const isNeedBg = () => {
		return ['/'].includes(pathname)
	}
	// console.log(location, routes)

	const getNavTitle = () => {
		// console.log(arr.filter(item => item.path === pathname))
		const routeObj = arr.filter(item => item.path === pathname)
		return routeObj.length ? arr.filter(item => item.path === pathname)[0].title : '404'
	}
	const goBack = () => {
		navigate(-1)
	}
	return (
		<div className="app">
			<ConfigProvider themeVars={themeVars}>
				<header className={isNeedBg() ? 'is-need-bg app-header' : 'app-header'}>
					<NavBar fixed title={getNavTitle()} leftArrow={isNeedArrow()} onClickLeft={() => goBack()} />
				</header>
				<div style={{ marginTop: '46px' }}>
					<Routes />
				</div>
			</ConfigProvider>
		</div>
	)
}

export default App
