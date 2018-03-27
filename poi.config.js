module.exports = {
	entry: './src/index.js',
	staticFolder: 'public',
	homepage: 'https://hongbao2.oss-cn-shanghai.aliyuncs.com/',
	html: {
		template: './src/index.html'
	},
	presets: [
		require('poi-preset-react')()
	],
	devServer: {
		proxy: ['/user', '/zhuangbi'].reduce((obj, key) => {
			obj[key] = {
				target: 'https://api.mtdhb.com/',
				changeOrigin: true
			}
			return obj
		}, {})
	}
}
