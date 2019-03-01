<template>
  <div>
    <h1>我们的</h1>
    <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
    <div>
      
      <img src alt>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      middle: this.$route.params.goods_data.name,
      right: false,
      goods_data: this.$route.params.goods_data
    };
  },
  created() {
    console.log(this.$route.params);
  },
  components: {
    Header
  }
};
</script>

<style>
</style>
