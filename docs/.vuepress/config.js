require('dotenv').config()

const env = process.env
const publicPath = env.PUBLIC_PATH

module.exports = {
  title: 'Alvin 的博客',
  description: 'Alvin 的博客，用于记录工作、生活、技术、思考、软技能等',
  dest: './dist',
  base: publicPath,  // TODO: 临时处理
  configureWebpack: {
    output: {
      publicPath: publicPath
    }
  },
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'github',
        link: 'https://github.com/Alvin-Liu'
      }
    ],
  },
  head: [
    // 添加百度统计
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${process.env.BAIDU_ANALYTICS}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `
    ],
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': process.env.GA
      }
    ],
    [
      'vuepress-plugin-yuque', {
        html: true,
        repoUrl: process.env.YUQUE,
        authToken: process.env.AUTH_TOKEN
      }
    ]
  ]
}