import { IGetJDOrderListModel, IGetJDOrderListRes, IGetJdOrderModel, IGetJDOrderRes } from '@/apis/models/orderModel';
import { httpPost } from '@/apis/axios'

enum Apis {
	GET_JD_ORDER_LIST = 'mg/jd/getJDOrderList',
	GET_JD_ORDER = 'mg/jd/getJdOrder'
}

export const getJDOrderList = (p: IGetJDOrderListModel) => httpPost<IGetJDOrderListRes>(Apis.GET_JD_ORDER_LIST, p)

/**
 * @description 查詢訂單詳情
 * @param p
 */
export const getJdOrder = (p: IGetJdOrderModel) => httpPost<IGetJDOrderRes>(Apis.GET_JD_ORDER, p)
