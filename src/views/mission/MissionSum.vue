<script setup lang="ts">
import { api, getMemberList, getPlaceList } from '../../api'
import { computed, onMounted, ref } from 'vue'
import { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { TableDataMapper, DateTimeMapper } from '../../mapper/index'
import type { ResponseData, Member, Place } from '../../entity/index'

interface TableData {
  id: number
  member: string[]
  place: string[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}
interface filterData {
  text: string
  value: string
}
// 从服务器获取数据
const memberList = ref<Member[]>([])
const placeList = ref<Place[]>([])
let resData: ResponseData[]
const tableDataMapper = new TableDataMapper()
const dateTimeMapper = new DateTimeMapper()
// 表格数据
let tableDatas = ref<TableData[]>([])
const missions = ref<TableData[]>([])

// 生命周期：挂载
onMounted(() => {
  getData()
})
// 路由
const router = useRouter()
const route = useRoute()

// 服务器加载数据
const getData = async () => {
  memberList.value = await getMemberList()
  placeList.value = await getPlaceList()
  resData = await api.get('mission/list').then((res) => {
    return res.data
  })
  resData.map((item) => {
    const tableData: TableData = {
      id: item.id,
      member: tableDataMapper.getMemberNameColumn2(memberList.value, item.member),
      place: tableDataMapper.getPlaceNameColumn2(placeList.value, item.place),
      content: item.content,
      vehicle: item.vehicle,
      s_date: dateTimeMapper.formatDateString(item.s_date),
      e_date: dateTimeMapper.formatDateString(item.e_date)
    }
    tableDatas.value.push(tableData)
  })
  missions.value = tableDatas.value
}
// 日期排序函数
const sortStartDate = (a: TableData, b: TableData) => {
  return (
    new Date(dateTimeMapper.strToDate(a.s_date)).getTime() -
    new Date(dateTimeMapper.strToDate(b.s_date)).getTime()
  )
}
const sortEndDate = (a: TableData, b: TableData) => {
  return (
    new Date(dateTimeMapper.strToDate(a.e_date)).getTime() -
    new Date(dateTimeMapper.strToDate(b.e_date)).getTime()
  )
}
// 时间筛选器：日期匹配
const matchFilterDate = (date: Date, startTime: string) => {
  const start = new Date(startTime + '-1 00:00:00').getTime()
  const reg = /\d$/
  const num = new Number(startTime.match(reg)).valueOf() + 1
  const end = new Date(startTime.replace(reg, num.toString()) + '-1 00:00:00').getTime()

  if (date.getTime() < end && date.getTime() >= start) {
    return true
  }
  return false
}
// 时间筛选器：起始时间过滤器选择函数
const startTimeFilterHandler = (value: string, row: TableData) => {
  return matchFilterDate(new Date(dateTimeMapper.strToDate(row.s_date)), value)
}
const endTimeFilterHandler = (value: string, row: TableData) => {
  return matchFilterDate(new Date(dateTimeMapper.strToDate(row.e_date)), value)
}
// 时间筛选器：构造筛选栏目filtersData
const setFiltersData: () => filterData[] = () => {
  let data: filterData[] = []
  let currentDate = new Date()
  const minDateTime = new Date(currentDate.getFullYear(), 0, 1)
  currentDate = minDateTime
  const endDateTime = new Date(currentDate.getFullYear(), 11, 1)
  while (currentDate <= endDateTime) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const dateStr = dateTimeMapper.formatDateToYYMM(date)
    data.push({ text: dateStr, value: dateStr })
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return data
}
// 表格对象
const tableRef = ref<InstanceType<typeof ElTable>>()
// 重置筛选和排序
const resetStartDateFilter = () => {
  tableRef.value!.clearFilter(['s_date'])
  tableRef.value!.clearSort()
}
// 重置筛选和排序
const resetEndDateFilter = () => {
  tableRef.value!.clearFilter(['e_date'])
  tableRef.value!.clearSort()
}
// 时间筛选器数据
const filtersData = ref<filterData[]>(setFiltersData())

// 搜索
const search = ref('')
const filterTableData = computed(() =>
  missions.value.filter((data) => {
    return (
      !search.value ||
      (data.member &&
        data.member.some((element) => {
          console.log(element)
          return element.includes(search.value)
        })) ||
      (data.place && data.place.some((element) => element.includes(search.value))) ||
      data.content.includes(search.value) ||
      data.vehicle.includes(search.value)
    )
  })
)
// 编辑
const handleEdit = (index: number, row: TableData) => {
  router.push('/mission/edit/' + row.id)
}
// 编辑
const handleShow = (index: number, row: TableData) => {
  router.push('/mission/show/' + row.id)
}
// 删除
const handleDelete = (index: number, row: TableData) => {
  const id = row.id
  ElMessageBox.confirm('确定要删除这一项吗？')
    .then(async () => {
      try {
        await api.delete('mission/delete/' + id)
        ElMessage.success('删除成功')
        // 这里可以添加重新获取数据的逻辑
        router.go(0)
      } catch (error) {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败'
      })
      getData()
    })
}
</script>

<template>
  <el-table :data="filterTableData" ref="tableRef" style="width: 100%">
    <el-table-column fixed prop="member" label="出差人" width="200" />
    <el-table-column prop="place" label="地点" width="200" />
    <el-table-column
      prop="s_date"
      column-key="s_date"
      width="200"
      sortable
      :sort-method="sortStartDate"
      :filters="filtersData"
      :filter-method="startTimeFilterHandler"
    >
      <template #header>
        <span @click="resetStartDateFilter">出差起始时间</span></template
      ></el-table-column
    >

    <el-table-column
      prop="e_date"
      column-key="e_date"
      label="出差结束时间"
      width="200"
      sortable
      :sort-method="sortEndDate"
      :filters="filtersData"
      :filter-method="endTimeFilterHandler"
    >
      <template #header>
        <span @click="resetEndDateFilter">出差结束时间</span></template
      ></el-table-column
    >
    <el-table-column prop="content" label="出差任务" width="150" show-overflow-tooltip />
    <el-table-column prop="vehicle" label="交通工具" width="100" />
    <el-table-column width="200">
      <template #header>
        <el-input v-model="search" size="small" placeholder="请输入搜索内容" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleShow(scope.$index, scope.row)"> 查看 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
