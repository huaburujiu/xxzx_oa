export interface User {
  name: string
  // 可以添加更多用户属性
}

export interface AuthState {
  isLoggedIn: boolean
  user?: User // 使用可选链操作符表示用户信息可能不存在
}
