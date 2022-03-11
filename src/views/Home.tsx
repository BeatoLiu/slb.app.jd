import React, { useEffect, useRef, useState } from 'react'
import { getProductPageNum, getSkuByPage, getProductDetail } from '@/apis/home'
import { auth } from '@/components/wrapper/auth'
import { jdImgPath, assetsOrigin } from '@/utils/config'
import { useNavigate } from 'react-router'
import { GetProductDetailItem, IGetSkuByPageModel } from '@/apis/models/homeModel'
import { Grid, Icon, List, PullRefresh, Search, Sticky } from 'react-vant'
import GoodsItem from '@/components/GoodsItem'

import jdLogo from '@/assets/img/jd-logo.png'
import titleLeft from '@/assets/img/title-left.png'

import './Home.less'
import { setGoodsDetail } from '@/store/actions/goods'
import { useDispatch } from 'react-redux'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [list, setList] = useState<GetProductDetailItem[]>([])
	// 46910111 家居日用; 268720037 生鲜
	// 每日生鲜列表
	const [fruitList, setFruitList] = useState<GetProductDetailItem[]>([])
	// 家居日用列表
	const [homierList, setHomierList] = useState<GetProductDetailItem[]>([])
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
			// console.log(arr)
			setPageList(arr)
			params.current.page_num = arr[0]
			// setLoading(true)
			// console.log(params.current)
			await onLoad()
		}
	}
	useEffect(() => {
		getProductList()
		getLimitData({ offset: 0, page_num: '268720037', pageSize: 10 }, 'fruit')
		getLimitData({ offset: 0, page_num: '46910111', pageSize: 10 }, 'homier')
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
	// 只查少数产品的方法
	const getLimitData = async (params: IGetSkuByPageModel, type: 'fruit' | 'homier') => {
		setLoading(true)
		const res = await getSkuByPage(params)
		if (res.resultCode === 1) {
			const data = JSON.parse(res.data)
			data.skus.forEach((item: number) => {
				getProductDetail({ sku: item }).then(res2 => {
					if (res2.resultCode === 1) {
						const data1 = res2.data
						if (type === 'fruit') {
							data1.jdProductPriceBean && setFruitList(p => [...p, data1])
						} else if (type == 'homier') {
							data1.jdProductPriceBean && setHomierList(p => [...p, data1])
						}
					}
				})
			})
		}
	}
	const goGrid = (title: string, pageNum: string) => {
		navigate('/search/category', { state: { title, pageNum } })
	}
	const goDetail = (item: GetProductDetailItem) => {
		dispatch(setGoodsDetail({ goodsInfo: item as GetProductDetailItem }))
		navigate('/productDetail', { state: { sku: item.sku } })
	}
	return (
		<div className="home">
			<Sticky offsetTop="46">
				<header className="flex-start">
					<div className="logo">
						<img src={jdLogo} alt="jd" />
					</div>
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
			<section className="banner">
				<img src={assetsOrigin + '/img/slbAppJD/home/banner.png'} alt="" />
			</section>
			<section className="day-fruit">
				<div className="fruit-container">
					<div className="fruit-top flex-space">
						<div className="flex-start title">
							<img src={titleLeft} alt="" />
							生鲜
						</div>
						<span className="more" onClick={() => goGrid('生鲜', '268720037')}>
							更多
							<Icon name="arrow" />
						</span>
					</div>
					<div className="flex-space fruit-content">
						{fruitList.map((item, idx) => {
							if (idx < 4) {
								return (
									<div key={item.sku} onClick={() => goDetail(item)}>
										<img src={jdImgPath + item.imagePath} alt="" />
										<div className="flex-start price-content">
											<p className="volume">￥{item.jdProductPriceBean?.jdPrice}</p>
											<del className="price">￥{item.jdProductPriceBean?.price}</del>
										</div>
									</div>
								)
							} else {
								return ''
							}
						})}
					</div>
				</div>
			</section>
			<section className="banner ad">
				<img src={assetsOrigin + '/img/slbAppJD/home/ad.png'} />
			</section>
			<section className="day-fruit">
				<div className="fruit-container">
					<div className="fruit-top flex-space">
						<div className="flex-start title">
							<img src={titleLeft} alt="" />
							家居日用
						</div>
						<span className="more" onClick={() => goGrid('家居日用', '46910111')}>
							更多
							<Icon name="arrow" />
						</span>
					</div>
					<div className="flex-space fruit-content homier-content">
						{homierList.map((item, idx) => {
							if (idx < 6) {
								return (
									<div key={item.sku} onClick={() => goDetail(item)}>
										<img src={jdImgPath + item.imagePath} alt="" />
										<div className="flex-space price-content">
											<p className="volume">￥{item.jdProductPriceBean?.jdPrice}</p>
											<del className="price">￥{item.jdProductPriceBean?.price}</del>
										</div>
									</div>
								)
							} else {
								return ''
							}
						})}
					</div>
				</div>
			</section>
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

export default auth(Home)
