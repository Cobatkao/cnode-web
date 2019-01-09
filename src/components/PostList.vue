<template>

  <div class="PostList">
    <!--数据未返回时显示-->
    <div id="loadingGif" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading_gif">
    </div>
    <!--主题帖列表-->
    <div class="posts">
      <ul>
        <!--顶栏-->
        <li>
          <div class="topBar">
            <a href="#">全部</a>
            <a href="#">精华</a>
            <a href="#">分享</a>
            <a href="#">问答</a>
            <a href="#">招聘</a>
            <a href="#">客户端测试</a>
          </div>
        </li>
        <li v-for="postItem in postLists">
          <img class="avatar" :src="postItem.author.avatar_url" alt="author_avatar">
          <span class="replyNum">
            <span class="replyCount">{{postItem.reply_count}}</span>
            <span class="countSeperator">/</span>
            <span class="visitCount">{{postItem.visit_count}}</span>
          </span>
          <span class="tab">
             <span :class="[{post_good: (postItem.good == true)}, {post_good: (postItem.top == true)},
          {'topiclist_tab': (postItem.good != true && postItem.top != true)}]">{{postItem | tabFormatter}}
            </span>
          </span>
          <span class="title">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: postItem.id,
                name: postItem.author.loginname
              }}">
              {{postItem.title}}
            </router-link>
          </span>
          <span class="reply_at">
            {{postItem.last_reply_at | formatDate}}
          </span>
        </li>
        <div>
          <Pagination @refreshList="justRefreshIt"></Pagination>
        </div>
      </ul>
    </div>
    <div class="bio">
      <ul class="author">
        <li class><span class="me">作者</span></li>
        <li class="qrcode">
          <img src="https://i.loli.net/2018/12/14/5c13a6800b1ca.png" alt="qrcode">
        </li>
        <li><a href="http://isaacgao.cn/">Blog</a></li>
        <li><a href="https://github.com/Cobatkao">Github</a></li>
        <li><a href="mailto:isaackao@foxmail.com" title="isaackao@foxmail.com">Email</a></li>
        <li><a href="http://weibo.com/isaacgaohang">Weibo</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  export default {
    name: "PostList",
    data() {
      return {
        isLoading: false,
        postLists: [],
        postpage: 1
      }
    },
    components: {
      Pagination
    },
    methods:{
      getListData() {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: this.postpage,
            limit: 20
          }
        })
          .then(res => {
            // 加载成功后去除动画
            this.isLoading = false
            this.postLists = res.data.data
        })
          .catch(err => {
            console.info(err)
          })
      },
      justRefreshIt(data) {
        this.postpage = data
        this.getListData()
      }
    },
    // 页面挂载之前执行
    beforeMount() {
      // 加载成功前先显示动画
      this.isLoading = true //加载成功之前显示加载动画
      this.getListData() //在页面加载之前获取数据
    }
  }
</script>

<style scoped>
  .PostList {
    display: grid;
    grid-template-columns: 13% auto auto 13%;
    grid-template-areas: ". main bio .";
  }
  .posts {
    grid-area: main;
    margin-top: 14px;
  }
  .bio {
    grid-area: bio;
    width: 290px;
    font-size: 14px;
    margin-top: 14px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
  .bio > ul {
    margin: 0;
  }
  .bio li:first-child {
    padding: 10px 0;
    text-align: left;
  }
  .bio li:first-child > .me {
    margin-left: 10px;
  }
  .bio li {
    text-align: center;
    width: 290px;
    background: white;
  }
  .bio li a {
    display: inline-block;
    padding: 10px 0;
    width: 240px;
    background: #5a5555;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    color: #ccc;
    text-shadow: 2px 1px 0px #212121;
    margin-top: 10px;
  }
  .bio li:last-child a {
    margin-bottom: 15px;
  }
  .bio img {
    width: 290px;
  }
  .replyNum {
    grid-area: replyNum;
    display: grid;
    grid-template-columns: 24px 5px 24px;
    justify-content: center;
    align-items: center;
  }
  .replyNum > .replyCount {
    color: #9e78c0;
    font-size: 14px;
    justify-self: flex-end;
  }
  .replyNum > .visitCount {
    font-size: 10px;
    color: #b4b4b4;
  }
  .replyNum > .countSeperator {
    font-size: 10px;
  }
  .tab {
    grid-area: tab;
  }
  .title {
    grid-area: title;
    cursor: pointer;
  }
  .title > a {
    color: #333;
    text-decoration: none;
  }
  .title > a:hover {
    text-decoration: underline;
  }
  .reply_at {
    grid-area: reply_at;
    justify-self: flex-end;
    align-self: center;
    font-size: 11px;
    color: #778087;
  }
  .avatar {
    width: 30px;
    grid-area: avatar;
  }
  .avatar, .replyNum, .tab, .title {
    justify-self: flex-start;
    align-self: center;
  }
  li {
    list-style: none;
  }
  /*精华与置顶*/
  .post_good, .post_top {
    background: #80bd01;
    padding: 2px 4px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }
  .topiclist_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }
  ul {
    padding: 0;
  }
  ul li:first-child {
    padding: 10px;
    background: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  ul li:first-child a {
    color: #80bd01;
    font-size: 14px;
    margin: 0 10px;
    text-decoration: none;
  }
  ul li:first-child a:hover {
    color: #005580;
  }
  ul li:first-child a:first-child {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
  .posts ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
    display: grid;
    grid-template-columns: 30px 70px 32px 70% 50px;
    grid-column-gap: 10px;
    grid-template-areas: "avatar replyNum tab title reply_at";
  }
  .posts li:not(:first-child):hover {
    background: #f5f5f5;
  }
</style>
