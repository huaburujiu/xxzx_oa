<script setup lang="ts">
const tableData = [
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  },
  {
    name: '张骁楠',
    place: '岳城水库',
    s_date: '2016-05-03',
    e_date: '2016-05-03',
    missiong: '装配蓄电池',
    vehicle: '公车',
    opinion: '同意',
    state: '待审批'
  }
]
</script>
<template>
  <el-table :data="tableData" style="width: 100%" height="1000">
    <el-table-column fixed prop="name" label="出差人" width="100" />
    <el-table-column prop="place" label="出差地点" width="150" />
    <el-table-column prop="s_date" label="出差起始时间" width="200" />
    <el-table-column prop="e_date" label="出差结束时间" width="200" />
    <el-table-column prop="missiong" label="出差任务" width="200" />
    <el-table-column prop="vehicle" label="交通工具" width="150" />
    <el-table-column prop="opinion" label="主要负责人意见" width="150" />
    <el-table-column prop="state" label="审批状态" width="100" />
  </el-table>
</template>
