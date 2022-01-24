import React, { lazy } from 'react'
import { IRouteObject } from '.'

const Invoice = lazy(() => import('../views/Mine/Invoice'))
const InvoiceAdd = lazy(() => import('../views/Mine/Invoice/AddInvoice'))
const Address = lazy(() => import('../views/Mine/Address'))
const AddAddress = lazy(() => import('../views/Mine/Address/Add'))

export const mine: IRouteObject[] = [
	{ path: '/mine/address', title: '地址管理', element: <Address /> },
	{ path: '/mine/address/add', title: '新建收货人', element: <AddAddress /> },
	{ path: '/mine/invoice', title: '发票管理', element: <Invoice /> },
	{ path: '/mine/invoice/add', title: '添加发票抬头', element: <InvoiceAdd /> },
]
