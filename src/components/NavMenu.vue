<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const activeIndex = ref('1')

defineProps({
  title: String
})
</script>
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/">
      <template #title>主页</template>
    </el-menu-item>

    <el-sub-menu index="mission">
      <template #title>任务派遣</template>
      <el-menu-item index="/mission/report">任务汇报</el-menu-item>
      <el-menu-item index="/mission/sum">任务汇总</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="trip" disabled>
      <template #title>出差表单</template>
      <el-menu-item index="/trip/new">新建审批</el-menu-item>
      <el-menu-item index="/trip/ongo">进行中</el-menu-item>
      <el-menu-item index="/trip/done">已审批</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3" disabled>
      <template #title>出差审批</template>
      <el-menu-item index="/appr/pend">待审批</el-menu-item>
      <el-menu-item index="/appr/end">已审批</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4" disabled>Info</el-menu-item>
    <el-menu-item index="5" disabled>Orders</el-menu-item>
  </el-menu>
</template>

<style scoped></style>
