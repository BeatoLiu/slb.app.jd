import { httpPost } from '@/apis/axios'
import {
	IAddJDInvoiceInfoModel,
	IAddJDInvoiceInfoRes,
	IGetInvoiceInfoListItem,
	IGetInvoiceInfoListRes
} from '@/apis/models/invoiceModel'
import { baseResList, baseResT } from '@/apis/models/base'

enum Apis {
	ADD_JD_INVOICE_INFO = 'mg/jd/addJDInvoiceInfo',
	GET_INVOICE_INFO_LIST = 'mg/jd/getInvoiceInfoList'
}

/**
 * @description 新增發票抬頭
 * @param p
 */
export const addJDInvoiceInfo = (p: IAddJDInvoiceInfoModel) => httpPost<IAddJDInvoiceInfoRes>(Apis.ADD_JD_INVOICE_INFO, p)

/**
 * @description 查詢發票抬頭列表
 */
export const getInvoiceInfoList = () => httpPost<IGetInvoiceInfoListRes>(Apis.GET_INVOICE_INFO_LIST, {})
