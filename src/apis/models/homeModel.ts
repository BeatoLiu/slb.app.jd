import { baseResList, baseResT } from './base'

/**
 * @param sku 产品编号
 */
export interface Isku {
	sku: number
}

/**
 * @param page_num 分类编号
 */
export interface IPageNum {
	page_num: string
}

export interface GetProductDetailStyleModel extends Isku {
	queryExts: string[]
}

/**
 * @description 商品轮播图
 */
export interface GetProductSkuImageMode {
	skuIdList: number[]
}
export interface GetProductSkuImageItem {
	id: number
	path: string
	isPrimary: number
	orderSort: number
}
interface GetProductSkuImageInfo {
	[key: string]: GetProductSkuImageItem[]
}
export type GetProductSkuImageRes = baseResT<GetProductSkuImageInfo>

/**
 * @description 商品详情
 */
export interface GetProductDetailItem {
	jdProductPriceBean: JdProductPriceBean
	saleUnit: string
	weight: string
	productArea: string
	wareQD: string
	imagePath: string
	param: string
	state: string
	sku: string
	brandName: string
	upc: string
	category: string
	name: string
	introduction: string
}

export interface JdProductPriceBean {
	skuId: string
	jdPrice: number
	price: number
}

/**
 * @description 查库存
 */
export interface GetProductNewStockByIdModel {
	skuNums: SkuNumsItem[]
	areaId: number
}
interface SkuNumsItem {
	skuId: string
	num: number
}
interface GetProductNewStockByIdItem {
	skuId: string
	areaId: string
	stockStateId: number;
	remainNum:string;
	stockStateDesc:string
}
export type GetProductNewStockByIdRes = baseResList<GetProductNewStockByIdItem>
