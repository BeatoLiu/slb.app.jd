import React, { lazy } from 'react'
import { IRouteObject } from '.'

const Invoice = lazy(() => import('../views/Mine/Invoice'))
const InvoiceAdd = lazy(() => import('../views/Mine/Invoice/AddInvoice'))
const Address = lazy(() => import('../views/Mine/Address'))
const AddressAdd = lazy(() => import('../views/Mine/Address/Add'))
// const AddressUpdate = lazy(() => import('../views/Mine/Address/Update'))
const OrderList = lazy(() => import('../views/Mine/OrderList'))
const OrderDetail = lazy(() => import('../views/Mine/OrderList/OrderDetail'))

export const mine: IRouteObject[] = [
	{ path: '/mine/address', title: '地址管理', element: <Address /> },
	{ path: '/mine/address/add', title: '新建收货人', element: <AddressAdd /> },
	// { path: '/mine/address/update', title: '修改收货人', element: <AddressUpdate /> },
	{ path: '/mine/invoice', title: '发票管理', element: <Invoice /> },
	{ path: '/mine/invoice/add', title: '添加发票抬头', element: <InvoiceAdd /> },
	{ path: '/mine/orderList', title: '我的订单', element: <OrderList /> },
	{ path: '/mine/orderList/OrderDetail', title: '订单详情', element: <OrderDetail /> }
]
