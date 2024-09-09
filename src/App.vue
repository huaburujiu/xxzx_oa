<script setup lang="ts">
import NavMenu from './components/NavMenu.vue'
import Login from './views/login/Login.vue'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

onMounted(() => {
  document.title = '信息中心综合系统' // 设置页面标题

  // const link = document.createElement('link')
  // link.rel = 'icon'
  // link.href = '/favicon.ico'
  // link.type = 'image/x-icon'
  // document.head.appendChild(link)
})

const authStore = useAuthStore()


const isAuthenticated = computed(() => authStore.isAuthenticated)



</script>

<template>
  <Login v-if="!isAuthenticated" />
  <el-container v-else style="width: 94.9rem;height: 100%;">
    <el-header style="width: 100%">
      <el-text style="width: 100%" class="mx-1">信息中心综合系统</el-text>
      <NavMenu title="出差审批" />
    </el-header>
    <el-main style="width: 100%">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}

/* 其他样式调整 */
.el-text {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 1.5rem;
  color: #333333;
  text-align: center;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-header {
  padding: 0;
  height: auto;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}


.el-main {
  padding: 1rem 0rem 0rem 7rem;
  margin: 0;
  height: auto;
  min-height: 40rem;
}
</style>
