import { Icon, Stepper, SubmitBar } from 'react-vant'
import React, { useEffect, useState } from 'react'
import lineImg from '@/assets/img/line.png'
import './submit.less'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { jdImgPath } from '@/utils/config'
import { useNavigate } from 'react-router-dom'
import { getOrderFreight } from '@/apis/home'

const Submit = () => {
	const navigate = useNavigate()
	const address = useSelector((state: IRootState) => state.goods.addressInfo)
	const goodsInfo = useSelector((state: IRootState) => state.goods.goodsInfo)
	const [buyNum, setBuyNum] = useState(1)
	const [payFactSum, setPayFactSum] = useState(goodsInfo.jdProductPriceBean.price)
	//运费
	const [freight, setFreight] = useState(0)
	useEffect(() => {
		const params = { skuId: goodsInfo.sku, num: buyNum }
		getOrderFreight({ skuNums: [params], areaId: address?.aCode }).then(res => {
			if (res.resultCode === 1) {
				const data = JSON.parse(res.data)
				setFreight(data.freight)
				setPayFactSum(buyNum * goodsInfo.jdProductPriceBean.price - data.freight)
			}
		})
	}, [buyNum])
	const onSubmit = () => {}
	return (
		<div className="product-submit">
			<div
				className="contact flex-space"
				onClick={() => {
					navigate('/mine/address', { state: { from: 'submit' } })
				}}
			>
				<div className="info">
					<p>{address.aName}</p>
					<p className="detail-address">{address.daDetailAddress}</p>
					<div className="flex-start">
						<p>{address.daName}</p>
						<p className="da-mobile">{address.daMobile}</p>
					</div>
				</div>
				<div className="right">
					<Icon name="arrow" />
				</div>
			</div>
			<div className="line">
				<img src={lineImg} alt="" />
			</div>
			<div className="flex-space goods-info">
				<div className="goods-img">
					<img src={jdImgPath + goodsInfo.imagePath} alt="" />
				</div>
				<div className="goods-container">
					<p className="goods-name">{goodsInfo.name}</p>
					<div className="flex-space">
						<p className="goods-price">{goodsInfo.jdProductPriceBean.price}</p>
						<Stepper value={buyNum} integer onChange={(val: number) => setBuyNum(val)} />
					</div>
				</div>
			</div>
			<div className="other-fee">
				<div className="flex-space">
					<p>商品金额</p>
					<p>￥{buyNum * goodsInfo.jdProductPriceBean.price}</p>
				</div>
				<div className="flex-space">
					<p>运费</p>
					<p>￥{freight}</p>
				</div>
				<div className="total-fee">
					合计：<span>￥{payFactSum}</span>
				</div>
			</div>
			<SubmitBar label=" " textAlign="left" price={payFactSum * 100} buttonText="提交订单" onSubmit={onSubmit} />
		</div>
	)
}

export default Submit
