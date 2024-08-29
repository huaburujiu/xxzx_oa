<script setup lang="ts">
import { reactive, ref } from 'vue'
import { api, getMemberListLikeName, getPlaceListLikeName } from '../../api'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import type { ListItem, FormType, Member, Place } from '../../entity/index'

const memberOption = ref<ListItem[]>([])
const placeOption = ref<ListItem[]>([])
const memberLoading = ref(false)
const placeLoading = ref(false)
const placeRemoteMethod = async (query: string) => {
  placeLoading.value = true
  if (query !== '' && query.length < 8) {
    const placerList: Place[] = await getPlaceListLikeName(query)
    placeLoading.value = false
    const place: ListItem[] = placerList.map((item): ListItem => {
      return { value: item.id, label: item.name }
    })
    placeOption.value = place.filter((item) => {
      return item.label.includes(query)
    })
  } else {
    placeOption.value = []
  }
}

const memberRemoteMethod = async (query: string) => {
  memberLoading.value = true
  if (query !== '' && query.length < 8) {
    const memberList: Member[] = await getMemberListLikeName(query)
    memberLoading.value = false
    const member: ListItem[] = memberList.map((item): ListItem => {
      return { value: item.id, label: item.name }
    })
    memberOption.value = member.filter((item) => {
      return item.label.includes(query)
    })
  } else {
    memberOption.value = []
  }
}

const ruleFormRef = ref<FormInstance>()
// 数据格式

// 起始时间验证函数
const checkEndTime = (rule: any, value: any, callback: any) => {
  if (form.e_date <= form.s_date) {
    callback(new Error('结束时间必须大于起始时间'))
  } else callback()
}
// 表单验证规则
const rules = reactive<FormRules<FormType>>({
  member: [
    {
      required: true,
      message: '请至少选择一名派遣人员',
      trigger: 'change'
    }
  ],
  place: [
    {
      required: true,
      message: '请至少选择一个派遣地点',
      trigger: 'change'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入派遣任务',
      trigger: 'change'
    }
  ],
  vehicle: [
    {
      required: true,
      message: '请选择出行方式',
      trigger: 'change'
    }
  ],
  s_date: [
    {
      type: 'date',
      required: true,
      message: '请选择开始时间',
      trigger: 'change'
    }
  ],
  e_date: [
    {
      type: 'date',
      required: true,
      message: '请选择结束时间',
      trigger: 'change'
    },
    { validator: checkEndTime, trigger: 'change' }
  ]
})

// 提交按钮函数
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(form))
      api
        .post('/mission/save', data)
        .then(() => {
          ElMessage({
            message: '汇报成功',
            type: 'success'
          })
          clearForm(formEl)
        })
        .catch((error) => {
          ElMessage({
            message: '汇报失败' + error,
            type: 'error'
          })
        })
    } else {
      ElMessage({
        message: '汇报失败',
        type: 'error'
      })
    }
  })
}

// 重置按钮函数
const clearForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 表单v-mode绑定数据
let form: FormType = reactive({
  member: [],
  place: [],
  content: '',
  vehicle: '',
  s_date: '',
  e_date: ''
})
</script>

<template>
  <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto" style="max-width: 800px">
    <el-form-item label="派遣人员" prop="member">
      <el-select-v2 v-model="form.member" style="width: 240px" multiple filterable remote
        :remote-method="memberRemoteMethod" :options="memberOption" :loading="memberLoading" placeholder="请输入并选择人员" />
    </el-form-item>
    <el-form-item label="派遣地点" prop="place">
      <el-select-v2 v-model="form.place" style="width: 240px" multiple filterable remote
        :remote-method="placeRemoteMethod" :options="placeOption" :loading="placeLoading" placeholder="请输入并选择地点" />
    </el-form-item>

    <el-form-item label="派遣任务" prop="content">
      <el-input v-model="form.content" style="width: 100%" :rows="4" type="textarea" />
    </el-form-item>
    <el-form-item label="出行方式" prop="vehicle">
      <el-select v-model="form.vehicle" placeholder="请选择出行方式">
        <el-option label="公车" value="公车" />
        <el-option label="公共交通" value="公共交通" />
        <el-option label="局内派遣" value="局内派遣" />
        <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间" prop="s_date">
      <el-col :span="11">
        <el-date-picker type="datetime" v-model="form.s_date" placeholder="起始时间" style="width: 100%" />
      </el-col>
      <el-col :span="2" class="text-center"></el-col>
    </el-form-item>
    <el-form-item label="结束时间" prop="e_date">
      <el-col :span="11">
        <el-date-picker type="datetime" v-model="form.e_date" placeholder="终止时间" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button @click="clearForm(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-transfer-panel__body {
  height: 150px;
  /* 设置穿梭框体的大小 */
}

.el-transfer-panel__list {
  max-height: 100%;
  /* 设置列表的最大高度，可以根据需要调整 */
}
</style>
