import { useLocation, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { getProductDetail, getSkuByPage } from '@/apis/home'
import { Grid, List, Search, Sticky } from 'react-vant'
import { IGetSkuByPageModel } from '@/apis/models/homeModel'
import GoodsItem, { IListItem } from '@/components/GoodsItem'

import './list.less'
import { picDisplayPath } from '@/utils/config'

const Category = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [linkNav] = useState([
		{ id: 1, title: '电脑、办公', pageNum: '268678029', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 2, title: '美妆护肤', pageNum: '271812810', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 3, title: '运动户外', pageNum: '271876525', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 4, title: '家居日用', pageNum: '1342', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 5, title: '汽车用品', pageNum: '279163024', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 6, title: '服饰内衣', pageNum: '269718089', icon: picDisplayPath + 'slbApp/home/jd.png' }
	])
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
					if (res2.resultCode === 1) {
						const data1 = res2.data
						data1.jdProductPriceBean && setList(p => [...p, data1])
					}
				})
			})
			params.current.offset = data.offset
			// console.log(data.offset,data.remainPage)
			if (data.remainPage === 0) {
				setFinished(true)
			}
		}
	}
	const goGrid = (title: string, pageNum: string) => {
		navigate('/search/grid', { state: { title, pageNum } })
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
			<div className="grid">
				<Grid columnNum={3}>
					{linkNav.map(item => (
						<Grid.Item
							icon={item.icon}
							text={item.title}
							key={item.id}
							onClick={() => goGrid(item.title, item.pageNum)}
						/>
					))}
				</Grid>
			</div>
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

export default Category
