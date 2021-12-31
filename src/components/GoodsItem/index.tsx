import React from 'react'
import { jdImgPath } from "@/utils/config";
import { GetProductDetailItem } from "@/apis/models/homeModel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGoodsDetail } from "@/store/actions/goods";

import './index.less'
import { getProductDetail } from "@/apis/home";

export interface IListItem extends Partial<GetProductDetailItem>{
	brand?:string;
	wareName?: string;
	wareId?: string;
	imageUrl?: string
}
interface IProps{
	list: IListItem[]
}
const Index = (props:IProps) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const goToDetail = (item: IListItem) => {
		// props.setGoodsDetail(item)
		// dispatch(setGoodsDetail({goodsInfo: item}))
		if (!item.sku) {
			getProductDetail({sku: Number(item.wareId)}).then(res => {
				if(res.resultCode === 1) {
					dispatch(setGoodsDetail({goodsInfo: res.data}))
				}
			})
		} else{
			dispatch(setGoodsDetail({goodsInfo: item as GetProductDetailItem}))
		}
		navigate('/productDetail', { state: { sku: item.sku || item.wareId } })
	}
	return (
		<>
		{
			props.list.map(item => (
			<div className="item flex-start" key={item.sku||item.wareId}>
				<div className="item-left">
					<img src={jdImgPath + (item.imagePath || item.imageUrl)} alt="" />
				</div>

				<div className="item-right">
					<div className="goods-title">{item.name || item.wareName}</div>
					<div className="shop-title">{item.brandName || item.brand}</div>
					{/* <div className="return-power">预计返{{ calcSie(item) }}TAA</div> */}
					<div className="flex-start price-content">
						<p className="volume">￥{item.jdProductPriceBean?.jdPrice}</p>
						<p className="price">{item.jdProductPriceBean?.price}</p>
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

			))
		}
		</>
	)
}

export default Index
