const getHostName = () => {
	let hostName
	// console.log(import.meta.env.MODE)
	switch (import.meta.env.MODE) {
		case 'development':
			hostName = '/api' // 这里是本地的请求url
			break
		case 'test': // 注意这里的名字要和设置的模式名字对应起来
			hostName = 'http://tk.2qzs.com' // 这里是测试环境中的url
			break
		case 'production':
			hostName = 'http://tk.2qzs.com' // 生产环境url
			break
	}
	return hostName
}

// console.log(import.meta.env.MODE)

const getPicName = () => {
	let picName
	switch (import.meta.env.MODE) {
		case 'development':
			picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/uploadTest/' // 这里是本地的请求url
			// picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
			break
		case 'test': // 注意这里的名字要和设置的模式名字对应起来
			// picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/uploadTest/' // 这里是测试环境中的url
			picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
			break
		case 'production':
			picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
			break
	}
	return picName
}

// 图片文件止传地址
const getPicPath = () => {
	let picName
	switch (import.meta.env.MODE) {
		case 'development':
			picName = 'http://mg.2qzs.com/img/' // 生产环境url
			break
		case 'test':
			picName = '/img/' // 生产环境url
			break
		case 'production':
			picName = '/img/' // 生产环境url
			break
	}
	return picName
}

const hostName = getHostName()
const picName = getPicName()
const picDisplayPath = getPicPath()
const localtionOrigin = window.location.origin
const jdImgPath = 'http://img13.360buyimg.com/n1/'

export {
	// 域名
	hostName,
	// 圖片上傳時存儲地址
	picName,
	// 項目圖片的外網地址
	picDisplayPath,
	// 項目地址
	localtionOrigin,
	jdImgPath
}
