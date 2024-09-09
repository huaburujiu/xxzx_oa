import type { AuthState, User } from '@/entity/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    user: undefined // 或者 null，取决于你的偏好
  }),
  actions: {
    login(user: User) {
      // 这里应该是调用API进行登录验证的逻辑
      // 假设登录成功，我们直接更新状态
      this.isLoggedIn = true
      this.user = user
    },
    logout() {
      // 登出逻辑，重置状态
      this.isLoggedIn = false
      this.user = undefined
    }
  },
  getters: {
    isAuthenticated: (state): boolean => state.isLoggedIn,
    userName: (state): string => state.user?.name || '' // 使用可选链操作符来安全地访问用户名
  }
})
