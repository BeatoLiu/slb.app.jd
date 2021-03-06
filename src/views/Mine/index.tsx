import React from 'react'
import { Cell } from 'react-vant'
import { useNavigate } from 'react-router'

const Index = () => {
	const navigate = useNavigate()
	const navList = [
		{ title: '我的订单', path: '/mine/orderList', isShow: true },
		{ title: '我的地址', path: '/mine/address', isShow: true },
		{ title: '发票抬头管理', path: '/mine/invoice', isShow: true }
	]
	return (
		<div>
			<Cell.Group>
				{navList.map(
					item =>
						item.isShow && (
							<Cell title={item.title} isLink key={item.title} onClick={() => navigate(item.path)} />
						)
				)}
			</Cell.Group>
		</div>
	)
}

export default Index
