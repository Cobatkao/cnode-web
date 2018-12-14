<template>
    <div class="article">
      <div id="loadingGif" v-if="isLoading">
        <img src="../assets/loading.gif" alt="loading_gif">
      </div>
      <div v-else>
        <div class="topic_header">
          <div class="topic_title">{{post.title}}</div>
          <ul>
            <li><span>∙ 发布于：{{post.create_at | formatDate}}</span></li>
            <li><span>∙ 作者：{{post.author.loginname}}</span></li>
            <li>∙ {{post.visit_count}}次浏览</li>
            <li>∙ 来自 {{post.tab | tabFormatter}}</li>
          </ul>
          <div v-html="post.content" class="topic_content"></div>
        </div>
        <div>
          <div class="topBar">回复</div>
          <div v-for="(reply, index) in post.replies" class="replySec">
            <div class="replyUp">
              <router-link to="">
                <img :src="reply.author.avatar_url" alt="replay_avatar">
              </router-link>
              <router-link>
                <span>{{reply.author.loginname}}</span>
              </router-link>
              <span>{{index+1}}</span><span>楼</span>
              <span v-if="reply.ups.length > 0">
              👍{{reply.ups.length}}
              </span>
              <span v-else></span>
            </div>
            <p v-html="reply.content"></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Article",
      data() {
        return {
          isLoading: false,
          post: {}
        }
      },
      methods: {
        getArticleData() {
          this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then((res) => {
              if (res.data.success === true) {
                this.isLoading = false
                this.post = res.data.data
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      beforeMount() {
        this.isLoading = true
        this.getArticleData()
      }
    }
</script>

<style>
  @import url('../assets/markdown-github.css');

</style>
