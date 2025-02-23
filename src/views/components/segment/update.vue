<template>
   <a-spin :spinning="spinning">
    <a-form :model="formState" class="container-form">
        <div class="filed">
            <h3>{{$t('updateSegment.collocationMethod')}}</h3>
            <!-- <a-form :model="formState" > -->
                <a-row class="mt20">
                    <a-col :span="8">
                        <a-form-item :label="$t('filter.SegmentName')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item :label="$t('table.SegmentDesc')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.description" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :span="10">
                        <a-form-item :label="$t('table.SegmentSet')">
                           
                            <a-checkbox @change="e => onChangeCheckbox(e, 'public')" v-model:value="formState.public" >Public</a-checkbox>
                             <a-checkbox  @change="e => onChangeCheckbox(e, 'export')" v-model:value="formState.export" >Export</a-checkbox>
                        </a-form-item>
                    </a-col>
                </a-row>
            <!-- </a-form> -->
        </div>
        <div class="body-content">
            <div class="flex flex-jcsb">
                <h3>{{$t('updateSegment.conditionalConfiguration')}}</h3>
            </div>
            <div class="mt10 flex" >
                <div class="mt15">{{$t('updateSegment.createConditions')}}</div>
                <div class="ml20">
                    <div class="flex" v-for="(item,index) in list" :key="index" :class="index == 0 ? '' : 'mt10'">
                        <a-select 
                           v-model:value="item.condition_name" 
                           style="width: 150px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderChange')"
                           @change="e =>handleConditionNameChange(e,index, '1')"
                        >
                            <a-select-option :disabled="i.disabled" v-for="(i, num) in returnList" :key="num" >{{i.condition_name}}</a-select-option>
                        </a-select>
                        <a-select 
                           v-model:value="item.condition_type" 
                           style="width: 80px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderChange')"
                           @change="e =>handleConditionNameChange(e,index, '2')"
                        >
                            <a-select-option 
                               v-for="(i, num) in item.condition_type_list" 
                               :key="num">{{i}}</a-select-option>
                        </a-select>
                        
                        <a-select 
                           v-model:value="item.condition_value" 
                           v-if="item.type == 'LIST'" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           style="width: 150px" class="ml10" 
                           :placeholder="$t('filter.placeholderChange')"
                        >
                            <a-select-option v-for="(i, num) in item.condition_value_list" :key="num">{{i}}</a-select-option>
                        </a-select>
                        <a-input-number 
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'number'" 
                           style="width: 150px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-input
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'string'" 
                           style="width: 150px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-date-picker 
                            v-model:value="item.condition_value" 
                            @change="e =>handleConditionNameChange(e,index, '3')" 
                            v-if="item.type == 'Date'" 
                            style="width: 150px" 
                            class="ml10" 
                        />
                        
                        <DeleteOutlined style="color: #d9d9d9" @click="onDelete(index)" class="ml10" />
                    </div>
                    <a-button type="link"  v-if="list.length != returnList.length" @click="onAdd" class="mt10">
                        <template #icon><PlusOutlined /></template>
                        {{$t('updateSegment.addConditions')}}
                    </a-button>
                    <a-button v-if="list.length == 0" type="link" @click="showModal" class="mt10">
                        <template #icon><FileAddOutlined /></template>
                        {{$t('updateSegment.importData')}}
                    </a-button>
                    <a-button type="link" @click="showDrawer" class="mt10">
                        <template #icon><FileDoneOutlined /></template>
                        {{$t('updateSegment.viewSelectedData')}}
                    </a-button>
                </div>
            </div>

            <div class="flex mt20">
                <div>{{$t('updateSegment.homeworkFrequency')}}</div>
                <div class="ml15">
                    <a-input-group style="width: 300px" compact>
                        <a-select 
                           @change="e =>handleScheduleNameChange(e)"  
                           :placeholder="$t('filter.placeholderChange')" 
                           v-model:value="segmentSchedule.schedule_type" 
                           style="width: 30%">
                            <a-select-option value="D">{{$t('updateSegment.everyDate')}}</a-select-option>
                            <a-select-option value="W">{{$t('updateSegment.everyWeek')}}</a-select-option>
                            <a-select-option value="M">{{$t('updateSegment.everyMonth')}}</a-select-option>
                        </a-select>
                        <a-select 
                           v-if="segmentSchedule.schedule_type == 'W'"
                           style="width: 30%"  
                           :placeholder="$t('filter.placeholderChange')" 
                           v-model:value="segmentSchedule.schedule_value" 
                        >
                            <a-select-option v-for="(item, index) in weeks" :key="index" :value="Number(item.value)">{{item.label}}</a-select-option>
                        </a-select>
                        <a-select 
                            v-if="segmentSchedule.schedule_type == 'M'"
                            style="width: 30%" 
                            :placeholder="$t('filter.placeholderChange')" 
                            v-model:value="segmentSchedule.schedule_value" >
                            <a-select-option v-for="(item, index) in days" :key="index" :value="Number(item.value)">{{item.label}}</a-select-option>
                        </a-select>
                        <a-time-picker format="HH:mm" v-model:value="segmentSchedule.schedule_time" style="width: 40%" />
                    </a-input-group>
                </div>

            </div>


            <a-modal v-model:visible="visible" :title="$t('updateSegment.importData')" @ok="handleOk">
                <a-upload-dragger
                        v-model:fileList="fileList"
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        @change="handleChange"
                >
                    <p class="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                    </p>
                    <p class="ant-upload-text">{{$t('updateSegment.uploadForm')}}</p>
                    <p class="ant-upload-hint">
                        {{$t('updateSegment.uploadDesc')}}
                    </p>
                </a-upload-dragger>
            </a-modal>



            <a-drawer
                    :title="$t('updateSegment.inventory')"
                    width="700"
                    placement="right"
                    :closable="false"
                    v-model:visible="detailVisible"
                    :after-visible-change="afterVisibleChange"
            >
                <a-table :dataSource="dataSource" :columns="columns" />
            </a-drawer>

        </div>

        <a-form-item class="pt20" style="text-align: right">
            <a-button type="primary" @click="onSubmit">{{$t('common.submit')}}</a-button>
            <a-button class="ml10" @click="onCancel">{{$t('common.cancel')}}</a-button>
        </a-form-item>
    </a-form>
   </a-spin>

