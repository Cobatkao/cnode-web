import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import userInfo from '../components/userInfo'
import slideBar from '../components/slideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
      }
    },
    {
      name: 'user_info',
      path: '/userInfo:name',
      components: {
        main: userInfo
      }
    }
  ]
})
