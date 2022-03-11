import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { getJdOrder } from '@/apis/order'
import { IGetJDOrderInfo } from '@/apis/models/orderModel'
import './orderDetail.less'
const OrderDetail = () => {
	const location = useLocation()
	// console.log(location)
	const [orderInfo, setOrderInfo] = useState<IGetJDOrderInfo>({
		jdDeliveryAddressBean: {
			aName: '',
			daDetailAddress: '',
			daMobile: '',
			daName: ''
		},
		jdInvoiceBean: { regCompanyName: '' },
		jdOrder: { createOrderTime: '', finishTime: '' },
		jdOrderId: '',
		orderCode: 0,
		orderFreight: 0,
		orderPrice: 0,
		orderStateDesc: '',
		orderSum: 0,
		skuBeanList: [
			{
				skuImgUrl: '',
				price: 0,
				num: '',
				name: '',
				skuId: ''
			}
		]
	})
	useEffect(() => {
		const jdOrderId = location.search.split('?id=')[1]
		getJdOrder({ jdOrderId }).then(res => {
			if (res.resultCode === 1) {
				setOrderInfo(res.data)
			}
		})
	}, [])
	return (
		<div className="order-detail">
			<p className="order-state common-p">{orderInfo.orderStateDesc}</p>
			<div className="order-address common common-p">
				<p className="address-da-name">
					{orderInfo.jdDeliveryAddressBean.daName}
					<span>
						{orderInfo.jdDeliveryAddressBean.daMobile.substring(0, 3) +
							'****' +
							orderInfo.jdDeliveryAddressBean.daMobile.substring(7, 11)}
					</span>
				</p>
				<p className="address-name">
					{orderInfo.jdDeliveryAddressBean.aName + orderInfo.jdDeliveryAddressBean.daDetailAddress}
				</p>
			</div>
			<div className="common goods-item flex-start">
				<div className="goods-img">
					<img src={orderInfo.skuBeanList[0].skuImgUrl} alt="" />
				</div>
				<div className="goods-info">
					<p>{orderInfo.skuBeanList[0].name}</p>
					<div className="flex-space common-p">
						<p>￥{orderInfo.skuBeanList[0].price}</p>
						<p>x{orderInfo.skuBeanList[0].num}</p>
					</div>
				</div>
			</div>
			<div className="common common-p">
				<p>订单编号：{orderInfo.orderCode}</p>
				<p>下单时间：{orderInfo.jdOrder.createOrderTime}</p>
				<p>发票类型：{orderInfo.jdInvoiceBean.regCompanyName}</p>
			</div>
			<div className="common common-p">
				<p className="flex-space">商品总额：<span>￥{orderInfo.orderPrice * Number(orderInfo.skuBeanList[0].num)}</span></p>
				<p className="flex-space">运费：<span>￥{orderInfo.orderFreight}</span></p>
				<p className="order-pay-sum">实付款：<span>{orderInfo.orderSum}</span></p>
			</div>
		</div>
	)
}

export default OrderDetail
