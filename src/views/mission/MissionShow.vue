<script setup lang="ts">
import { getMissionById, getMemberByIds, getPlaceListByIds } from '../../api'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import type { MissionShowData } from '@/entity'

const router = useRouter()
const route = useRoute()

interface Time {
  content: string
  timestamp: string
}

const mission = ref<MissionShowData>({
  id: Number(route.params.id as string),
  member: [],
  place: [],
  content: '',
  vehicle: '',
  s_date: '',
  e_date: ''
})

// 派遣时间
const time = ref<Time[]>([])

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

const getData = async () => {
  const res = await getMissionById(mission.value.id)
  mission.value.member = await getMemberByIds(res.member)
  mission.value.place = await getPlaceListByIds(res.place)
  console.log(mission.value.place)
  mission.value.content = res.content
  mission.value.vehicle = res.vehicle
  mission.value.e_date = res.e_date
  mission.value.s_date = res.s_date
  // 时间数据更新
  time.value.push({ content: '起始时间', timestamp: readableDate(mission.value.s_date) })
  time.value.push({ content: '终止时间', timestamp: readableDate(mission.value.e_date) })
}
getData()
</script>

<template>
  <el-row>
    <el-col :span="2"><span>派遣人员：</span></el-col
    ><el-col :span="1" v-for="item in mission.member" :key="item"
      ><span>{{ item }}</span></el-col
    >
  </el-row>
  <el-row>
    <el-col :span="2"><span>派遣地点：</span></el-col
    ><el-col :span="4" v-for="item in mission.place" :key="item"
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
    ><span>派遣任务：</span><span>{{ mission.content }}</span>
  </el-row>
  <el-row>
    <span>出行方式：</span><span>{{ mission.vehicle }}</span></el-row
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
