import React from 'react'
import { auth } from '@/components/wrapper/auth'
import { ActionBar, Button, Icon, SwipeCell } from 'react-vant'
import { useNavigate } from 'react-router'
import './index.less'
import { useGetJDDeliveryAddress } from '@/hooks/useGetJDDeliveryAddress'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAddressInfo } from '@/store/actions/goods'

function Index() {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const { list } = useGetJDDeliveryAddress()
	const goNext = () => {
		navigate('/mine/address/add')
	}
	const chooseItem = (addressInfo: GetJDDeliveryAddressMode) => {
		if (location.state.from === 'submit') {
			dispatch(setAddressInfo({ addressInfo }))
			navigate('/productDetail/submit', { replace: true })
			// console.log(addressInfo)
		}
	}
	const deleteItem = (daCode: number) => {
		console.log(daCode)
	}
	return (
		<div>
			{list.map(item => {
				return (
					<SwipeCell
						key={item.daCode}
						rightAction={
							<div className="btn-list">
								<Button square type="danger" onClick={() => deleteItem(item.daCode)}>
									删除
								</Button>
								{!item.daAcquiesceType ? (
									<Button square type="info" onClick={() => deleteItem(item.daCode)}>
										设为默认
									</Button>
								) : (
									''
								)}
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
							<Icon name="edit" size={20} />
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
