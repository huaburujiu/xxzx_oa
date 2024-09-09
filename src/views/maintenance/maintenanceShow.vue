<script setup lang="ts">
import { getGgwFaultsMaintenanceById, getMemberByIds, getPlaceListByIds } from '../../api'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import type { MaintenanceTableData } from '@/entity/maintenance'

const router = useRouter()
const route = useRoute()

interface Time {
    content: string
    timestamp: string
}

const mission = ref<MaintenanceTableData>({
    id: Number(route.params.id as string),
    resolvedBy: [],
    maintenanceLocation: [],
    typeOfMaintenance: '',
    isRemote: '',
    faultDescription: '',
    maintenanceProcess: '',
    rootCause: '',
    startTime: '',
    endTime: '',
    maintenanceResult: ''
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
    const res = await getGgwFaultsMaintenanceById(mission.value.id)
    mission.value.resolvedBy = await getMemberByIds(res.resolvedBy)
    mission.value.maintenanceLocation = await getPlaceListByIds(res.maintenanceLocation)
    mission.value.typeOfMaintenance = res.typeOfMaintenance,
        mission.value.isRemote = res.isRemote,
        mission.value.faultDescription = res.faultDescription,
        mission.value.maintenanceProcess = res.maintenanceProcess,
        mission.value.rootCause = res.rootCause,
        mission.value.maintenanceResult = res.maintenanceResult,
        mission.value.startTime = res.startTime,
        mission.value.endTime = res.endTime
    // 时间数据更新
    time.value.push({ content: '起始时间', timestamp: readableDate(mission.value.startTime) })
    time.value.push({ content: '终止时间', timestamp: readableDate(mission.value.endTime) })
}
getData()
</script>

<template>
    <el-row>
        <el-col :span="2"><span>维护人员：</span></el-col><el-col :span="1" v-for="item in mission.resolvedBy"
            :key="item"><span>{{ item }}</span></el-col>
    </el-row>
    <el-row>
        <el-col :span="2"><span>维护地点：</span></el-col><el-col :span="4" v-for="item in mission.maintenanceLocation"
            :key="item"><span>{{ item }}</span></el-col>
    </el-row>
    <el-timeline>
        <el-timeline-item v-for="(activity, index) in time" :key="index" :timestamp="activity.timestamp" color="#0bbd87"
            size="normal" type="primary">
            {{ activity.content }}
        </el-timeline-item>
    </el-timeline>
    <el-row><span>维护类型：</span><span>{{ mission.typeOfMaintenance }}</span></el-row>
    <el-row><span>是否远程：</span><span>{{ mission.isRemote }}</span></el-row>
    <el-row><span>故障描述：</span><span>{{ mission.faultDescription }}</span></el-row>
    <el-row><span>故障原因：</span><span>{{ mission.rootCause }}</span></el-row>
    <el-row><span>处理过程：</span><span>{{ mission.faultDescription }}</span></el-row>
    <el-row><span>处理结果：</span><span>{{ mission.maintenanceResult }}</span></el-row>
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
