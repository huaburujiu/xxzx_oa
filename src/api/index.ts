import type { Member, Place, ResponseData } from '@/entity'
import type { MaintenanceResponseData } from '@/entity/maintenance'
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
//获得memberList数据
export const getMemberListLikeName = async (query: string): Promise<Member[]> => {
  const params = { nameLike: query }
  try {
    const response = await api.get('member/like/name', { params })
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as Member[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch memberList data:', error)
    throw error
  }
}

//post请求
//查询member[]通过id[]
export const getMemberByIds = async (ids: number[]): Promise<string[]> => {
  try {
    const response = await api.post('member/ids', ids)
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data.map((memberList) => memberList.name) as string[] // 确保响应数据是 Member[] 类型
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
    return response.data as Place[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}

//axios请求
//模糊查询placeList数据
export const getPlaceListLikeName = async (query: string): Promise<Place[]> => {
  const params = { nameLike: query }
  try {
    const response = await api.get('place/like/name', { params })
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as Place[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}

//post请求
//查询place[]通过id[]
export const getPlaceListByIds = async (ids: number[]): Promise<string[]> => {
  try {
    const response = await api.post('place/ids', ids)
    if (!response.data || !(response.data instanceof Array)) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data.map((placeList) => placeList.name) as string[] // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}

export const getMissionById = async (id: number): Promise<ResponseData> => {
  try {
    const response = await api.get('mission/show/' + id)
    if (!response.data || !response.data) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as ResponseData // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}

export const getGgwFaultsMaintenanceById = async (id: number): Promise<MaintenanceResponseData> => {
  try {
    const response = await api.get('ggwFaultsMaintenance/show/' + id)
    if (!response.data || !response.data) {
      throw new Error('Invalid response data or not an array')
    }
    return response.data as MaintenanceResponseData // 确保响应数据是 Member[] 类型
  } catch (error) {
    console.error('Failed to fetch placeList data:', error)
    throw error
  }
}



