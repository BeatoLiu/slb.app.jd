import { basePageParams, baseResPageList, baseResT } from '@/apis/models/base'
import { IGetInvoiceInfoListItem } from '@/apis/models/invoiceModel';
import { GetJDDeliveryAddressMode } from '@/apis/models/addressModel';

/**
 * @description 分类查询京东订单列表
 * @param jdState 0是新建 1是妥投 2是拒收 3是完成
 * @param date 查询日期，格式2018-11-7（不包含当天）
 * @param endDate 结束日期，格式2018-11-7
 */
export interface IGetJDOrderListModel extends basePageParams {
	jdState: number
	date: string
	endDate: string
}
interface IOrderInfo {
	name: string
	num: string
	skuId: string
	price: number
	skuImgUrl: string
}

export interface IGetJDOrderListItem {
	skuBeanList: IOrderInfo[];
	jdOrderId: string
	orderSum: number;
	orderPrice: number
	orderFreight: number
	orderStateDesc: string
	orderCode: number
	// sku: IOrderInfo[]
}

export type IGetJDOrderListRes = baseResPageList<IGetJDOrderListItem>

/**
 * @description 查詢訂單詳情
 */
export interface IGetJdOrderModel {
	jdOrderId: string
}

export interface IGetJDOrderInfo extends IGetJDOrderListItem {
	jdInvoiceBean: { regCompanyName: string }
	jdDeliveryAddressBean: {
		daName: string, daMobile: string, aName: string, daDetailAddress: string
	}
	jdOrder: {
		createOrderTime: string
		finishTime: string
	}
}

export type IGetJDOrderRes = baseResT<IGetJDOrderInfo>
