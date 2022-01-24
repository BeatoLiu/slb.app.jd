import { useLocation, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getProductSearch } from '@/apis/home'
import { Icon, List, Search, Sticky } from 'react-vant'
import { IGetProductSearchModel } from '@/apis/models/homeModel'
import GoodsItem, { IListItem } from '@/components/GoodsItem'

import './list.less'

const SearchList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	// const listRef = useState<ListInstance >(null);
	const [finished, setFinished] = useState(false)
	// 是否處於加載狀態（List）
	const [loading, setLoading] = useState(false)
	const params = useRef<IGetProductSearchModel>({
		pageNum: 0,
		pageSize: 20,
		keyword: location.state.kw,
		sortType: 'sort_days_30_qtty_asc'
	})
	const [list, setList] = useState<IListItem[]>([])
	const [salesAsc, setSalesAsc] = useState(false)
	const [priceAsc, setPriceAsc] = useState(false)

	const onLoad = async () => {
		params.current.pageNum++
		await getData()
	}
	// console.log(111)

	const onRefresh = async () => {
		setList([])
		setFinished(false)
		params.current.pageNum = 0
		await onLoad()
	}
	const getData = async () => {
		setLoading(true)
		const res = await getProductSearch(params.current)
		setLoading(false)
		if (res.resultCode === 1) {
			const data = res.data
			// console.log(data)
			if (list.length >= data.resultCount) {
				setFinished(true)
			}
			setList(v => {
				return [...v, ...data.hitResult]
			})
		}
	}
	// useEffect(() => {
	// 	onRefresh()
	// }, [params.current.sortType])
	const sort = (type: string) => {
		if (type === 'sales') {
			setSalesAsc(val => !val)
			params.current.sortType = salesAsc ? 'sale_asc' : 'sale_desc'
		} else if (type === 'price') {
			setPriceAsc(val => !val)
			params.current.sortType = priceAsc ? 'price_asc' : 'price_desc'
		}
		onRefresh()
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
					<div className="sort flex-space">
						<div className="flex-start" onClick={() => sort('sales')}>
							<p>销量</p>
							<Icon name={!salesAsc ? 'arrow-down' : 'arrow-up'} />
						</div>
						<div className="flex-start" onClick={() => sort('price')}>
							<p>价格</p>
							<Icon name={!priceAsc ? 'arrow-down' : 'arrow-up'} />
						</div>
					</div>
				</div>
			</Sticky>
			{/*<PullRefresh onRefresh={onRefresh}>*/}
			<div className="list">
				<List loading={loading} finished={finished} finished-text="没有更多了" onLoad={onLoad}>
					<GoodsItem list={list} />
				</List>
			</div>
			{/*</PullRefresh>*/}
		</div>
	)
}

export default SearchList
