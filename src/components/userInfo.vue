<template>
  <div class="userInfo">
    <!--数据未返回时显示-->
    <div id="loadingGif" v-if="isLoading">
      <img src="../assets/loading.gif" alt="loading_gif">
    </div>
    <div class="userInformation">
      <section>
        <div class="panel">
          <div class="header">
            <ul class="header_content">
              <li>
                <span><a href="/">主页</a></span>
                <span class="seperator">/</span>
              </li>
            </ul>
          </div>
          <div class="userDetail">
            <div class="avatar">
              <img :src="userinfo.avatar_url" class="user_avatar" alt="user_avatar">
            </div>
            <span>{{userinfo.loginname}}</span>
            <div class="user_profile">
              <ul class="innerDetail">
                <li>
                  <p>{{userinfo.score}} 积分</p>
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
      </section>
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
      this.isLoading = true
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
