// require('dotenv').config()

// const env = process.env

// const GITALK_CLIENT_SECRET = env.GITALK_CLIENT_SECRET
const GITALK_CLIENT_SECRET = '5013a1284910323626985abb7ef236078982efd1'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default ({ pages })=> {
  const path = window.location.pathname
  // 获取当前页面信息
  const dist = pages.filter(item => {
    return item.path === path
  })[0]

  //只有在isNoPage是false的时候才会显示评论
  if (!dist.frontmatter || !dist.frontmatter.isNoPage) {
    const page = document.querySelector('.page')

    // const linkGitalk = document.createElement('link')
    // linkGitalk.href = 'https://unpkg.com/gitalk/dist/gitalk.css'
    // linkGitalk.rel = 'stylesheet'
    // document.body.appendChild(linkGitalk)

    // const scriptGitalk = document.createElement('script')
    // scriptGitalk.src = 'https://unpkg.com/gitalk/dist/gitalk.min.js'
    // document.body.appendChild(scriptGitalk)

    // scriptGitalk.onload= () => {
      let gitalk = document.createElement('div')
      gitalk.id = 'gitalk-container'
      page.appendChild(gitalk)
      var _gitalk = new Gitalk({
        clientID: 'cdca1f1254fc9bb0d3ed',
        clientSecret: GITALK_CLIENT_SECRET,
        repo: 'Blog', // 存储评论的仓库名字
        owner: 'Alvin-Liu',
        admin: ['Alvin-Liu'],  //仓库的管理员，可以有多个
        id: decodeURI(path),      // 每个页面根据url生成对应的issue，保证页面之间的评论都是独立的
      })
      _gitalk.render('gitalk-container')
    // }
  }
}
