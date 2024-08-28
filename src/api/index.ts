import type { Member, Place } from '@/entity'
import axios from 'axios'

const baseURL = 'http://localhost:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.get['Accept'] = 'application/json'

export const api = axios.create({
  baseURL: baseURL // 设置基础URL
  // timeout: 10000 // 设置请求超时时间
})

//axios请求
//获得memberList数据
export const getMemberList = async (): Promise<Member[]> => {
  try {
    const response = await api.get('member/list')
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as Member[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch memberList data:', error)
    throw error
  }
}

//axios请求
//获得placeList数据
export const getPlaceList = async (): Promise<Place[]> => {
  try {
    const response = await api.get('place/list')
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as Member[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}
