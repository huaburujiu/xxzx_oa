<script setup lang="ts">
import { reactive, ref } from 'vue'
import { api, getMemberListLikeName, getPlaceListLikeName } from '../../api'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import type { ListItem, FormType, Member, Place } from '../../entity/index'
import type { MaintenanceResponseData, MaintenanceFormType } from '../../entity/maintenance/index'

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
// 表单验证
const ruleFormRef = ref<FormInstance>()
// 起始时间验证函数
const checkEndTime = (rule: any, value: any, callback: any) => {
    if (form.endTime <= form.startTime) {
        callback(new Error('结束时间必须大于起始时间'))
    } else callback()
}
// 表单验证规则
const rules = reactive<FormRules<MaintenanceFormType>>({
    resolvedBy: [
        {
            required: true,
            message: '请至少选择一名维护人员',
            trigger: 'change'
        }
    ],
    maintenanceLocation: [
        {
            required: true,
            message: '请至少选择一个维护地点',
            trigger: 'change'
        }
    ],
    typeOfMaintenance: [
        {
            required: true,
            message: '请选择维护类型',
            trigger: 'change'
        }
    ],
    isRemote: [
        {
            required: true,
            message: '请选择是否远程',
            trigger: 'change'
        }
    ],
    faultDescription: [
        {
            required: true,
            message: '请输入故障描述',
            trigger: 'change'
        }
    ],
    startTime: [
        {
            type: 'date',
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
        }
    ],
    endTime: [
        {
            type: 'date',
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
        },
        { validator: checkEndTime, trigger: 'change' }
    ],
    maintenanceResult: [
        {
            required: true,
            message: '请输入故障描述',
            trigger: 'change'
        }
    ]
})

// 提交按钮函数
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid: boolean) => {
        if (valid) {
            const data = JSON.parse(JSON.stringify(form))
            console.log(data)
            api
                .post('/ggwFaultsMaintenance/save', data)
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



const form = reactive<MaintenanceFormType>({
    resolvedBy: [],
    maintenanceLocation: [],
    faultDescription: '',
    typeOfMaintenance: '',
    isRemote: '',
    startTime: '',
    endTime: '',
    maintenanceProcess: '',
    rootCause: '',
    maintenanceResult: ''
})


const faultTypeOptions = [
    { label: '干线微波通信系统（含光通信）', value: '干线微波通信系统（含光通信）' },
    { label: '重点语音交换系统', value: '重点语音交换系统' },
    { label: '卫星应急通信系统', value: '卫星应急通信系统' },
    { label: '网络与信息安全保障系统', value: '网络与信息安全保障系统' },
    { label: '异地视频会商系统', value: '异地视频会商系统' },
    { label: '综合政务及门户网站群系统', value: '综合政务及门户网站群系统' }

]
</script>

<template>
    <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto" style="max-width: 800px">
        <el-form-item label="维护人员" prop="resolvedBy">
            <el-select-v2 v-model="form.resolvedBy" style="width: 240px" multiple filterable remote
                :remote-method="memberRemoteMethod" :options="memberOption" :loading="memberLoading"
                placeholder="请输入并选择人员" />
        </el-form-item>
        <el-form-item label="维护地点" prop="maintenanceLocation">
            <el-select-v2 v-model="form.maintenanceLocation" style="width: 240px" multiple filterable remote
                :remote-method="placeRemoteMethod" :options="placeOption" :loading="placeLoading"
                placeholder="请输入并选择地点" />
        </el-form-item>
        <el-form-item label="维护类型" prop="typeOfMaintenance">
            <el-select v-model="form.typeOfMaintenance" placeholder="请选择维护类型">
                <el-option v-for="item in faultTypeOptions" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否远程" prop="isRemote">
            <el-select v-model="form.isRemote" placeholder="请选择是否远程">
                <el-option label="是" value="是" />
                <el-option label="否" value="否" />
            </el-select>
        </el-form-item>
        <el-form-item label="故障问题描述" prop="faultDescription">
            <el-input v-model="form.faultDescription" style="width: 100%" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="故障原因描述" prop="rootCause">
            <el-input v-model="form.rootCause" style="width: 100%" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="处理过程描述" prop="maintenanceProcess">
            <el-input v-model="form.maintenanceProcess" style="width: 100%" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label="维护开始时间" prop="startTime">
            <el-col :span="11">
                <el-date-picker type="datetime" v-model="form.startTime" placeholder="起始时间" style="width: 100%" />
            </el-col>
            <el-col :span="2" class="text-center"></el-col>
        </el-form-item>
        <el-form-item label="维护结束时间" prop="endTime">
            <el-col :span="11">
                <el-date-picker type="datetime" v-model="form.endTime" placeholder="终止时间" style="width: 100%" />
            </el-col>
        </el-form-item>
        <el-form-item label="处理结果" prop="maintenanceResult">
            <el-select v-model="form.maintenanceResult" placeholder="请选择处理结果">
                <el-option label="已解决" value='已解决' />
                <el-option label="未解决" value="未解决" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="clearForm(ruleFormRef)">重置</el-button>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
        </el-form-item>
    </el-form>
</template>
