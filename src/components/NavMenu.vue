<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')

defineProps({
  title: String
})
</script>
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router :ellipsis="false">
    <el-menu-item index="/">
      <template #title>主页</template>
    </el-menu-item>

    <el-sub-menu index="mission">
      <template #title>工单管理</template>
      <el-menu-item index="/mission/report">新建工单</el-menu-item>
      <el-menu-item index="/mission/sum">工单汇总</el-menu-item>
      <el-menu-item index="/mission/process">工单处理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="trip">
      <template #title>出差审批</template>
      <el-menu-item index="/trip/new">新建审批</el-menu-item>
      <el-menu-item index="/trip/ongo">进行中</el-menu-item>
      <el-menu-item index="/trip/done">已审批</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>故障维护</template>
      <el-menu-item index="/maintenance/report">汇报</el-menu-item>
      <el-menu-item index="/maintenance/sum">汇总</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>电话计费</template>
      <el-menu-item index="/tele/report">基本信息管理</el-menu-item>
      <el-menu-item index="/tele/sum">计费</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="5" disabled>其他</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  background-color: white;
}
</style>
