<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <PostList></PostList>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'
  export default {
    name: 'App',
    components: {
      Header,
      PostList,
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #e1e1e1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    font-size: 14px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
</style>
