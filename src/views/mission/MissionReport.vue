<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { api, getMemberList, getPlaceList } from '../../api'
import { ElMessage } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

import type { Member, Place } from '../../entity/index'

// 数据格式接口
interface Option {
  key: number
  label: string
  initial: string
}

interface FormType {
  member: number[]
  place: number[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}

const memberKeys = ref([]) // Member穿梭框右边栏数据,v-mode绑定
let memberList: Member[] // 中间元素
let memberData = ref<Option[]>() // Member穿梭框数据

const placeKeys = ref([]) // Place穿梭框右边栏数据,v-mode绑定
let placeList: Place[] // 中间元素
let placeData = ref<Option[]>() // Place穿梭框数据
const getData = async () => {
  memberList = await getMemberList()
  memberData.value = generateMember()
  placeList = await getPlaceList()
  placeData.value = generatePlace()
}
onMounted(() => {
  getData()
})

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

//提取姓氏
function extractSurnamesWithDoubleSurnames(names: string[]): string[] {
  // 复姓列表
  const doubleSurnames = ['欧阳', '司马']
  const surnames: string[] = []
  names.forEach((name) => {
    const firstTwoChars = name.substring(0, 2)
    if (doubleSurnames.includes(firstTwoChars)) {
      surnames.push(firstTwoChars)
    } else {
      surnames.push(name.charAt(0))
    }
  })

  return surnames
}
//生成人员函数
const generateMember = () => {
  const data: Option[] = []
  const list = memberList.map((memberList) => memberList.name)
  const initials = extractSurnamesWithDoubleSurnames(list)
  memberList.forEach((member) => {
    data.push({
      label: member.name,
      key: member.id,
      initial: initials[member.id]
    })
  })
  return data
}
//生成地点函数
const generatePlace = () => {
  const data: Option[] = []
  const initials = placeList.map((placeList) => placeList.name)
  placeList.forEach((palce) => {
    data.push({
      label: palce.name,
      key: palce.id,
      initial: initials[palce.id]
    })
  })
  return data
}

//处理Member穿梭框变化函数
const handleMemberChange = () => {
  form.member = memberKeys.value
}
//处理Place穿梭框变化函数
const handlePlaceChange = () => {
  form.place = placeKeys.value
}
// 搜索函数
const filterMethod = (query: string, item: { initial: string }) => {
  return item.initial.includes(query)
}
// 提交按钮函数
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
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
            message: '汇报失败:' + error,
            type: 'error'
          })
        })
    } else {
      ElMessage({
        message: '汇报失败:' + fields,
        type: 'error'
      })
    }
  })
}

// 重置按钮函数
const clearForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  form.member = []
  memberKeys.value = []
  form.place = []
  placeKeys.value = []
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
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleFormRef"
    label-width="auto"
    style="max-width: 800px"
  >
    <el-form-item label="派遣人员" prop="member">
      <el-transfer
        v-model="memberKeys"
        filterable
        filter-placeholder="请输入搜索姓氏"
        :filter-method="filterMethod"
        :data="memberData"
        :titles="['未选择', '已选择']"
        @change="handleMemberChange"
      />
    </el-form-item>
    <el-form-item label="派遣地点" prop="place">
      <el-transfer
        v-model="placeKeys"
        filterable
        filter-placeholder="请输入搜索全称"
        :filter-method="filterMethod"
        :data="placeData"
        :titles="['未选择', '已选择']"
        @change="handlePlaceChange"
      />
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
        <el-date-picker
          type="datetime"
          v-model="form.s_date"
          placeholder="起始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center"></el-col>
    </el-form-item>
    <el-form-item label="结束时间" prop="e_date">
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
      <el-button @click="clearForm(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-transfer-panel__body {
  height: 150px; /* 设置穿梭框体的大小 */
}
.el-transfer-panel__list {
  max-height: 100%; /* 设置列表的最大高度，可以根据需要调整 */
}
</style>
