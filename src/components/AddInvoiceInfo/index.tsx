import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { ActionBar, Cell, Field, Radio, Toast } from 'react-vant'
import { IAddJDInvoiceInfoModel, IGetInvoiceInfoListItem } from '@/apis/models/invoiceModel'
import { getInvoiceInfoList } from '@/apis/invoice'

interface IProps {
	onSubmit: (p: IGetInvoiceInfoListItem) => void
	invoiceInfoRef: any
	list: IGetInvoiceInfoListItem[]
}

type IName = 'regCompanyName' | 'regCode' | 'invoiceEmail' | 'selectedInvoiceTitle'

const Index = (props: IProps) => {
	useImperativeHandle(props.invoiceInfoRef, () => params)
	const initParams = {
		selectedInvoiceTitle: 4, // 抬头类型：4：个人 5：单位
		invoiceType: 3, // 发票类型（2增值税专用发票；3 电子票） 当发票类型为2时，开票方式只支持2集中开票
		invoiceContent: 1, // 1:明细，100：大类  备注:若增值税专用发票则只能选1 明细
		invoiceState: 4, // 开票方式(2为集中开票，4 订单完成后开票)
		regCompanyName: '', // 专票资质公司名称 该字段必填。发票抬头
		regCode: '', // 专票资质纳税人识别号 该字段必填
		invoiceEmail: '', // 开票人邮箱
		invoiceCode: 0,
		invoicePhone: ''
	}
	const [params, setParams] = useState(props.list[0] || initParams)
	// const [personalList] = useState(() => props.list.filter(item => item.selectedInvoiceTitle === 4))
	// const [companyList] = useState(() => props.list.filter(item => item.selectedInvoiceTitle === 5))
	// const [params, setParams] = useState({
	// 	selectedInvoiceTitle: 4, // 抬头类型：4：个人 5：单位
	// 	invoiceType: 3, // 发票类型（2增值税专用发票；3 电子票） 当发票类型为2时，开票方式只支持2集中开票
	// 	invoiceContent: 1, // 1:明细，100：大类  备注:若增值税专用发票则只能选1 明细
	// 	invoiceState: 4, // 开票方式(2为集中开票，4 订单完成后开票)
	// 	regCompanyName: '', // 专票资质公司名称 该字段必填。发票抬头
	// 	regCode: '', // 专票资质纳税人识别号 该字段必填
	// 	invoiceEmail: '' // 开票人邮箱
	// })
	// const [list, setList] = useState<IGetInvoiceInfoListItem[]>([])
	// useEffect(() => {
	// 	getInvoiceInfoList().then(res => {
	// 		if (res.resultCode === 1) {
	// 			if (!res.data.length) {
	// 				setParams(p => ({ ...p, regCompanyName: '请填写发票信息' }))
	// 			} else {
	// 				setParams(res.data[0])
	// 			}
	// 			setList([...res.data])
	// 		}
	// 	})
	// }, [])
	const onChange = (val: string | number, name: IName) => {
		if (name === 'selectedInvoiceTitle') {
			setParams({ ...initParams, selectedInvoiceTitle: val as number })
		} else {
			setParams({ ...params, [name]: val })
		}
	}
	// 在发票抬头输入完之后
	const onBlur = () => {
		const arr = props.list.filter(
			item =>
				item.selectedInvoiceTitle === params.selectedInvoiceTitle &&
				item.regCompanyName === params.regCompanyName
		)
		if (arr.length) {
			setParams(arr[0])
		} else {
			onClear()
		}
	}
	// 在清空发票抬头时
	const onClear = () => {
		setParams(p => ({ ...p, regCode: '', invoiceEmail: '' }))
	}
	const submit = () => {
		if (!params.regCompanyName) {
			return Toast('发票抬头不能为空')
		}
		if (params.selectedInvoiceTitle === 5 && !params.regCode) {
			return Toast('单位税号不能为空')
		}
		if (!params.invoiceEmail) {
			return Toast('邮箱不能为空')
		}
		props.onSubmit(params)
	}
	return (
		<>
			<Cell.Group>
				<Field label="发票类型" value="普通发票" readonly />
				<Field label="抬头类型">
					<Radio.Group
						direction="horizontal"
						value={params.selectedInvoiceTitle}
						onChange={val => onChange(val, 'selectedInvoiceTitle')}
					>
						<Radio name={4}>个人</Radio>
						<Radio name={5}>单位</Radio>
					</Radio.Group>
				</Field>
				<Field
					label="发票抬头"
					placeholder="请输入发票抬头"
					clearable
					required
					value={params.regCompanyName}
					onChange={val => onChange(val, 'regCompanyName')}
					onBlur={onBlur}
					onClear={onClear}
				/>
				{params.selectedInvoiceTitle === 5 ? (
					<Field
						label="单位税号"
						placeholder="请输入单位税号"
						clearable
						required
						value={params.regCode}
						onChange={val => onChange(val, 'regCode')}
					/>
				) : (
					''
				)}
				<Field
					label="接收邮箱"
					placeholder="请输入发票接收邮箱"
					clearable
					required
					value={params.invoiceEmail}
					onChange={val => onChange(val, 'invoiceEmail')}
				/>
			</Cell.Group>
			<ActionBar>
				<ActionBar.Button type="danger" text="确定" onClick={() => submit()} />
			</ActionBar>
		</>
	)
}
// export default forwardRef(Index)
export default Index
