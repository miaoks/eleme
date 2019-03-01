<template>
  <div class="wrap">
    <!-- 导航条 -->
    <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
    <!-- 公示 -->
    <div class="foods_wrap">
      <h1 class="foods_safety">
        <span class="note">食品监督安全公示</span>
      </h1>
      <div class="inspection_results">
        <div class="img_wrap">
          <img
            class="expression"
            src="data:image/png;base64,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"
            alt
          >
        </div>
        <div class="inspection">
          <p class="check_result">
            <span>监督检查结果：</span>
            <span class="good">良好</span>
          </p>
          <p class="check_date">检查日期</p>
        </div>
      </div>
    </div>
    <ul class="company_store">
      <h1 class="company_info">工商登记信息</h1>
      <li class="company_address">企业名称</li>
      <li class="company_address">工商执照注册号</li>
      <li class="company_address">注册资本</li>
      <li class="company_address">注册地址</li>
      <li class="company_address">属地监管所</li>
      <li class="company_address">法定代表人</li>
    </ul>
  </div>
</template>

<script>
import Header from "../common/Header";
export default {
  data() {
    return {
      // 导航条数据
      left: "el-icon-arrow-left",
      middle: "食品监督安全公示",
      right: false,
      company_detail: this.$route.params.company_detail
    };
  },
  components: {
    Header
  }
};
</script>

<style scoped>
.wrap {
  background-color: #f1f1f1;
  overflow: hidden;
}
/* 认证 */
.foods_wrap {
  width: 100%;
  margin-top: 62px;
  background-color: white;
}
.foods_safety {
  width: 97%;
  height: 49px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 10px;
  color: #333;
  padding-left: 3%;
  line-height: 49px;
  font-size: 20px;
}
.note {
  width: 48%;
  text-align: left;
  display: inline-block;
}

.inspection_results {
  height: 76px;
  padding: 5px 3%;
  /* background-color: green; */
}
.img_wrap {
  height: 72px;
  width: 18%;
  /* background-color: antiquewhite; */
  float: left;
  margin-right: 3%;
}
.inspection {
  width: 79%;
  height: 72px;
  /* background-color: yellow; */
  float: left;
}
.inspection p {
  height: 36px;
  font-size: 15px;
  color: #666;
}
.check_result {
  line-height: 36px;
  /* background-color: pink; */
}
.check_date {
  line-height: 36px;
  /* background-color: pink; */
}
.company_store {
  background-color: white;
}
.company_info {
  height: 49px;
  margin-top: 10px;
  border-bottom: 1px solid #f1f1f1;
  color: #333;
  padding-left: 3%;
  line-height: 49px;
  font-size: 20px;
}
.company_address {
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin-left: 3%;
  font-size: 14px;
  color: #666;
  border-bottom: none;
  margin-bottom: 0;
}

/* 表情及结果设置 */
.expression {
  height: 60px;
}
.good {
  color: #7ed321;
}
</style>
