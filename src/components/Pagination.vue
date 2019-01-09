<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button class="pagebtn" v-if="isGreaterTan4">......</button>
    <button v-for="btn in pagebtns"
            @click="changeBtn(btn)"
            :class="[{currentPage: btn == currentPage}, 'pagebtn']">
      {{btn}}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
    import $ from 'jquery'
    export default {
      name: "Pagination",
      data() {
        return {
          pagebtns: [1,2,3,4,5,'......'],
          currentPage: 1,
          isGreaterTan4: false
        }
      },
      methods: {
        changeBtn(page) {
          if (typeof page != 'number') {
            switch(page.target.innerText) {
              case '首页':
                this.pagebtns = [1,2,3,4,5,'......']
                this.changeBtn(1)
                break
              case '下一页':
                $('button.currentPage').next().click()
                break
              case '上一页':
                $('button.currentPage').prev().click()
                break
              default:
                break
            }
            return
          }
          if (page > 4) {
            this.isGreaterTan4 = true
          } else {
            this.isGreaterTan4 = false
          }
          this.currentPage = page
          if (page == this.pagebtns[4]) {
            this.pagebtns.shift()
            this.pagebtns.splice(4, 0, (this.pagebtns[3] + 1))

          } else if (page == this.pagebtns[0] && page > 1) {
            this.pagebtns.splice(0, 0, (this.pagebtns[0] - 1))
            this.pagebtns.splice(5, 1)
          }
          // 子父组件通信：传递页码
          this.$emit('refreshList', this.currentPage)
        }
      }
    }
</script>

<style scoped>
  .pagination {
    display: flex;
    padding: 9px;
    outline: 1px solid #ccc;
    background: #fff;
  }
  button {
    color: #838383;
    padding: 5px 15px;
    border-radius: 3px;
    border: 1px solid #cccccc;
    outline: none;
    margin: 0 4px;
    font-weight: 700;
  }
  .currentPage {
    color: white;
    background-color: #1f1b1b;
  }
  .pagebtn {
    position: relative;
    width: 50px;
    margin: 0 4px;
  }
</style>
