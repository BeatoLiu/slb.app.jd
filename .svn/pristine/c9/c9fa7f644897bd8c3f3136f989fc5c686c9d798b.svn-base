import actionTypes from '@/store/constant'
import { Dispatch } from 'redux'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'
import { GetProductDetailItem } from '@/apis/models/homeModel'

/**
 * @description 选中的商品信息
 */
export const setGoodsDetail = (data: { goodsInfo: GetProductDetailItem }) => ({
	type: actionTypes.SET_GOODS_DETAIL,
	data
})

/**
 * @description 保存地址列表
 * @param data
 */
export const setAddressList = (data: { addressList: GetJDDeliveryAddressMode[] }) => ({
	type: actionTypes.SET_ADDRESS_LIST,
	data
})

/**
 * @description 保存选中地址信息
 * @param data
 */
export const setAddressInfo = (data: { addressInfo: GetJDDeliveryAddressMode }) => ({
	type: actionTypes.SET_ADDRESS_INFO,
	data
})

// 异步方法，
const createAsyncAction = (data: any, time: number) => {
	return (dispatch: Dispatch) => {
		setTimeout(() => {
			dispatch(setGoodsDetail(data))
		}, time)
	}
}
