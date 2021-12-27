import React, { useEffect, useState } from 'react'
import { getProductPageNum, getSkuByPage, getProductDetail } from '@/apis/home'
import './Home.less'
import { auth } from '@/components/wrapper/auth'
import { jdImgPath } from '@/utils/config'
import { useNavigate } from 'react-router'
import { GetProductDetailItem } from '@/apis/models/homeModel'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
// import types from '@/store/constant'
import { setGoodsDetail } from '@/store/actions/goods'

interface IProps {
	setGoodsDetail: (goodsInfo: GetProductDetailItem) => void
}

const Home: React.FC<IProps> = (props: IProps) => {
	const [list, setList] = useState<GetProductDetailItem[]>([])
	const navigate = useNavigate()
	useEffect(() => {
		getProductPageNum().then(res => {
			if (res.resultCode === 1) {
				const idx = (res.data.length * Math.random()).toFixed(0)
				getSkuByPage({ page_num: res.data[idx].page_num }).then(res1 => {
					if (res1.resultCode === 1 && res1.data) {
						const data = JSON.parse(res1.data)
						data.skus.forEach((item: number) => {
							getProductDetail({ sku: item }).then(res2 => {
								const data1 = res2.data
								data1.jdProductPriceBean && setList(p => [...p, data1])
							})
						})
					}
				})
			}
		})

		return () => setList([])
	}, [])
	const goToDetail = (item: GetProductDetailItem) => {
		props.setGoodsDetail(item)
		navigate('/productDetail', { state: { sku: item.sku } })
	}
	return (
		<div className="list">
			{list.map(item => {
				return (
					<div className="item flex-start" key={item.sku}>
						<div className="item-left">
							<img src={jdImgPath + item.imagePath} alt="" />
						</div>
						<div className="item-right">
							<div className="goods-title">{item.name}</div>
							<div className="shop-title">{item.brandName}</div>
							{/* <div className="return-power">预计返{{ calcSie(item) }}TAA</div> */}
							<div className="flex-start price-content">
								<p className="volume">￥{item.jdProductPriceBean.jdPrice}</p>
								<p className="price">{item.jdProductPriceBean.price}</p>
							</div>
							{/* <div className="flex-space price-content"> */}
							<div
								className="go-buy"
								onClick={() => {
									goToDetail(item)
								}}
							>
								马上抢
							</div>
							{/* </div> */}
						</div>
					</div>
					// <>
					//     <img src={item.imagePath} alt="" />
					//     <div>{item.name}</div>
					// </>
				)
			})}
		</div>
	)
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setGoodsDetail: (goodsInfo: GetProductDetailItem) => dispatch(setGoodsDetail({ goodsInfo }))
})

export default auth(connect(null, mapDispatchToProps)(Home))
