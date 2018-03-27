const gulp = require('gulp')
const ossSync = require('gulp-oss-sync')

const ossSetting = {
	connect: {
		region: 'oss-cn-shanghai',
		accessKeyId: process.env.OSS_ACCESS_KEY_ID,
		accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
		bucket: 'hongbao2'
	},
	setting: {
		dir: '',
		noClean: false,
		force: true,
		quiet: true
	},
	controls: {
		headers: {
			'Cache-Control': 'max-age=' + 60 * 60 * 24 * 365 * 10
		}
	}
}
const ossHtmlSetting = Object.assign({}, ossSetting, {
	controls: {
		headers: {
			'Cache-Control': 'no-cache'
		}
	}
})
gulp.task('res', () => gulp.src(['dist/**/*', '!dist/**/*.html']).pipe(ossSync(ossSetting)))
gulp.task('html', ['res'], () => gulp.src('dist/**/*.html').pipe(ossSync(ossHtmlSetting)))

gulp.task('default', ['html'])
