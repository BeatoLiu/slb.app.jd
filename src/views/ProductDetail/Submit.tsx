import { Icon, Stepper } from 'react-vant'
import React, { useState } from 'react'
import lineImg from '@/assets/img/line.png'
import './submit.less'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { jdImgPath } from '@/utils/config'

const Submit = () => {
	const address = useSelector((state: IRootState) => state.goods.addressInfo)
	const goodsInfo = useSelector((state: IRootState) => state.goods.goodsInfo)
	const [buyNum, setBuyNum] = useState(1)
	// const { address } = useGetJDDeliveryAddress()
	// const address = list.find(item => item.daAcquiesceType) || list[0] || {}
	return (
		<div className="product-submit">
			<div className="contact flex-space">
				<div className="info">
					<p>{address.aName}</p>
					<p className="detail-address">{address.daDetailAddress}</p>
					<div className="flex-start">
						<p>{address.daName}</p>
						<p className="da-mobile">{address.daMobile}</p>
					</div>
				</div>
				<div className="right" onClick={() => {}}>
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
		</div>
	)
}

export default Submit
