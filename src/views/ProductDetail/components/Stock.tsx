import React, {lazy, useEffect, useState} from 'react'
import { Icon } from 'react-vant'
import { useGetJDDeliveryAddress } from '@/hooks/useGetJDDeliveryAddress'

import './stock.less'
import { getProductNewStockById } from '@/apis/home'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'
import  { IAreaType } from '@/components/ChooseArea'
const ChooseArea = lazy(()=>import('@/components/ChooseArea'))
import { useLocation } from 'react-router'

const Stock = () => {
	console.log(111)
	// const skuId = useRef(props.skuId)
	const { setList, address } = useGetJDDeliveryAddress()
	// const [b, setAddress] = useState<GetJDDeliveryAddressMode>()
	// const address = list.find(item => item.daAcquiesceType) || list[0] || {}
	const [stockDes, setStockDes] = useState('')
	const [visible, setVisible] = useState(false)

	const setAddress = (opts: IAreaType) => {
		setList([opts as GetJDDeliveryAddressMode])
	}
	const location = useLocation()
	// console.log(location.state)

	useEffect(() => {
		// console.log('-----------' + props.skuId, address)
		// !这里直接用props.skuId不行，第一次会取不到值，所以用location了
		const params = { skuId: location.state.sku, num: 1 }
		if (address?.aCode) {
			getProductNewStockById({ skuNums: [params], areaId: address?.aCode }).then(res => {
				if (res.resultCode === 1) {
					setStockDes(res.data[0].stockStateDesc)
				}
			})
		}
	}, [address])
	return (
		<div className="flex-space stock-detail">
			<div className="left">送至</div>
			<div className="middle">
				<p className="address">
					<Icon name="location-o" color="#f44336" />
					{address.aName ? address.aName : '请选择地址'}
				</p>
				<p>{stockDes}</p>
			</div>
			<div className="right">
				<Icon name="weapp-nav" onClick={() => setVisible(true)} />
			</div>
			<ChooseArea visible={visible} setVisible={setVisible} setAddress={setAddress} />
		</div>
	)
}

export default Stock
