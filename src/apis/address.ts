import { httpPost } from '@/apis/axios'
import {
	AddJDDeliveryAddressByMemCodeModel,
	GetJDAreaList,
	GetJDAreaListRes, GetJDDeliveryAddressMode,
	GetJDDeliveryAddressRes,
	IDeleteJDDeliveryAddressByDaCodeModel
} from '@/apis/models/addressModel'
import { baseResT } from '@/apis/models/base'

enum Apis {
	GET_JD_AREA_LIST = 'mg/jd/getJDAreaList',
	ADD_JD_DELIVERY_ADDRESS_BY_MEM_CODE = 'mg/jd/addJDDeliveryAddressByMemCode',
	GET_JD_DELIVER_ADDRESS = 'mg/jd/getJDDeliveryAddress',
	DELETE_JD_DELIVER_ADDRESS_BY_DA_CODE = 'mg/jd/deleteJDDeliveryAddressByDaCode',
	UPDATE_JD_DELIVER_ADDRESS = 'mg/jd/updateJDDeliveryAddress',
}

/**
 * @description 获取地址列表
 * @param p.type 地区类型:1-省  2-市  3-区  4-镇
 * @param p.pAreaId 父级id
 * */
export const getJDAreaList = (p: GetJDAreaList) => httpPost<GetJDAreaListRes>(Apis.GET_JD_AREA_LIST, p)

/**
 * @description 新增地址
 * @param p
 */
export const addJDDeliveryAddressByMemCode = (p: AddJDDeliveryAddressByMemCodeModel) =>
	httpPost<baseResT>(Apis.ADD_JD_DELIVERY_ADDRESS_BY_MEM_CODE, p)

/**
 * @description 查询地址列表
 */
export const getJDDeliveryAddress = () => httpPost<GetJDDeliveryAddressRes>(Apis.GET_JD_DELIVER_ADDRESS, {})
/**
 * @description 删除地址
 * @param p
 */
export const deleteJDDeliveryAddressByDaCode = (p: IDeleteJDDeliveryAddressByDaCodeModel) =>
	httpPost<baseResT>(Apis.DELETE_JD_DELIVER_ADDRESS_BY_DA_CODE, p)

/**
 * @description 修改地址信息
 * @param p
 */
export const updateJDDeliveryAddress = (p: GetJDDeliveryAddressMode) =>
	httpPost<baseResT>(Apis.UPDATE_JD_DELIVER_ADDRESS, p)
