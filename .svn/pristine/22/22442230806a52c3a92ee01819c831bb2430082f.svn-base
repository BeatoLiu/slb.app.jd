import React, { useEffect, useRef, useState } from 'react'
import { getProductPageNum, getSkuByPage, getProductDetail } from '@/apis/home'
import { auth } from '@/components/wrapper/auth'
import { picDisplayPath } from '@/utils/config'
import { useNavigate } from 'react-router'
import { GetProductDetailItem, IGetSkuByPageModel } from '@/apis/models/homeModel'
import { Grid, List, PullRefresh, Search, Sticky } from 'react-vant'
import GoodsItem from '@/components/GoodsItem'

import './Home.less'

const HomeCopy = () => {
	const navigate = useNavigate()
	const [list, setList] = useState<GetProductDetailItem[]>([])
	const [linkNav] = useState([
		{ id: 1, title: '电脑、办公', pageNum: '268678029', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 2, title: '美妆护肤', pageNum: '271812810', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 3, title: '运动户外', pageNum: '271876525', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 4, title: '家居日用', pageNum: '1342', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 5, title: '汽车用品', pageNum: '279163024', icon: picDisplayPath + 'slbApp/home/jd.png' },
		{ id: 6, title: '服饰内衣', pageNum: '269718089', icon: picDisplayPath + 'slbApp/home/jd.png' }
	])
	const [pageList, setPageList] = useState<string[]>([])
	const pageIdx = useRef(0)
	const [finished, setFinished] = useState(false)
	// 是否處於加載狀態（List）
	const [loading, setLoading] = useState(false)
	const params = useRef<IGetSkuByPageModel>({
		offset: 0,
		page_num: pageList[0]
	})
	const getProductList = async () => {
		const res = await getProductPageNum()
		if (res.resultCode === 1) {
			const arr = res.data.map(item => item.page_num)
			setPageList(arr)
			params.current.page_num = arr[0]
			await onLoad()
		}
	}
	useEffect(() => {
		getProductList()
		return () => setList([])
	}, [])

	const onLoad = async () => {
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
				pageIdx.current++
				if (pageIdx.current < pageList.length) {
					params.current.offset = 0
					params.current.page_num = pageList[pageIdx.current]
				} else {
					setFinished(true)
				}
			}
		} else {
			// console.log(pageList)
			// if(res.msg === '商品池内数据为空') {
			pageIdx.current++
			if (pageIdx.current < pageList.length) {
				params.current.offset = 0
				params.current.page_num = pageList[pageIdx.current]
			} else {
				setFinished(true)
			}
			// }
		}
		setLoading(false)
	}
	const goGrid = (title: string, pageNum: string) => {
		navigate('/search/grid', { state: { title, pageNum } })
	}
	return (
		<div className="home">
			<Sticky offsetTop="46">
				<header>
					<div className="search">
						<Search
							shape="round"
							background={'transparent'}
							inputAlign="center"
							placeholder="请输入商品名称"
							onClickInput={() => navigate('/search')}
						/>
					</div>
				</header>
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
			{/*<PullRefresh successText="刷新成功" onRefresh={onRefresh}>*/}
			<div className="list">
				<List
					loading={loading}
					finished={finished}
					finished-text="没有更多了"
					onLoad={onLoad}
					immediateCheck={false}
					autoCheck={false}
				>
					<GoodsItem list={list} />
				</List>
			</div>
			{/*</PullRefresh>*/}
		</div>
	)
}

export default auth(HomeCopy)
