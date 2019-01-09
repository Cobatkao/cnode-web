<template>
    <div class="article">
      <slideBar></slideBar>
      <div id="loadingGif" v-if="isLoading">
        <img src="../assets/loading.gif" alt="loading_gif">
      </div>
      <!--标题部分-->
      <div v-else class="main_article">
        <div class="topic_header">
          <div class="topic_title">{{post.title}}</div>
          <ul>
            <li><span>∙ 发布于：{{post.create_at | formatDate}}</span></li>
            <li><span>∙ 作者：{{post.author.loginname}}</span></li>
            <li>∙ {{post.visit_count}}次浏览</li>
            <li>∙ 来自 {{post.tab | tabFormatter}}</li>
          </ul>
        </div>`
        <!--正文部分-->
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <!--回复部分-->
      <div class="pannel">
        <div class="topBar">{{post.reply_count}} 回复</div>
        <div v-for="(reply, index) in post.replies" class="replySec">
          <div class="replyUp">
            <div class="author_content">
              <!--用户头像-->
              <router-link class="user_avatar" :to="{
                name: 'user_info',
                params: {
                  name: reply.author.loginname
                }
              }">
                <img :src="reply.author.avatar_url" alt="replay_avatar">
              </router-link>
              <!--用户名-->
              <router-link to="" class="dark_reply_author">
                <span>{{reply.author.loginname}}</span>
              </router-link>
              <span class="blue_text">{{index+1}} 楼 ∙</span>
              <span class="date">{{reply.create_at | formatDate}}</span>
              <div class="thumb_up">
                <span v-if="reply.ups.length > 0">
                <!--<i class="fa fa-thumbs-up fa-lg"></i> -->
                  <!--<font-awesome-icon :icon="thumbs-o-up"/>-->
                  <icon-svg icon-class="thumbs" />
                  {{reply.ups.length}}
              </span>
                <span v-else></span>
              </div>
            </div>
          </div>
          <p class="reply_content" v-html="reply.content"></p>
        </div>
      </div>
    </div>
</template>

<script>
    import slideBar from '../components/slideBar'
    export default {
      components: {
        slideBar
      },
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
      },
      watch: {
        '$route'(to, from) {
          this.getArticleData()
        }
      }
    }
</script>

<style>
  @import url('../assets/markdown-github.css');
  body {
    background: #e1e1e1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    margin: 0;
    padding: 0;
  }
  ul, li {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  .main_article {
    grid-area: main;
    background: #fff;
    padding: 10px 0 10px 10px;
    border-radius: 3px;
    margin-right: 15px;
  }
  .article {
    display: grid;
    grid-template-columns: 13% auto auto 13%;
    grid-template-areas:
          ". main slideBar ."
          ". pannel . .";
    margin-top: 15px;
  }
  .topic_header {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
  .topic_header > .topic_title {
    font-size: 22px;
    font-weight: 700;

  }
  .topic_header > ul {
    display: flex;
    padding-left: 0;
    margin-top: 10px;
  }
  .topic_header > ul > li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
    height: 100%;
  }
  .topic_header > ul > li:not(:first-child) {
    margin-top: 0;
  }
  .pannel {
    grid-area: pannel;
    margin-top: 13px;
    border-radius: 3px;
    background: #fff;
    margin-right: 15px;
  }
  .topBar {
    background: #f6f6f6;
    border-radius: 3px;
    padding: 10px;
  }
  .replyUp img {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .replySec {
    border-top: 1px solid #f0f0f0;
    padding: 10px 0 10px 10px;
    display: flex;
    flex-direction: column;
  }
  .author_content {
    display: flex;
  }
  .user_avatar {
    position: absolute;

  }
  .dark_reply_author {
    color: #666;
    font-size: 12px;
    padding-left: 36px;
  }
  .dark_reply_author:hover {
    color: #08c;
  }
  .blue_text, .date {
    color: #08c;
    font-size: 11px;
    padding-left: 5px;
  }
  .date {
    padding-left: 3px;
  }
  .thumb_up {
    font-size: 12px;
    color: gray;
    flex: 1;
    text-align: end;
    padding-right: 15px;
  }
  .reply_content {
    margin: 0;
    padding-left: 3em;
    padding-bottom: 1em;
  }
  .reply_content p {
    margin: 0;
  }
  .markdown-text img {
    width: 92% !important;
  }
</style>


