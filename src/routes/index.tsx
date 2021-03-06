import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Loading } from 'react-vant'
import { base } from './base'
import { mine } from './mine'
import { product } from './product'


export interface IRouteObject {
	title?: string
	caseSensitive?: boolean
	children?: IRouteObject[]
	element?: React.ReactNode
	index?: boolean
	path?: string
}

export const routes = [
	...base,
	...mine,
	...product
]

export default function App() {
	const element = useRoutes(routes)
	return <React.Suspense fallback={<Loading vertical type="spinner" color="#39b9b9" />}>{element}</React.Suspense>
}
