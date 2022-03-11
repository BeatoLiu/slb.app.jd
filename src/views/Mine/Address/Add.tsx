import React, { useState } from 'react'
import { Field, Cell, ActionBar, Switch, Toast, Dialog } from 'react-vant'
import { auth } from '@/components/wrapper/auth'
import { addJDDeliveryAddressByMemCode, updateJDDeliveryAddress } from '@/apis/address'
import ChooseArea, { IAreaType } from '@/components/ChooseArea'
import { useLocation, useNavigate } from 'react-router'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'

type IParamsType = 'daName' | 'daMobile' | 'daDetailAddress'
const Add = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [visible, setVisible] = useState(false)
	const [params, setParams] = useState(
		(location.state as GetJDDeliveryAddressMode) || {
			daName: '',
			daMobile: '',
			aCode: 0,
			aName: '',
			daDetailAddress: '',
			daAcquiesceType: 0
		}
	)
	const setAddress = (opts: IAreaType) => {
		setParams(params => ({ ...params, ...opts }))
	}
	const paramInput = (val: string, type: IParamsType) => {
		// console.log(val)
		setParams(params => ({ ...params, [type]: val }))
	}
	//提交
	const submit = () => {
		if (!params.daName) {
			return Toast('请输入姓名')
		}
		if (!params.daMobile) {
			return Toast('请输入手机号码')
		}
		if (!params.aName) {
			return Toast('请选择所在地区')
		}
		if (!params.daDetailAddress) {
			return Toast('请输入详细地址')
		}
		if (location.state) {
			updateJDDeliveryAddress(params).then(res => {
				// console.log(res,res.resultCode === 1)
				if (res.resultCode === 1) {
					Dialog.alert({
						message: '修改成功'
					}).then(() => {
						navigate('/mine/address', { replace: true })
					})
					// Toast.success('新建成功')
				}
			})
		} else {
			addJDDeliveryAddressByMemCode(params).then(res => {
				// console.log(res,res.resultCode === 1)
				if (res.resultCode === 1) {
					Dialog.alert({
						message: '新建成功'
					}).then(() => {
						navigate('/mine/address', { replace: true })
					})
					// Toast.success('新建成功')
				}
			})
		}
	}
	return (
		<div>
			<Cell.Group>
				<Field
					label="收货人"
					placeholder="请填写收货人姓名"
					clearable={true}
					value={params.daName}
					onChange={val => paramInput(val, 'daName')}
				/>
				<Field
					label="手机号码"
					placeholder="请填写收货人手机号"
					type="tel"
					clearable
					value={params.daMobile}
					onChange={val => paramInput(val, 'daMobile')}
				/>
				<Field
					label="所在地区"
					placeholder="省市区乡镇"
					readonly
					value={params.aName}
					onClick={() => setVisible(true)}
				/>
				<Field
					label="详细地址"
					placeholder="街道、楼牌等"
					type="textarea"
					clearable
					value={params.daDetailAddress}
					onChange={val => paramInput(val, 'daDetailAddress')}
				/>
			</Cell.Group>
			<div>
				<Cell
					center
					title="设置默认地址"
					rightIcon={
						<Switch
							defaultChecked={params.daAcquiesceType === 1}
							size={18}
							activeColor="#39b9b9"
							onChange={checked => setParams(params => ({ ...params, daAcquiesceType: Number(checked) }))}
						/>
					}
				/>
			</div>
			<ActionBar safeAreaInsetBottom>
				<ActionBar.Button type="danger" text="保存" onClick={() => submit()} />
			</ActionBar>
			<ChooseArea visible={visible} setVisible={setVisible} setAddress={setAddress} />
		</div>
	)
}

export default auth(Add)
