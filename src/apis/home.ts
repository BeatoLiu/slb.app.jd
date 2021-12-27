import { stringify } from 'qs'
import { httpPost } from './axios'
import { baseResT } from './models/base'
import {
	Isku,
	GetProductDetailItem,
	IPageNum,
	GetProductSkuImageRes,
	GetProductSkuImageMode,
	GetProductNewStockByIdModel,
	GetProductNewStockByIdRes
} from './models/homeModel'

enum Api {
	GET_PRODUCT_PAGE_NUM = 'mg/jd/getProductPageNum',
	GET_SKU_BY_PAGE = 'mg/jd/getSkuByPage',
	GET_PRODUCT_DETAIL = 'mg/jd/getProductDetail',
	GET_PRODUCT_SKU_IMAGE = 'mg/jd/getProductSkuImage',
	GET_PRODUCT_NEW_STOCK_BY_ID = 'mg/jd/getProductNewStockById',
	GET_ORDER_FREIGHT = 'mg/jd/getOrderFreight'
}

/**
 * @description 获取京东分类
 * @returns
 */
export const getProductPageNum = () => httpPost<baseResT>(Api.GET_PRODUCT_PAGE_NUM)

/**
 * @description 查询该分类下的产品编号集合
 * @param p
 * @returns
 */
export const getSkuByPage = (p: IPageNum) => httpPost<baseResT>(Api.GET_SKU_BY_PAGE, p)

/**
 * @description 查询商品详情
 * @param p
 * @returns
 */
export const getProductDetail = (p: Isku) => httpPost<baseResT<GetProductDetailItem>>(Api.GET_PRODUCT_DETAIL, p)

/**
 * @description 查询商品图片:查询单个商品的主图、轮播图
 * @param p
 * @returns
 */
export const getProductSkuImage = (p: GetProductSkuImageMode) =>
	httpPost<GetProductSkuImageRes>(Api.GET_PRODUCT_SKU_IMAGE, p)

/**
 * @description 查商品库存
 * @param p
 */
export const getProductNewStockById = (p: GetProductNewStockByIdModel) =>
	httpPost<GetProductNewStockByIdRes>(Api.GET_PRODUCT_NEW_STOCK_BY_ID, p)

/**
 * @description 查询运费:
 * @param p
 */
export const getOrderFreight = (p: GetProductNewStockByIdModel) => httpPost<baseResT>(Api.GET_ORDER_FREIGHT, p)
