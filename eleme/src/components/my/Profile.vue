<template>
<div>
<Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
<Footer></Footer>
</div>
</template>

<script>
import Header from "../common/Header"
import Footer from "../common/footer"
export default {
  data() {
    return {
      left:"el-icon-search",
      middle:"搜索",
      right: false,
    };
  },
  components:{
      Header,
      Footer
  }
};
</script>

<style scoped>

</style>