import { ActionBar, Cell, Popup, Toast } from 'react-vant'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import AddInvoiceInfo from '@/components/AddInvoiceInfo'

import './invoice.less'
import { addJDInvoiceInfo, getInvoiceInfoList } from '@/apis/invoice'
import { IAddJDInvoiceInfoModel, IGetInvoiceInfoListItem } from '@/apis/models/invoiceModel'

interface IProps {
	invoiceRef: any
}

const Invoice = (props: IProps) => {
	// 初始化父组件ref的值
	useImperativeHandle(props.invoiceRef, () => invoiceCode)
	//是否显示pop
	const [show, setShow] = useState(false)
	// 子组件Ref
	const invoiceInfoRef = useRef<IGetInvoiceInfoListItem>()
	//选中的发票抬头名字 regCompanyName
	const [invoiceValue, setInvoiceValue] = useState('')
	//选中的发票抬头的编号
	const [invoiceCode, setInvoiceCode] = useState(0)
	// 发票抬头列表
	const [list, setList] = useState<IGetInvoiceInfoListItem[]>([])
	useEffect(() => {
		getInvoiceInfoList().then(res => {
			if (res.resultCode === 1) {
				if (!res.data.length) {
					setInvoiceValue('请填写发票信息')
				} else {
					res.data.sort((a, b) => a.selectedInvoiceTitle - b.selectedInvoiceTitle)
					setInvoiceValue(res.data[0].regCompanyName)
					setInvoiceCode(res.data[0].invoiceCode)
					setList([...res.data])
				}
			}
		})
	}, [])
	const submit = (params: IGetInvoiceInfoListItem) => {
		console.log(invoiceInfoRef.current)
		setInvoiceValue(invoiceInfoRef.current?.regCompanyName as string)
		if (!invoiceInfoRef.current?.invoiceCode) {
			addJDInvoiceInfo(params).then(res => {
				if (res.resultCode === 1) {
					setShow(false)
					setInvoiceCode(res.data.invoiceCode)
				}
			})
		} else {
			setInvoiceCode(invoiceInfoRef.current?.invoiceCode)
		}
	}
	return (
		<>
			<div className="invoice-content">
				<Cell title="发票" isLink value={invoiceValue} onClick={() => setShow(true)} />
			</div>
			<Popup
				visible={show}
				closeable
				title="发票"
				position="bottom"
				className="invoice-pop"
				style={{ height: '50%' }}
				round
				closeOnClickOverlay
				onClickOverlay={() => setShow(false)}
				onClickCloseIcon={() => setShow(false)}
			>
				<AddInvoiceInfo onSubmit={submit} invoiceInfoRef={invoiceInfoRef} list={list} />
				{/*<ActionBar>*/}
				{/*	<ActionBar.Button type="danger" text="确定" onClick={() => submit()} />*/}
				{/*</ActionBar>*/}
			</Popup>
		</>
	)
}
export default Invoice
