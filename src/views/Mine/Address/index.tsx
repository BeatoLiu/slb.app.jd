import React, { useEffect } from 'react'
import { auth } from '@/components/wrapper/auth'
import { ActionBar, Button, Dialog, Icon, SwipeCell, Toast } from 'react-vant'
import { useNavigate } from 'react-router'
import './index.less'
import { useGetJDDeliveryAddress } from '@/hooks/useGetJDDeliveryAddress'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressInfo, setAddressList } from '@/store/actions/goods'
import { deleteJDDeliveryAddressByDaCode, updateJDDeliveryAddress } from '@/apis/address'
import { IRootState } from '@/store'

function Index() {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const { list, setList } = useGetJDDeliveryAddress()
	const addressInfo = useSelector((state: IRootState) => state.goods.addressInfo)
	// const addressList = useSelector((state: IRootState) => state.goods.addressList)
	const goNext = () => {
		navigate('/mine/address/add')
	}
	const chooseItem = (addressInfo: GetJDDeliveryAddressMode) => {
		console.log(location.state.from)
		if (location.state.from === 'submit') {
			dispatch(setAddressInfo({ addressInfo }))
			navigate('/productDetail/submit', { replace: true })
			// console.log(addressInfo)
		}
	}
	const deleteItem = (daCode: number, idx: number) => {
		Dialog.confirm({
			title: '警告',
			message: '确定要删除该条记录吗'
		}).then(() => {
			deleteJDDeliveryAddressByDaCode({ daCode }).then(res => {
				if (res.resultCode === 1) {
					Toast('操作成功')
					list.splice(idx, 1)
					dispatch(setAddressList({ addressList: list }))
					setList([...list])
					// 如果删除的是之前买东西所选中的地址，则将选中地址替换掉
					if (addressInfo.daCode === daCode) {
						dispatch(setAddressInfo({ addressInfo: list[0] || {} }))
					}
				}
			})
		})
	}

	const updateAddress = (item: GetJDDeliveryAddressMode) => {
		// list.forEach(i => {i.daAcquiesceType = 0})
		item.daAcquiesceType = 1
		updateJDDeliveryAddress(item).then(res => {
			// console.log(res,res.resultCode === 1)
			if (res.resultCode === 1) {
				Dialog.alert({
					message: '设置成功'
				}).then(() => {
					list.forEach(i => {
						i.daAcquiesceType = 0
					})
					item.daAcquiesceType = 1
					dispatch(setAddressList({ addressList: list }))
					setList([...list])
				})
				// Toast.success('新建成功')
			}
		})
	}

	return (
		<div className="address-list">
			{list.map((item, idx) => {
				return (
					<SwipeCell
						key={item.daCode}
						rightAction={
							<div className="btn-list">
								<Button square type="danger" onClick={() => deleteItem(item.daCode, idx)}>
									删除
								</Button>
								{/*{!item.daAcquiesceType ? (*/}
								{/*	<Button square type="info" onClick={() => updateAddress(item)}>*/}
								{/*		设为默认*/}
								{/*	</Button>*/}
								{/*) : (*/}
								{/*	''*/}
								{/*)}*/}
							</div>
						}
					>
						<div className="flex-space address-item">
							<div className="address-content" onClick={() => chooseItem(item)}>
								<p className="a-name">
									{item.daAcquiesceType ? <span className="da-acquiesce">默认</span> : ''}
									{item.aName}
								</p>
								<p className="da-detail-address">{item.daDetailAddress}</p>
								<p className="da-info">
									{item.daName}
									<span className="da-mobile">
										{item.daMobile.substring(0, 3) + '****' + item.daMobile.substring(7, 11)}
									</span>
								</p>
							</div>
							<Icon
								name="edit"
								size={20}
								onClick={() => navigate('/mine/address/add', { state: item })}
							/>
						</div>
					</SwipeCell>
				)
			})}
			<ActionBar>
				<ActionBar.Button icon="plus" type="danger" text="新建地址" onClick={() => goNext()} />
			</ActionBar>
		</div>
	)
}

export default auth(Index)
