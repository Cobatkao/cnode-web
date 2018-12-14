<template>
  <div id="header">
    <img id="navLogo" src="../assets/header_logo.svg" alt="header_logo">
    <ul id="navList">
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">登录</a></li>
      <li><a href="#">注册</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
      name: "Header"
  }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  #header {
    display: grid;
    height: 50px;
    background-color: #5a5555;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    grid-template-columns: 13% auto auto 13%;
    grid-template-rows: 50px;
    grid-template-areas: ". navLogo navList .";
  }
  #navLogo {
    grid-area: navLogo;
    max-width: 120px;
    align-self: center;
  }
  a {
    font-size: 14px;
    text-decoration: none;
    color: #ccc;
    padding: 10px 15px;
    text-shadow: none;
  }
  #navList {
    grid-area: navList;
    list-style: none;
    float: right;
    align-self: center;
    justify-self: flex-end;
  }
  #navList > li {
    display: inline-grid;
  }
  #navList > li >a:hover {
    color: white;
  }
</style>
