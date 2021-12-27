import React, { useEffect, useState } from 'react'
import { auth } from '@/components/wrapper/auth'
import { useLocation } from 'react-router'
import { getProductSkuImage } from '@/apis/home'
import { Swiper, Image, ActionBar } from 'react-vant'
import {  GetProductSkuImageItem } from '@/apis/models/homeModel'
import { jdImgPath } from '@/utils/config'
import './index.less'
import Stock from '@/views/ProductDetail/components/Stock'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'

export const ProductDetail = () => {
	const goodsInfo = useSelector((state: IRootState) => state.goods.goodsInfo)
	const intro = goodsInfo.introduction.replace(/width:750px;/g, '')
	const param = goodsInfo.param
	const [images, setImages] = useState<GetProductSkuImageItem[]>([])

	const location = useLocation()
	const navigate = useNavigate()
	const submit = () => {
		navigate('/productDetail/submit', { ...location.state })
	}
	// console.log('location')
	useEffect(() => {
		getProductSkuImage({ skuIdList: [location.state.sku] }).then(res => {
			if (res.resultCode === 1) {
				setImages(res.data[location.state.sku])
			}
		})
	}, [])
	return (
		<div className="product-detail">
			<div className="swiper-container">
				<Swiper>
					{images.length ? (
						images.map(image => {
							return (
								<Swiper.Item key={image.id}>
									<Image lazyload src={jdImgPath + image.path} />
								</Swiper.Item>
							)
						})
					) : (
						<Swiper.Item />
					)}
				</Swiper>
			</div>
			<div className="product-content">
				<p className="price">{goodsInfo.jdProductPriceBean.price}</p>
				<p className="goods-name">{goodsInfo.name}</p>
			</div>
			<Stock />
			{param ? (
				<>
					<p className="detail-img">产品参数</p>
					<div className="detail-params" dangerouslySetInnerHTML={{ __html: param }} />
				</>
			) : (
				''
			)}
			<p className="detail-img">详情</p>
			<div dangerouslySetInnerHTML={{ __html: intro }} />
			<ActionBar>
				<ActionBar.Button type="danger" text="立即购买" onClick={submit} />
			</ActionBar>
		</div>
	)
}

export default auth(ProductDetail)
