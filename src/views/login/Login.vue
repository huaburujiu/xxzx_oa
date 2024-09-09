<script setup lang="ts">
import type { User } from '@/entity/auth';
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

function login() {
    // 这里应该是调用API进行登录，但在这个示例中，我们直接调用action  
    // 假设我们有一个用户对象  
    const mockUser: { name: string } = { name: '张三' };
    // 注意：这里我们可能需要将mockUser转换为User类型，或者调整User接口以匹配mockUser  
    authStore.login(mockUser as User); // 类型断言为User  
}

function logout() {
    authStore.logout()
}

</script>

<template>
    <div>
        <p>登录状态：{{ authStore.isAuthenticated }}</p>
        <p>用户名：{{ authStore.userName }}</p>
        <button @click="login">登录</button>
        <button @click="logout" v-if="authStore.isAuthenticated">登出</button>
    </div>
</template>
<style scoped>
</style>