</template>

<script>
    import { defineComponent, reactive, ref, onMounted, computed, toRaw, inject } from 'vue';
    import { message } from 'ant-design-vue';
    import {useI18n} from 'vue-i18n'
    import moment from 'moment'
    import { useRouter, useRoute } from 'vue-router';
    import { weeks, days } from '@/utils/utils'
    import {
        PlusOutlined,
        DeleteOutlined,
        CloudUploadOutlined,
        FileAddOutlined,
        FileDoneOutlined
    } from '@ant-design/icons-vue';
    import { 
        segmentsCondition, 
        submitSegments, 
        getSegmentsDetail,
        getSegmentsModalDetail
    } from '@/api/segments'

    const plainOptions = ['Public', 'Export'];
    export default defineComponent({
        components: {
            PlusOutlined,
            DeleteOutlined,
            CloudUploadOutlined,
            FileAddOutlined,
            FileDoneOutlined
        },
        setup() {
            const formState = reactive({
                segment_status: 'active',
                condition_type: 'and',
                create_type: "condition",
                public: false,
                export: false,
                segment_id: 0
            });
            let {t} = useI18n()
            let list = ref([])  
            let segmentType = inject('segmentType');
            let returnList = ref([])
            let current = ref(0)
            let checkList = ref([])
            let dataSource = ref([])
            let showColumn = ref({})
            let segmentSchedule = ref({})
            let spinning = ref(false)
            const router = useRouter();
            const visible = ref(false);
            const detailVisible = ref(false);

            const route = useRoute();
            const id = Number(route.params.id);
            const columns = computed (() => {
                return ([
                    {
                        title: showColumn.value.item_id.name,
                        dataIndex: 'item_id',
                        key: 'item_id',
                    },
                    {
                        title: showColumn.value.item_name.name,
                        dataIndex: 'item_name',
                        key: 'item_name',
                    },
                    {
                        title: showColumn.value.item_description.name,
                        dataIndex: 'item_description',
                        key: 'item_description',
                    },
                    {
                        title:  showColumn.value.item_department.name,
                        dataIndex: 'item_department',
                        key: 'item_department',
                    },
                    {
                        title: showColumn.value.item_price.name,
                        dataIndex: 'item_price',
                        key: 'item_price',
                    }
                ])
            })

            const afterVisibleChange = bool => {
                console.log('visible', bool);
            };
            const showDrawer = () => {
                
                if(id != 0 ){
                    getSegmentsModalDetail({
                        segment_type: segmentType,
                        segment_id: id,
                    }).then(res => {
                        showColumn.value = res.show_column
                        dataSource.value = res.segments_detail.data
                        detailVisible.value = true;
                    })
                }            
            };
            const showModal = () => {
                visible.value = true;
            };
            const handleOk = e => {
                console.log(e);
                visible.value = false;
            };

            const handleScheduleNameChange = (e) =>{
                segmentSchedule.value.schedule_value = 0
            }

            onMounted(()=>{
                segmentsCondition({
                    segment_type: segmentType
                }).then(res => {
                    returnList.value = res
                    if(id != 0 ){
                        spinning.value = true
                        getSegmentsDetail({
                            segment_type: segmentType,
                            segment_id: id,
                        }).then(res => {
                            spinning.value = false
                            showDetail(res)
                        })
                    }
                }) 
            })

            const showDetail = (res) => {
                formState.name = res.segments[0].name
                formState.name = res.segments[0].name
                formState.public = res.segments[0].public == 1
                formState.export = res.segments[0].export == 1
                formState.create_type = res.segments[0].create_type
                formState.segment_status = res.segments[0].segment_status
                formState.condition_type = res.segments[0].condition_type
                formState.segment_id = res.segments[0].segment_id
                
                var arr = []
                res.segments_condition.forEach((item, index) => {
                    returnList.value.forEach((item1,num) => {
                        if(item.condition_name == item1.condition_name){
                            arr.push({
                                list: returnList.value, 
                                type: item1.value_type,
                                condition_value: item.condition_value,
                                condition_type: item.condition_type,
                                condition_type_list: item1.condition_type,
                                condition_value_list: item1.condition_value,
                                condition_name: item1.condition_name
                            })
                            checkList.value[index] = item1.condition_name
                        }
                    }) 
                })
                list.value = arr
                getDisabledList()
                
                segmentSchedule.value.schedule_type = res.segment_schedule[0].schedule_type
                segmentSchedule.value.schedule_value = res.segment_schedule[0].schedule_value
                segmentSchedule.value.schedule_time = moment(res.segment_schedule[0].schedule_time, 'HH:mm')

            }

            const onAdd = () => {
                list.value.push({list: returnList.value, value_type: 'LIST'})
                
            };

            const onDelete = (num) => {
            
                checkList.value = checkList.value.filter((item, index)=> item != list.value[num].condition_name)
                list.value = list.value.filter((item, index)=> index != num)
                getDisabledList()
                
            };

            const handleConditionNameChange = (e, index, type) => {
                console.log(e, 'e')
                if(type == '1'){
                    current.value = e
                    list.value[index].type = returnList.value[e].value_type
                    checkList.value[index]=list.value[index].list[e].condition_name
                    list.value[index].condition_type_list = list.value[index].list[e].condition_type
                    list.value[index].condition_value_list = list.value[index].list[e].condition_value
                    list.value[index].condition_name = list.value[index].list[e].condition_name
                    getDisabledList()
                } else if(type == '2'){
                    
                    if(!list.value[index].condition_name){
                        message.info('请先选择前一个条件')
                        return
                    }else{
                        list.value[index].list.forEach((item, i) => {
                            if(item.condition_name == list.value[index].condition_name){
                                list.value[index].condition_type = list.value[index].list[i].condition_type[e]         
                            }
                        })      
                    }
                } else if(type == '3'){

                    if(!list.value[index].condition_name){
                        message.info('请先选择前一个条件')
                        return
                    }else{
                        list.value[index].list.forEach((item, i) => {
                            if(item.condition_name == list.value[index].condition_name){
                  
                                if(list.value[index].type == 'LIST'){
                                    list.value[index].condition_value = list.value[index].list[i].condition_value[e]         
                                } else if(list.value[index].type == 'number') {
                                    list.value[index].condition_value = String(e)         
                                }
                               
                            }
                        })      
                    }
                }
            }

            const getDisabledList = () => {
                returnList.value.forEach(item => {
                      if(checkList.value.includes(item.condition_name)){
                            item.disabled = true
                      } else {
                          item.disabled = false
                      }
                  })
            }

            const onSubmit = () => {
                
                const dataList = []
                list.value.forEach(item => {
                     dataList.push({
                         condition_value: item.condition_value,
                         condition_type: item.condition_type,
                         condition_name: item.condition_name,
                         create_user: "string"
                     })
                })
                formState.public = formState.public ? 1 : 0
                formState.export = formState.export ? 1 : 0

                segmentSchedule.value.schedule_time = moment(segmentSchedule.value.schedule_time).format("HH:mm")
                segmentSchedule.value.create_user = "string"
                var data = {
                   segment: toRaw(formState),
                   segment_schedule: segmentSchedule.value,
                   segment_condition: dataList,
                   segment_type: segmentType
                }

                submitSegments(data).then(res => {
                     if(res.code == 200){

                        message.success(res.message)

                       router.push('/segment/'+segmentType)
                    }
                    
                })
                
            }

            
            const onChangeCheckbox = (e, type) => {
                formState[type]=e.target.checked

            }

            const onCancel = () => {

            }


            return {
                current,
                list,
                returnList,
                formState,
                plainOptions,
                onAdd,
                onDelete,
                onSubmit,
                onCancel,
                handleConditionNameChange,
                handleScheduleNameChange,
                visible,
                showModal,
                handleOk,
                afterVisibleChange,
                showDrawer,
                detailVisible,
                segmentSchedule,
                dataSource,
                columns,
                weeks,
                spinning,
                days,
                onChangeCheckbox
            };
        },
    });

</script>
<style>
    .filed{
        background: #ffffff;
        padding: 20px;
        border-radius: 5px;
    }
    .body-content{
        background: #ffffff;
        padding: 20px;
        margin-top: 10px;
        border-radius: 5px;
    }
</style>
