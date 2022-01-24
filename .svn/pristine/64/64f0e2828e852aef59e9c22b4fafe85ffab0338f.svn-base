import { baseResList, baseResT } from '@/apis/models/base';

/**
 * @description 添加發票抬頭
 * @param selectedInvoiceTitle 發票類型： 4人人，5單位
 * @param invoiceType 发票类型（2增值税专用发票；3 电子票） 当发票类型为2时，开票方式只支持2集中开票
 * @param invoiceContent 1:明细，100：大类  备注:若增值税专用发票则只能选1 明细
 * @param invoiceState 开票方式(2为集中开票，4 订单完成后开票)
 * @param regCompanyName 专票资质公司名称 该字段必填。发票抬头
 * @param regCode 专票资质纳税人识别号 该字段必填
 * @param invoiceEmail 收票郵箱
 */
export interface IAddJDInvoiceInfoModel {
	selectedInvoiceTitle: number
	invoiceType: number
	invoiceContent: number
	invoiceState: number
	regCompanyName: string
	regCode: string
	invoiceEmail: string
}

export type IAddJDInvoiceInfoRes = baseResT<IGetInvoiceInfoListItem>

/**
 * @description 发票抬头查询列表信息
 * @param invoiceCode 记录编号
 * @param invoicePhone 电话
 * @extends IAddJDInvoiceInfoModel
 */
export interface IGetInvoiceInfoListItem extends IAddJDInvoiceInfoModel {
	invoiceCode: number
	invoicePhone: string
}

/**
 * @description 发票抬头查询结果
 */
export type IGetInvoiceInfoListRes = baseResList<IGetInvoiceInfoListItem>
