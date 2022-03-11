import { Cell, Icon, Stepper, SubmitBar, Toast } from 'react-vant'
import React, { useEffect, useRef, useState } from 'react'
import lineImg from '@/assets/img/line.png'
import './submit.less'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { jdImgPath } from '@/utils/config'
import { useNavigate } from 'react-router-dom'
import { getOrderFreight, getOrderSubmitOrder } from '@/apis/home'
import Invoice from '@/views/ProductDetail/components/Invoice'
import InputPayPWD from '@/components/InputPayPWD'

const Submit = () => {
	const navigate = useNavigate()
	const address = useSelector((state: IRootState) => state.goods.addressInfo)
	const goodsInfo = useSelector((state: IRootState) => state.goods.goodsInfo)
	const [buyNum, setBuyNum] = useState(1)
	const [payFactSum, setPayFactSum] = useState(goodsInfo.jdProductPriceBean.price)
	//运费
	const [freight, setFreight] = useState(0)
	const [loading, setLoading] = useState(false)
	const invoiceRef = useRef(0)
	// 显示输入密码框
	const [showInputPayPWD, setShowInputPayPWD] = useState(false)
	const [pwdError, setPwdError] = useState('')
	useEffect(() => {
		const params = { skuId: goodsInfo.sku, num: buyNum }
		getOrderFreight({ skuNums: [params], areaId: address?.aCode }).then(res => {
			if (res.resultCode === 1) {
				const data = JSON.parse(res.data)
				setFreight(data.freight)
				setPayFactSum(buyNum * goodsInfo.jdProductPriceBean.price + data.freight)
			}
		})
	}, [buyNum])
	const onSubmit = () => {
		if (!invoiceRef.current) {
			return Toast('请先填写发票信息')
		}
		setShowInputPayPWD(true)
		// const params = {
		// 	daCode: address.daCode,
		// 	invoiceCode: invoiceRef.current,
		// 	skuNums: [
		// 		{
		// 			skuId: goodsInfo.sku,
		// 			num: buyNum,
		// 			price: goodsInfo.jdProductPriceBean.price,
		// 			bNeedGift: false
		// 		}
		// 	]
		// }
		// setLoading(true)
		// getOrderSubmitOrder(params).then(res => {
		// 	setLoading(false)
		// 	if (res.resultCode === 1) {
		// 		setShowInputPayPWD(true)
		// 	}
		// })

		// setShowInputPayPWD(true)
	}
	const closePop = (pwd?: string) => {
		if (pwd?.length === 6) {
			console.log(pwd)
			const params = {
				daCode: address.daCode,
				invoiceCode: invoiceRef.current,
				allianceWalletPassword: pwd,
				skuNums: [
					{
						skuId: goodsInfo.sku,
						num: buyNum,
						price: goodsInfo.jdProductPriceBean.price,
						bNeedGift: false,
						skuImgUrl: jdImgPath + goodsInfo.imagePath
					}
				]
			}
			setLoading(true)
			getOrderSubmitOrder(params).then(res => {
				setLoading(false)
				if (res.resultCode === 1) {
					setShowInputPayPWD(false)
					navigate('/productDetail/payResult', { replace: true })
				} else if (res.resultCode === -2 || res.resultCode === -3) {
					setPwdError(res.msg)
				}
			})
		} else {
			setShowInputPayPWD(false)
		}
	}
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
					小计：<span>￥{payFactSum} </span>
				</div>
				<div className="total-fee">
					通道手续费：6%， 合计：<span>{(payFactSum * 106) / 100} ZSDT</span>
				</div>
			</div>
			<Invoice invoiceRef={invoiceRef} />
			<SubmitBar
				label=" "
				textAlign="left"
				price={payFactSum * 106}
				buttonText="提交订单"
				loading={loading}
				currency="ZSDT"
				onSubmit={onSubmit}
			/>
			<InputPayPWD
				show={showInputPayPWD}
				typeName="ZSDT"
				amount={(payFactSum * 106) / 100}
				pwdError={pwdError}
				onClose={closePop}
			/>
		</div>
	)
}

export default Submit
