<template>
  <div class="userInfo">
    <!--数据未返回时显示-->
    <div id="loadingGif" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading_gif">
    </div>
    <div class="panel">
      <div class="header">
        <ul class="top_content">
          <li>
            <span><a href="/">主页</a></span>
            <span class="seperator">/</span>
          </li>
        </ul>
        <div class="userDetail">
          <div class="outer_profile clearfix">
            <div class="avatar">
              <img :src="userinfo.avatar_url" class="user_avatar" alt="user_avatar">
            </div>
            <span class="login_name">{{userinfo.loginname}}</span>
          </div>
          <div class="user_profile">
            <ul class="innerDetail">
              <li>
                <p class="score">{{userinfo.score}} 积分</p>
              </li>
              <li>
                <i class="fa fa-github-alt fa-lg"></i>
                <span>{{userinfo.githubUsername}}</span>
              </li>
              <li>
                <p>注册时间：{{userinfo.create_at | formatDate}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="replies">
        <div class="top_content">最近参与的话题</div>
        <ul class="recent-r">
          <li v-for="item in userinfo.recent_replies">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: item.id
              }
              }">
                {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="topics">
        <div class="top_content">最近创建的话题</div>
        <ul class="recent-c">
          <li v-for="item in userinfo.recent_topics">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: item.id
              }
              }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userInfo",
    data() {
      return {
        isLoading: false,
        userinfo: {},
      }
    },
    methods: {
      getUserInfo() {
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then((res) => {
            console.log(res)
            if (res.data.success) {
              console.log(this)
              this.isLoading = false
              this.userinfo = res.data.data
            }
          })
          .catch ((err) => {
            console.log(err)
          })
      }
    },
    beforeMount() {
      this.getUserInfo()
      this.isLoading = true
    }
  }
</script>

<style scoped>
  body {
    color: #778087;
    background: #e1e1e1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    color: #08c;
  }
  a:hover, a:focus {
    color: #005580;
    text-decoration: underline;
  }

  .panel {
    display: grid;
    grid-template-columns: 13% auto 13%;
    grid-template-areas:
          ". header ."
          ". recent_engaged ."
          ". recent_created .";
  }
  .header {
    grid-area: header;
  }
  .replies {
    grid-area: recent_engaged;
  }
  .topics {
    grid-area: recent_created;
  }
  .header, .replies, .topics {
    margin-top: 15px;
  }
  .userDetail, .recent-r, .recent-c {
    background: #fff;
  }
  .top_content {
    background: #f6f6f6;
    border-radius: 3px 3px 0 0;
    padding: 10px;
    color: #778087;
    font-size: 12px;
  }
  .header_content span:first-child > a {
    color: #80bd01;
    font-size: 12px;
  }
  .seperator {
    padding: 0 5px;
    color: #ccc;
  }
  .userDetail, .recent-c, .recent-r {
    padding: 10px;
    line-height: 3em;
  }
  .avatar {
    float: left;
    margin-right: 10px;
  }
  .clearfix::after {
    content:"";
    display:block;
    clear:both;
    visibility: hidden;
    height: 0;
  }
  .innerDetail > li {
    margin-top: 10px;
    line-height: 2em;
  }
  .innerDetail > li:last-child {
    font-size: 12px;
    margin-bottom: 10px;
  }
   {
    padding: 10px;
  }
  .user_avatar {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
  .user_profile, .login_name {
    color: #778087;
    font-size: 14px;
  }
  .login_name {
    padding-left: 45px;
  }
  .score {
    color: #000;
  }
</style>
