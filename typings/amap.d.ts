// declare namespace AMap{
// 	export class Map{}
// 	export class Geolocation{}
// }
declare namespace AMap {
	export interface MapOptions {
		resizeEnable: boolean
	}
	export class Map {
		/**构造一个地图对象, 参数container中传入地图容器DIV的ID值或者DIV对象, opts地图初始化参数对象, 参数详情参看MapOptions列表。**/
		constructor(container: string | HTMLDivElement, opts: MapOptions)
	}
	export interface GeolocationOpts {
		// 是否使用高精度定位，默认：true
		enableHighAccuracy?: boolean
		// 设置定位超时时间，默认：无穷大
		timeout?: number
		// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
		buttonOffset: Pixel
		//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		zoomToAccuracy?: boolean
		//  定位按钮的排放位置,  RB表示右下
		buttonPosition?: string
	}
	export class Geolocation {
		/**构造一个地图对象, 参数container中传入地图容器DIV的ID值或者DIV对象, opts地图初始化参数对象, 参数详情参看MapOptions列表。**/
		constructor(opts: GeolocationOpts)
		getCurrentPosition(): void
	}

	/** 像素坐标, 确定地图上的一个像素点。 **/
	export class Pixel {
		/**构造一个像素坐标对象。**/
		constructor(x: number, y: number)
		/**获得X方向像素坐标**/
		public getX(): number

		/**获得Y方向像素坐标**/
		public getY(): number

		/**当前像素坐标与传入像素坐标是否相等**/
		public equals(point: Pixel): boolean

		/**以字符串形式返回像素坐标对象**/
		public toString(): string
	}

	function plugin(val: string, opts: any): void
	export let event: any
	// event:eventOpts
}
