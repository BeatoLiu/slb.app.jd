import React, { lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { Loading } from 'react-vant'
// import FooterNav from '../components/FooterNav';

const FooterNav = lazy(() => import('../components/FooterNav'))
const NotFound = lazy(() => import('../views/NotFound'))
const Home = lazy(() => import('../views/Home'))
const Mine = lazy(() => import('../views/Mine'))
const Search = lazy(() => import('../views/Search'))
const SearchList = lazy(() => import('../views/Search/List'))
const GridList = lazy(() => import('../views/Search/GridList'))
const ProductDetail = lazy(() => import('../views/ProductDetail'))
const Submit = lazy(() => import('../views/ProductDetail/Submit'))
const Address = lazy(() => import('../views/Mine/Address'))
const AddAddress = lazy(() => import('../views/Mine/Address/Add'))

export interface IRouteObject {
	title?: string
	caseSensitive?: boolean
	children?: IRouteObject[]
	element?: React.ReactNode
	index?: boolean
	path?: string
}

export const routes: IRouteObject[] = [
	{
		path: '/',
		element: <FooterNav />,
		children: [
			{ index: true, title: '首页', element: <Home /> },
			{ path: 'mine', title: '我的', element: <Mine /> }
		]
	},
	{ path: '/search', title: '搜索', element: <Search /> },
	{ path: '/search/list', title: '搜索', element: <SearchList /> },
	{ path: '/search/grid', title: '京东', element: <GridList /> },
	{ path: '/productDetail', title: '商品详情', element: <ProductDetail /> },
	{ path: '/productDetail/submit', title: '提交订单', element: <Submit /> },
	{ path: '/mine/address', title: '地址管理', element: <Address /> },
	{ path: '/mine/address/add', title: '新建收货人', element: <AddAddress /> },
	{ path: '*', element: <NotFound /> }
]
export default function App() {
	const element = useRoutes(routes)
	return <React.Suspense fallback={<Loading vertical type="spinner" color="#39b9b9" />}>{element}</React.Suspense>
}
