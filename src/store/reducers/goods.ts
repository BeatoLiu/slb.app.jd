import { GetProductDetailItem } from '@/apis/models/homeModel'
import actionTypes, { ActionTypes } from '../constant'
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel'

interface IState {
	goodsInfo: GetProductDetailItem
	addressList: GetJDDeliveryAddressMode[]
	addressInfo: GetJDDeliveryAddressMode
}

const initGoodsState: IState = {
	goodsInfo: JSON.parse(localStorage.goodsInfo || '{}') || {
		jdProductPriceBean: {
			price: 0,
			jdPrice: 0,
			skuId: ''
		},
		name: '',
		saleUnit: '',
		weight: '',
		productArea: '',
		wareQD: '',
		imagePath: '',
		param: '',
		state: '',
		sku: '',
		brandName: '',
		upc: '',
		category: '',
		introduction: ''
	},
	addressList: JSON.parse(localStorage.addressList || '[]') || [],
	addressInfo: JSON.parse(localStorage.addressInfo || '{}') || {}
}

const goods = (state: IState = initGoodsState, action: { type: ActionTypes; data: IState }) => {
	switch (action.type) {
		case actionTypes.SET_GOODS_DETAIL:
			// console.log(action)
			localStorage.goodsInfo = JSON.stringify(action.data.goodsInfo)
			return { ...state, ...action.data }
		case actionTypes.SET_ADDRESS_LIST:
			localStorage.addressList = JSON.stringify(action.data.addressList)
			return { ...state, ...action.data }
		case actionTypes.SET_ADDRESS_INFO:
			localStorage.addressInfo = JSON.stringify(action.data.addressInfo)
			return { ...state, ...action.data }
		default:
			return state
	}
}

export default goods
