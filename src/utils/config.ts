const getHostName = () => {
	let hostName
	// console.log(import.meta.env.MODE)
	switch (import.meta.env.MODE) {
		case "development":
			hostName = "/api" // 这里是本地的请求url
			break
		case "test": // 注意这里的名字要和设置的模式名字对应起来
			hostName = "" // 这里是测试环境中的url
			break
		case "production":
			hostName = "" // 生产环境url
			break
	}
	return hostName
}

// console.log(import.meta.env.MODE)

const getPicName = () => {
	let picName
	switch (import.meta.env.MODE) {
		case "development":
			picName = "" // 这里是本地的请求url
			
			break
		case "test": // 注意这里的名字要和设置的模式名字对应起来
			
			picName = "" // 生产环境url
			break
		case "production":
			picName = "" // 生产环境url
			break
	}
	return picName
}


const hostName = getHostName()
const picName = getPicName()
const assetsOrigin = ""
const locationOrigin = window.location.origin
const jdImgPath = ""

export {
	// 域名
	hostName,
	// 圖片上傳時存儲地址
	picName,
	// 項目资源地址
	assetsOrigin,
	// 項目地址
	locationOrigin,
	jdImgPath
}
