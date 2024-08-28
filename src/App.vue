<script setup lang="ts">
import NavMenu from './components/NavMenu.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '信息中心综合系统' // 设置页面标题

  // const link = document.createElement('link')
  // link.rel = 'icon'
  // link.href = '/favicon.ico'
  // link.type = 'image/x-icon'
  // document.head.appendChild(link)
})
</script>

<template>
  <el-container style="height: 100vh; width: 80vw">
    <!-- 使用 el-container 作为外层容器 -->
    <el-header><el-text class="mx-1" size="large">信息中心综合系统</el-text></el-header>
    <!-- 顶部导航栏 -->
    <NavMenu title="出差审批" />
    <el-main><RouterView /> </el-main>
    <el-footer></el-footer>
    <!-- 底部信息 -->
  </el-container>
</template>

<style scoped>
/* 添加一些样式来区分内容区域 */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
  color: #303133;
  line-height: 36px;
  text-align: center;
}
.bg-purple-light {
  background: #e9ecef;
  color: #303133;
  line-height: 36px;
  text-align: center;
}
.el-header {
  text-align: center;
  height: 80px;
  line-height: 80px;
}
.el-text {
  font-family: 'Microsoft YaHei', sans-serif; /* 使用微软雅黑字体，‌如果没有则使用无衬线字体 */
  font-size: 24px; /* 字体大小 */
  color: #333333; /* 字体颜色 */
  text-align: center; /* 文本居中 */
  padding: 20px 0; /* 上下内边距20px，‌左右内边距0 */
  margin-bottom: 20px; /* 底部外边距20px */
}

#app {
  width: 100%;
  height: 100vh; /* 使用视口高度单位 */
  background-color: #f0f0f0; /* 浅灰色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
}
</style>
