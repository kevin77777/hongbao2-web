const domain = process.env.dev ? '/' : 'https://api.mtdhb.com/'

const apis = {
	getCaptcha: 'user/registerCaptcha',
	getRegisterCode: 'user/registerEmail',
	register: 'user/register',
	login: 'user/login',
	logout: 'user/logout',
	getUser: 'user',
	cookie: 'user/cookie',
	deleteCookie: 'user/clear',
	getAvailableCount: 'user/available',
	getHongbao: 'user/receiving',
	getHongbaoHistory: 'user/receiving',
	refresh: 'user/refresh',
	zhuangbi: 'zhuangbi'
}

export default Object.keys(apis).reduce((obj, key) => (obj[key] = domain + apis[key], obj), {})
