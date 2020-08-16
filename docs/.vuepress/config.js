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
      { text: '技术', link: '/technology/' },
      {
        text: 'github',
        link: 'https://github.com/Alvin-Liu'
      }
    ],
    sidebar: {
      '/technology/': [
        {
          title: 'CSS',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            'css/test'
          ]
        }
      ]
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': process.env.GA
      }
    ]
  ]
}