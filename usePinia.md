在 Vue 3 中，结合 TypeScript 和 Pinia 作为状态管理库时，正确地访问 useAuthStore()（假设这是你定义的用于管理认证状态的 Pinia store）需要遵循几个步骤。首先，确保你已经正确安装了 Pinia，并在你的 Vue 3 项目中设置了它。

步骤 1: 安装和设置 Pinia
如果你还没有安装 Pinia，可以通过 npm 或 yarn 来安装它：

bash
npm install pinia  
# 或者  
yarn add pinia
然后，在你的 Vue 应用中创建 Pinia 实例，并在 main.ts 或 main.js 文件中使用它：

typescript
// main.ts  
import { createApp } from 'vue'  
import { createPinia } from 'pinia'  
import App from './App.vue'  
  
const app = createApp(App)  
  
const pinia = createPinia()  
  
app.use(pinia)  
  
app.mount('#app')
步骤 2: 创建 Auth Store
接下来，你需要创建一个用于认证的状态管理 store。在 Pinia 中，你可以定义一个 store 来管理你的认证状态，例如用户的登录状态、token 等。

typescript
// stores/auth.ts  
import { defineStore } from 'pinia'  
  
export const useAuthStore = defineStore('auth', {  
  state: () => ({  
    isAuthenticated: false,  
    userToken: '',  
  }),  
  actions: {  
    login(userCredentials) {  
      // 这里应该是你的登录逻辑  
      // 假设登录成功  
      this.isAuthenticated = true  
      this.userToken = 'some-token'  
    },  
    logout() {  
      this.isAuthenticated = false  
      this.userToken = ''  
    },  
  },  
})
步骤 3: 在组件中访问 Auth Store
现在，你可以在你的 Vue 组件中通过 useAuthStore() 钩子来访问你的认证状态了。

vue
<template>  
  <div>  
    <p v-if="authStore.isAuthenticated">Logged in as {{ authStore.userToken }}</p>  
    <p v-else>Not logged in</p>  
    <button @click="login">Login</button>  
    <button @click="logout" v-if="authStore.isAuthenticated">Logout</button>  
  </div>  
</template>  
  
<script lang="ts">  
import { defineComponent } from 'vue'  
import { useAuthStore } from './stores/auth'  
  
export default defineComponent({  
  setup() {  
    const authStore = useAuthStore()  
  
    const login = () => {  
      // 这里可以调用 authStore.login 方法，但在这个示例中我们只是简单设置状态  
      authStore.isAuthenticated = true  
      authStore.userToken = 'test-token'  
    }  
  
    const logout = () => {  
      authStore.isAuthenticated = false  
      authStore.userToken = ''  
    }  
  
    return { authStore, login, logout }  
  },  
})  
</script>
注意：在模板中直接访问 store 的状态（如 authStore.isAuthenticated）通常不是最佳实践，因为它会导致不必要的重新渲染。更好的做法是在 setup 函数中使用 computed 或直接返回 store 中的状态作为响应式引用。

优化模板访问
vue
<template>  
  <div>  
    <p v-if="isAuthenticated">Logged in as {{ userToken }}</p>  
    <p v-else>Not logged in</p>  
    <!-- ... 其他按钮和逻辑 -->  
  </div>  
</template>  
  
<script lang="ts">  
import { defineComponent, computed } from 'vue'  
import { useAuthStore } from './stores/auth'  
  
export default defineComponent({  
  setup() {  
    const authStore = useAuthStore()  
  
    const isAuthenticated = computed(() => authStore.isAuthenticated)  
    const userToken = computed(() => authStore.userToken)  
  
    // ... 其他逻辑  
  
    return { isAuthenticated, userToken, /* ... 其他方法或响应式数据 */ }  
  },  
})  
</script>
这样，你就可以在模板中更加高效地访问和显示你的认证状态了。