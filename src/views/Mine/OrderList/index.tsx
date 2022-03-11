import React, { useEffect, useRef, useState } from 'react'
import { getJDOrderList } from '@/apis/order'
import { IGetJDOrderListItem, IGetJDOrderListModel } from '@/apis/models/orderModel'
import { Calendar, Cell, List, Sticky, Tabs } from 'react-vant'
import useFormatDate from '@/hooks/useFormatDate'
import './index.less'
import { useNavigate } from 'react-router-dom'

const Index = () => {
	const navigate = useNavigate()
	const { getFormatTime, getTimeParams } = useFormatDate()
	const params = useRef<IGetJDOrderListModel>({
		pageNum: 1,
		pageSize: 10,
		jdState: 0,
		date: '2021-02-01',
		endDate: '2022-02-09'
	})
	const jdStateList = [
		// { id: -1, title: '全部' },
		{ id: 0, title: '新建订单' },
		{ id: 3, title: '完成订单' },
		{ id: 1, title: '妥投订单' },
		{ id: 2, title: '拒收订单' }
	]
	const [visible, setVisible] = useState(false)
	const [text, setText] = useState('')
	const [finished, setFinished] = useState(false)
	// 是否處於加載狀態（List）
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState<IGetJDOrderListItem[]>([])
	const onConfirm = (date: Date[]) => {
		const [start, end] = date
		const { startTime, endTime, timeStr } = getFormatTime(start, end, true)
		params.current.date = startTime
		params.current.endDate = endTime
		setText(timeStr)
		setVisible(false)
		params.current.pageNum = 1
		setList([])
		onLoad()
	}
	const onLoad = async () => {
		await getData()
	}
	const getData = async () => {
		setLoading(true)
		const res = await getJDOrderList(params.current)
		setLoading(false)
		if (res.resultCode === 1) {
			setList(p => [...p, ...res.data.dataIn])
			params.current.pageNum++
			if (!res.data.isMore) {
				setFinished(true)
			}
		}
	}
	const onChange = (name: number) => {
		console.log(name)
		params.current.jdState = name
		params.current.pageNum = 1
		setList([])
		onLoad()
	}
	useEffect(() => {
		const { startTime, endTime, timeStr } = getTimeParams(6, true)
		setText(timeStr)
		params.current.date = startTime
		params.current.endDate = endTime
	}, [])
	return (
		<>
			<Sticky>
				<Cell title="选择日期" value={text} onClick={() => setVisible(true)} />
				<Tabs onChange={val => onChange(val as number)} active={0}>
					{jdStateList.map(item => {
						return <Tabs.TabPane name={item.id} title={item.title} key={item.id} />
					})}
				</Tabs>
			</Sticky>
			<div className="order-list">
				<List
					loading={loading}
					finished={finished}
					finished-text="没有更多了"
					onLoad={onLoad}
					// immediateCheck={false}
					autoCheck={false}
				>
					{list.map(item => {
						return (
							<div
								className="order-item flex-start"
								key={item.jdOrderId}
								onClick={() => navigate('/mine/orderList/OrderDetail?id=' + item.jdOrderId)}
							>
								<div className="goods-img">
									<img src={item.skuBeanList[0].skuImgUrl} alt="" />
								</div>
								<div className="goods-info">
									<p>{item.skuBeanList[0].name}</p>
									<div className="flex-space">
										<p>￥{item.skuBeanList[0].price}</p>
										<p>x{item.skuBeanList[0].num}</p>
									</div>
								</div>
							</div>
						)
					})}
				</List>
			</div>
			<Calendar
				allowSameDay
				minDate={new Date('2022-01-01')}
				maxDate={new Date()}
				type="range"
				visible={visible}
				onClose={() => setVisible(false)}
				onConfirm={val => onConfirm(val as Date[])}
			/>
		</>
	)
}

export default Index
