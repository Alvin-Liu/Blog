require('dotenv').config()

const WebpackAliyunOss = require('webpack-aliyun-oss')
const env = process.env

new WebpackAliyunOss({
  from: './dist/**',
  dist: '/',
  region: env.OSS_REGION,
  deletOrigin: true,
  accessKeyId: env.OSS_KEY,
  accessKeySecret: env.OSS_SECRET,
  bucket: env.OSS_BUCKET,
  setOssPath: filePath => {
    // some operations to filePath
    let index = filePath.lastIndexOf('dist')
    let Path = filePath.substring(index + 4, filePath.length)
    return Path.replace(/\\/g, '/')
  },
  setHeaders(filePath) {
    // some operations to filePath
    return {
      'Cache-Control': 'max-age=31536000'
    }
  }
}).apply()
