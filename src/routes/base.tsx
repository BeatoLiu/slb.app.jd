import React, { lazy } from 'react'
import { IRouteObject } from '.'
// import NotFound from '../views/NotFound'

const FooterNav = lazy(() => import('../components/FooterNav'))
const NotFound = lazy(() => import('../views/NotFound'))
const Home = lazy(() => import('../views/Home'))
const Mine = lazy(() => import('../views/Mine'))

export const base: IRouteObject[] = [
	{
		path: '/',
		element: <FooterNav />,
		children: [
			{ index: true, title: '首页', element: <Home /> },
			{ path: 'mine', title: '我的', element: <Mine /> }
		]
	},
	{
		path: '*',
		title: '404',
		element: <NotFound />
	}
]
