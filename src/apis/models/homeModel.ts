import { basePageParams, baseResList, baseResT } from "./base";

/**
 * @param sku 产品编号
 */
export interface ISku {
	sku: number
}

/**
 * @param page_num 分类编号
 */
export interface IPageNum {
	page_num: string;
}

export interface IGetSkuByPageModel extends IPageNum {
	offset: number
	pageSize?: number
}

export interface GetProductDetailStyleModel extends ISku {
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
	stockStateId: number
	remainNum: string
	stockStateDesc: string
}
export type GetProductNewStockByIdRes = baseResList<GetProductNewStockByIdItem>

/**
 * @Description 7.3 提交订单:提交订单信息，生成京东订单。https://bizapi.jd.com/api/order/submitOrder
 * @param sku String 是  下单商品信息
 * Json数组类型的字符串，参数格式：[{"skuId":商品编号, "num":商品数量, "price":10,"bNeedGift":false, "yanbao":[{"skuId":商品编号}]}] (最高支持100种商品)
 * @param name    String 是  收货人姓名，最多20个字符
 * @param areaId   Integer    地区id
 * @param address String 是  收货人详细地址，最多100个字符
 * @param mobile  String 是  手机号，最多20个字符
 * @param regCompanyName  String 是  专票资质公司名称 该字段必填。
 * @param regCode String 是  专票资质纳税人识别号 该字段必填。
 * @param isUseBalance Integer    是  使用余额paymentType=4时，此值固定是1 其他支付方式0
 * @param submitState Integer    是  是否预占库存，0是预占库存（需要调用确认订单接口），1是不预占库存，直接进入生产
 * @param invoiceState Integer 是  开票方式(2为集中开票，4 订单完成后开票)
 * @param invoiceType Integer    是  发票类型（2增值税专用发票；3 电子票） 当发票类型为2时，开票方式只支持2集中开票
 * @param invoicePhone    String 是  收票人电话
 * @param selectedInvoiceTitle    Integer    是  发票类型：4：个人，5：单位
 * @param invoiceContent  Integer    是  1:明细，100：大类  备注:若增值税专用发票则只能选1 明细
 * @Return
 * @Date 2021-12-08 17:14:51
 **/
export interface IGetOrderSubmitOrder {
	skuNums: SkuItem[]
	invoiceCode: number
	daCode: number,
	allianceWalletPassword:string
	// name: string
	// areaId: number
	// address: string
	// mobile: string
	// regCompanyName: string
	// regCode: string
	// isUseBalance: number
	// submitState: number
	// // paymentType:number
	// invoiceState: number
	// invoiceType: number
	// invoicePhone: string
	// selectedInvoiceTitle: string
	// invoiceContent: number
}
interface SkuItem extends SkuNumsItem {
	price: number
	bNeedGift: boolean,
	skuImgUrl: string
}

/**
 * @description  搜索商品:根据搜索条件查询符合要求的商品列表
 * @param sku 商品编号，支持批量，以“,”（半角）分隔  (最高支持100个商品)
 * @param keyword  搜索关键词
 * @param sortType 销量降序="sale_desc";价格升序="price_asc"; 价格降序="price_desc"; 按15日销量排序="sort_days_15_qtty_desc";按30日销量排序="sort_days_30_qtty_desc";
 */
export interface IGetProductSearchModel extends basePageParams{
	keyword:string;
	sortType:string;
}
