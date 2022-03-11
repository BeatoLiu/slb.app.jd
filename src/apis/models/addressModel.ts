import { baseResList } from '@/apis/models/base'

/**
 * @description 获取地址列表
 * @param type 地区类型:1-省  2-市  3-区  4-镇
 * @param pAreaId 父级id
 * */
export interface GetJDAreaList {
	type: number
	pAreaId?: number
	areaId?: number
}
export interface GetJDAreaListItem {
	areaId: number
	areaName: string
	children?: GetJDAreaListItem[]
}
export type GetJDAreaListRes = baseResList<GetJDAreaListItem>

/**
 * @description 新增地址
 * */
export interface AddJDDeliveryAddressByMemCodeModel {
	daName: string
	daMobile: string
	aCode: number
	aName: string
	daDetailAddress: string,
	daAcquiesceType: number
}

export interface GetJDDeliveryAddressMode extends AddJDDeliveryAddressByMemCodeModel{
	daCode: number
}
/**
 * @description 地址列表
 */
export  type GetJDDeliveryAddressRes = baseResList<GetJDDeliveryAddressMode>

export interface IDeleteJDDeliveryAddressByDaCodeModel{
	daCode:number
}
