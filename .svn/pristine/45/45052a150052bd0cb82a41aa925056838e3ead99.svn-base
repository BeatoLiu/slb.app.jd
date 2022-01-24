import { useLocation, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getProductDetail, getSkuByPage } from '@/apis/home'
import { List, Search, Sticky } from 'react-vant'
import { IGetSkuByPageModel } from '@/apis/models/homeModel'
import GoodsItem, { IListItem } from '@/components/GoodsItem'

import './list.less'

const GridList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	// const listRef = useState<ListInstance >(null);
	const [finished, setFinished] = useState(false)
	// 是否處於加載狀態（List）
	const [loading, setLoading] = useState(false)
	const params = useRef<IGetSkuByPageModel>({
		offset: 0,
		page_num: location.state.pageNum
	})
	const [list, setList] = useState<IListItem[]>([])

	const onLoad = async () => {
		// params.current.pageNum++
		await getData()
	}
	const getData = async () => {
		setLoading(true)
		const res = await getSkuByPage(params.current)
		if (res.resultCode === 1) {
			const data = JSON.parse(res.data)
			data.skus.forEach((item: number) => {
				getProductDetail({ sku: item }).then(res2 => {
					const data1 = res2.data
					data1.jdProductPriceBean && setList(p => [...p, data1])
				})
			})
			params.current.offset = data.offset
			// console.log(data.offset,data.remainPage)
			if (data.remainPage === 0) {
				setFinished(true)
			}
		}
	}
	return (
		<div className="search-goods-list">
			<Sticky offsetTop="46">
				<div className="top">
					<header>
						<div className="search">
							<Search
								value={location.state.kw}
								shape="round"
								background={'transparent'}
								placeholder="请输入商品名称"
								onClickInput={() => navigate('/search')}
							/>
						</div>
					</header>
				</div>
			</Sticky>
			<div className="list">
				<List
					loading={loading}
					finished={finished}
					finished-text="没有更多了"
					onLoad={onLoad}
					autoCheck={false}
				>
					<GoodsItem list={list} />
				</List>
			</div>
		</div>
	)
}

export default GridList
