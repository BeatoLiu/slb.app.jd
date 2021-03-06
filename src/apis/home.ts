import { httpPost } from './axios'
import { baseResList, baseResT } from './models/base'
import {
	ISku,
	GetProductDetailItem,
	IPageNum,
	GetProductSkuImageRes,
	GetProductSkuImageMode,
	GetProductNewStockByIdModel,
	GetProductNewStockByIdRes,
	IGetProductSearchModel,
	IGetSkuByPageModel,
	IGetOrderSubmitOrder
} from './models/homeModel'

enum Api {
	GET_PRODUCT_PAGE_NUM = 'mg/jd/getProductPageNum',
	GET_SKU_BY_PAGE = 'mg/jd/getSkuByPage',
	GET_PRODUCT_DETAIL = 'mg/jd/getProductDetail',
	GET_PRODUCT_SKU_IMAGE = 'mg/jd/getProductSkuImage',
	GET_PRODUCT_NEW_STOCK_BY_ID = 'mg/jd/getProductNewStockById',
	GET_ORDER_FREIGHT = 'mg/jd/getOrderFreight',
	GET_ORDER_SUBMIT_ORDER = 'mg/jd/getOrderSubmitOrder',
	GET_PRODUCT_SEARCH = 'mg/jd/getProductSearch'
}

/**
 * @description 获取京东分类
 * @returns
 */
export const getProductPageNum = () => httpPost<baseResList<{ name: string; page_num:string }>>(Api.GET_PRODUCT_PAGE_NUM)

/**
 * @description 查询该分类下的产品编号集合
 * @param p
 * @returns
 */
export const getSkuByPage = (p: IGetSkuByPageModel) => httpPost<baseResT>(Api.GET_SKU_BY_PAGE, p)

/**
 * @description 查询商品详情
 * @param p
 * @returns
 */
export const getProductDetail = (p: ISku) => httpPost<baseResT<GetProductDetailItem>>(Api.GET_PRODUCT_DETAIL, p)

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

/**
 * @description 搜索商品:根据搜索条件查询符合要求的商品列表
 * @param p
 */
export const getProductSearch = (p: IGetProductSearchModel) => httpPost<baseResT>(Api.GET_PRODUCT_SEARCH, p)

/**
 * @description 提交订单
 * @param p
 */
export const getOrderSubmitOrder = (p: IGetOrderSubmitOrder) => httpPost<baseResT>(Api.GET_ORDER_SUBMIT_ORDER, p)
