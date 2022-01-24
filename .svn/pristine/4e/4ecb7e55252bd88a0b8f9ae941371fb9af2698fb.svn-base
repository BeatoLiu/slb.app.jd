import React, { lazy } from 'react'
import { IRouteObject } from '.'

const Search = lazy(() => import('../views/Search'))
const SearchList = lazy(() => import('../views/Search/List'))
const GridList = lazy(() => import('../views/Search/GridList'))
const Category = lazy(() => import('../views/Search/Category'))
const ProductDetail = lazy(() => import('../views/ProductDetail'))
const Submit = lazy(() => import('../views/ProductDetail/Submit'))

export const product: IRouteObject[] = [
	{ path: '/search', title: '搜索', element: <Search /> },
	{ path: '/search/list', title: '搜索', element: <SearchList /> },
	{ path: '/search/grid', title: '京东', element: <GridList /> },
	{ path: '/search/category', title: '京东', element: <Category /> },
	{ path: '/productDetail', title: '商品详情', element: <ProductDetail /> },
	{ path: '/productDetail/submit', title: '提交订单', element: <Submit /> }
]
