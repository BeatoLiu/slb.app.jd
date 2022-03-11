import { useEffect, useState } from 'react'
import { getJDDeliveryAddress } from '@/apis/address'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { setAddressInfo, setAddressList } from '@/store/actions/goods'

/**
 * @description 获取地址列表
 */
export const useGetJDDeliveryAddress = () => {
	const addressList = useSelector((state: IRootState) => state.goods.addressList)
	const addressInfo = useSelector((state: IRootState) => state.goods.addressInfo)
	const [list, setList] = useState<GetJDDeliveryAddressMode[]>(addressList)

	const dispatch = useDispatch()
	useEffect(() => {
		// if (!addressList.length) {
			getJDDeliveryAddress().then(res => {
				if (res.resultCode === 1) {
					setList(res.data)
					dispatch(setAddressList({ addressList: res.data }))
				}
			})
		// }
	}, [])
	const address = list.find(item => item.daAcquiesceType) || list[0] || {}
	if (address.aCode && !addressInfo.aCode) {
		dispatch(setAddressInfo({ addressInfo: address }))
	}
	return { list, setList, address }
}
