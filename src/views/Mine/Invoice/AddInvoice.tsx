import React, { useState } from 'react'
import { addJDInvoiceInfo } from '@/apis/invoice'
import { useNavigate } from 'react-router-dom'
import { ActionBar, Cell, Field, Radio, Toast } from 'react-vant'

const AddInvoice = () => {
	const navigate = useNavigate()
	const [params, setParams] = useState({
		selectedInvoiceTitle: 4, // 抬头类型：4：个人 5：单位
		invoiceType: 3, // 发票类型（2增值税专用发票；3 电子票） 当发票类型为2时，开票方式只支持2集中开票
		invoiceContent: 1, // 1:明细，100：大类  备注:若增值税专用发票则只能选1 明细
		invoiceState: 4, // 开票方式(2为集中开票，4 订单完成后开票)
		regCompanyName: '', // 专票资质公司名称 该字段必填。发票抬头
		regCode: '', // 专票资质纳税人识别号 该字段必填
		invoiceEmail: '' // 开票人邮箱
	})
	const onChange = (val: string, name: 'regCompanyName' | 'regCode' | 'invoiceEmail') => {
		setParams({ ...params, [name]: val })
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
		addJDInvoiceInfo(params).then(res => {
			if (res.resultCode === 1) {
				Toast('添加成功')
				navigate(-1)
			}
		})
	}
	return (
		<>
			<Cell.Group style={{ paddingBottom: '50px' }}>
				<Field label="发票类型" value="普通发票" readonly />
				<Field label="抬头类型">
					<Radio.Group
						direction="horizontal"
						value={params.selectedInvoiceTitle}
						onChange={v => setParams(p => ({ ...p, selectedInvoiceTitle: v as number }))}
					>
						<Radio name={4}>个人</Radio>
						<Radio name={5}>单位</Radio>
					</Radio.Group>
				</Field>
				<Field
					label="发票抬头"
					placeholder="请输入发票抬头"
					required
					value={params.regCompanyName}
					onChange={val => onChange(val, 'regCompanyName')}
				/>
				{params.selectedInvoiceTitle === 5 ? (
					<Field
						label="单位税号"
						placeholder="请输入单位税号"
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
					required
					value={params.invoiceEmail}
					onChange={val => onChange(val, 'invoiceEmail')}
				/>
			</Cell.Group>
			<ActionBar>
				<ActionBar.Button icon="plus" type="danger" text="提交" onClick={() => submit()} />
			</ActionBar>
		</>
	)
}

export default AddInvoice
