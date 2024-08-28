<script setup lang="ts">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  place: '',
  mission: '',
  vehicle: '',
  s_date: '',
  e_date: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="出差地点">
      <el-input v-model="form.place" />
    </el-form-item>
    <el-form-item label="出差任务">
      <el-input v-model="form.mission" />
    </el-form-item>
    <el-form-item label="交通工具">
      <el-select v-model="form.vehicle" placeholder="...">
        <el-option label="公车" value="公车" />
        <el-option label="公共交通" value="公共交通" />
        <el-option label="火车" value="火车" />
        <el-option label="高铁" value="高铁" />
        <el-option label="飞机" value="飞机" />
      </el-select>
    </el-form-item>
    <el-form-item label="时间">
      <el-col :span="11">
        <el-date-picker
          type="datetime"
          v-model="form.s_date"
          placeholder="起始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center"></el-col>
      <el-col :span="11">
        <el-date-picker
          type="datetime"
          v-model="form.e_date"
          placeholder="终止时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button>重置</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>
