<script setup lang="ts">
import { api } from '../../api'
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'

const router = useRouter()
const route = useRoute()

interface Time {
  content: string
  timestamp: string
}
interface Data {
  id: string
  member: string[]
  place: string[]
  mission: string
  vehicle: string
  s_date: string
  e_date: string
}

interface MemberList {
  department: string
  id: number
  name: string
}

interface PlaceList {
  id: number
  name: string
}

// 接收router数据
const id = route.params.id
// 展示数据：行
let dataShow: Data = {
  id: '',
  member: [],
  place: [],
  mission: '',
  vehicle: '',
  s_date: '',
  e_date: ''
}
// 出差人
const member = ref<string[]>([])
// 派遣时间
const time = ref<Time[]>([])
// 派遣地点
const place = ref<string[]>([])
// 派遣任务
const mission = ref()
// 交通方式
const vehicle = ref()

const readableDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const formatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 使用24小时制
  })
  if (date.toString() === 'Invalid Date') return date.toString()
  return formatter.format(date)
}

const getData = () => {
  api
    .get('mission/show/' + id)
    .then((res) => {
      dataShow = res.data
      // 人员数据更新
      dataShow.member.forEach((item) => {
        member.value.push(item)
      })
      // 地点数据更新
      dataShow.place.forEach((item) => {
        place.value.push(item)
      })
      // 时间数据更新
      time.value.push({ content: '起始时间', timestamp: readableDate(dataShow.s_date) })
      time.value.push({ content: '终止时间', timestamp: readableDate(dataShow.e_date) })
      // 任务数据更新
      mission.value = dataShow.mission
      // 出行方式更新
      vehicle.value = dataShow.vehicle
    })
    .catch((error) => {
      console.error('Failed to fetch user data:', error)
    })
}
getData()
</script>

<template>
  <el-row>
    <el-col :span="2"><span>派遣人员：</span></el-col
    ><el-col :span="1" v-for="item in member" :key="item"
      ><span>{{ item }}</span></el-col
    >
  </el-row>
  <el-row>
    <el-col :span="2"><span>派遣地点：</span></el-col
    ><el-col :span="1" v-for="item in place" :key="item"
      ><span>{{ item }}</span></el-col
    >
  </el-row>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in time"
      :key="index"
      :timestamp="activity.timestamp"
      color="#0bbd87"
      size="normal"
      type="primary"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
  <el-row
    ><span>派遣任务：</span><span>{{ mission }}</span>
  </el-row>
  <el-row>
    <span>出行方式：</span><span>{{ vehicle }}</span></el-row
  >
</template>
<style>
.el-row {
  margin-bottom: 20px;
  margin-left: 40px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
