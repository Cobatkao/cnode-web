<template>
    <div class="authorinfo">
      <div class="authorsummary">
        <div class="top_Bar">作者</div>
        <router-link :to="{
                name: 'user_info',
                params: {
                  name: userinfo.loginname
                }
              }">
          <img class="side_user_avatar" :src="userinfo.avatar_url" alt="replay_avatar">
        </router-link>
      </div>

      <div class="recent_topics">
        <div class="top_Bar">作者最近主题</div>
        <ul class="inner_content">
          <li v-for="list in topiclimitby5">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: list.id,
                name: list.author.loginname
              }
            }">
              {{list.title}}
            </router-link>

          </li>
        </ul>
      </div>

      <div class="recent_replies">
        <div class="top_Bar">作者最近回复</div>
        <ul class="inner_content">
          <li v-for="list in replylimitby5">
            <router-link :to="{
              name: 'post_content',
              params: {
                id: list.id,
                name: list.author.loginname
              }
            }">
              {{list.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SlideBar",
      data() {
        return {
          userinfo: {}
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
            .catch((err) => {
              console.log(err)
            })
        }
      },
      beforeMount() {
        this.getUserInfo()
        this.isLoading = true
      },
      computed: {
        topiclimitby5() {
          if (this.userinfo.recent_topics) {
            return this.userinfo.recent_topics.slice(0, 5)
          }
        },
        replylimitby5() {
          if (this.userinfo.recent_replies) {
            return this.userinfo.recent_replies.slice(0, 5)
          }
        }
      }
    }
</script>

<style>
  .authorinfo {
    grid-area: slideBar;
    width: 290px;
  }
  .authorsummary, .recent_topics, .recent_replies {
    margin-bottom: 10px;
    background: #fff;
  }
  .side_user_avatar {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    padding: 10px;
  }
  .top_Bar {
    background: #f6f6f6;
    border-radius: 3px 3px 0 0;
    padding: 10px;
  }
  .inner_content {
    padding: 10px;
    color: #838383;
    font-size: 12px;
  }
  a:hover {
    color: #005580;
    text-decoration: underline;
  }
</style>
