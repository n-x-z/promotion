<template>
   <a-spin :spinning="spinning">
    <a-breadcrumb class="mb10">
        <a-breadcrumb-item>
            <router-link to="/segment">
                {{ $t(`menu.segment`) }}
            </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>
                <span v-if="segmentType == 'item'">{{ $t(`menu.addItem`)}}</span>
                <span v-if="segmentType == 'customer'">{{ $t(`menu.addCustomer`)}}</span>
                <span v-if="segmentType == 'location'">{{ $t(`menu.addLocation`)}}</span>
                <span v-if="!isAdd">(Segment ID: {{id}})</span>
            </span>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <a-form :model="formState" :rules="rules" ref="formRef" class="container-form">
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
                           
                            <a-checkbox @change="e => onChangeCheckbox(e, 'public')" v-model:checked="formState.public" >Public</a-checkbox>
                             <a-checkbox  @change="e => onChangeCheckbox(e, 'export')" v-model:checked="formState.export" >Export</a-checkbox>
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
                
                <div class="  segment-relative">
                    <div :class="list.length > 1? 'segment-left' :'segment-left segment-left-border'" v-if="list.length>0">
                        <div class="segment-block" :style="{top: list.length > 1? '0px' : '20px' }">
                            <div @click="onConditionType('and')" :class="formState.condition_type == 'and' ? 'condition_type condition_active-top' : 'condition_type'">{{$t('updateSegment.and')}}</div>
                            <div @click="onConditionType('or')" :class="formState.condition_type == 'or' ? 'condition_active-bottom condition_type' : 'condition_type'">{{$t('updateSegment.or')}}</div>
                        </div>
                    </div>
                    <div class="flex" v-for="(item,index) in list" :key="index" :class="index == 0 ? '' : 'mt10'">
                        <a-select 
                           v-model:value="item.condition_name" 
                           style="width: 250px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderChange')"
                           @change="e =>handleConditionNameChange(e,index, '1')"
                        >
                            <a-select-option :disabled="i.disabled" v-for="(i, num) in returnList" :key="num" >{{i.condition_name}}</a-select-option>
                        </a-select>
                        <a-select 
                           v-model:value="item.condition_type" 
                           style="width: 180px" 
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
                           :mode="(item.condition_type == 'include' || item.condition_type == 'exclude') ? 'multiple' : ''"
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           style="width: 200px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderChange')"
                        >
                            <a-select-option v-for="(i) in item.condition_value_list" :key="i">{{i}}</a-select-option>
                        </a-select>
                        <a-input-number 
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'number'" 
                           :style="{width: item.condition_type == 'between' ? '95px' :'200px'}" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-input-number 
                           v-model:value="item.condition_end_value" 
                           @change="e =>handleConditionNameChange(e,index, '4')" 
                           v-if="item.condition_type == 'between'" 
                           style="width: 95px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-input
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'string'" 
                           style="width: 200px" 
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        
                        <a-date-picker 
                            v-model:value="item.condition_value" 
                            @change="e =>handleConditionNameChange(e,index, '3')" 
                            v-if="item.type == 'Date'" 
                            style="width: 200px" 
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
                <div class="ml50">
                    <a-input-group style="width: 400px" compact>
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
                    width="50%"
                    placement="right"
                    :closable="false"
                    v-model:visible="detailVisible"
                    :after-visible-change="afterVisibleChange"
            >
                <div class="flex flex-jcsb">
                    <div>COUNT#{{paginationData.total}}</div>
                     <a-input-group style="width: 300px"  compact>
                        <a-input style="width: 80%"   allowClear :placeholder="$t('filter.placeholderInput')" v-model:value="paginationData.key_word" />
                        <a-button  style="width: 20%"   type="primary" @click="onSearch">{{$t('common.query')}}</a-button>
                    </a-input-group>
                </div>
                
                
                <a-table :pagination="false" class="mt10" :dataSource="dataSource" :columns="columns" />
                <div class="mt20" style="text-align: right;">
                    <a-pagination
                    show-size-changer
                            v-model:current="paginationData.page"
                            :show-total="total => `${$t('table.total')} ${paginationData.total} ${$t('table.items')}`"
                            v-model:pageSize="paginationData.page_size"
                            :total="paginationData.total"
                            @change="onPaginationChange"
                            
                        />
                </div>
            </a-drawer>

        </div>

        <a-form-item class="pt20" style="text-align: right">
            <a-button type="primary" @click="onSubmit">{{$t('common.submit')}}</a-button>
             <a-button v-if="!isAdd && formState.segment_status == 'inactive'" class="ml10" type="primary" @click="onChangeSwitch">{{$t('common.approve')}}</a-button>
             <a-button v-if="!isAdd" class="ml10"  @click="onDeletDetail">{{$t('common.delete')}}</a-button>
             <a-button class="ml10" @click="onCancel">{{$t('common.cancel')}}</a-button>
        </a-form-item>
    </a-form>
   </a-spin>

</template>

<script>
    import { defineComponent, reactive, ref, onMounted, computed, toRaw, inject } from 'vue';
    import { message } from 'ant-design-vue';
    import {useI18n} from 'vue-i18n'
    import dayjs from 'dayjs'
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
        getSegmentsModalDetail,
        deleteSegments,
        updateStatusSegments
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
                description: '',
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
            let showColumn = ref([])
            let segmentSchedule = ref({})
            let isAdd = ref(true)
            let spinning = ref(false)
            const router = useRouter();
            const visible = ref(false);
            const detailVisible = ref(false);
            const formRef = ref();

            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
                key_word: ''
            })
            const rules = {
                name: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                description: [{required: true,message:  t('filter.required'),trigger: 'change',}],
            }

            const route = useRoute();
            const id =  ref(Number(route.params.id));
            const columns = computed (() => {
                var data = []
                showColumn.value.forEach(item => {
                       data.push({
                        title: item[1].name,
                        dataIndex: item[0],
                        key: item[0],
                       })
                })
                return (data)
            })

            const afterVisibleChange = bool => {
                console.log('visible', bool);
            };
            const showDrawer = () => {
                
                if(id.value != 0 ){
                
                    getSegmentsModalDetail({
                        segment_type: segmentType,
                        segment_id: id.value,
                        ...paginationData.value
                    }).then(res => {
                        showColumn.value = Object.entries(res.show_column);
                        dataSource.value = res.segments_detail.data
                        detailVisible.value = true;
                        paginationData.value.page = res.segments_detail.page
                        paginationData.value.page_size = res.segments_detail.page_size
                        paginationData.value.total = res.segments_detail.total
                    })
                }            
            };
            const onSearch = () => {
                showDrawer()
            }
            const showModal = () => {
                visible.value = true;
            };
            const handleOk = e => {
                console.log(e);
                visible.value = false;
            };

            const onPaginationChange = (pageNumber, pageSize) => {
         
                paginationData.value.page = pageNumber || 1
                paginationData.value.page_size = pageSize
                showDrawer()
            };

            const handleScheduleNameChange = (e) =>{
                segmentSchedule.value.schedule_value = 0
            }

            const onConditionType = (e) => {
                 formState.condition_type =  e
            }

            onMounted(()=>{
                segmentsCondition({
                    segment_type: segmentType
                }).then(res => {
                    returnList.value = res
                    if(id.value != 0 ){

                        spinning.value = true
                        getSegmentsDetail({
                            segment_type: segmentType,
                            segment_id: id.value,
                        }).then(res => {
                            isAdd.value = route.query.type == 'copy'
                            spinning.value = false
                            showDetail(res)
                        })
                    }
                }) 
            })

            const showDetail = (res) => {
                formState.name = res.segments[0].name
                formState.description = res.segments[0].description
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
                            var value = item.condition_value
                            var endvalue = item.condition_value.split(',')[1]
                            if(item.condition_type == 'include'){
                                value = item.condition_value.split(',')
                            } else {
                                
                                value = item.condition_value.split(',')[0]
                            }
                            if(item1.value_type == 'Date'){
                                value = dayjs(value)
                            }
                            arr.push({
                                list: returnList.value, 
                                type: item1.value_type,
                                condition_value: value,
                                condition_end_value: endvalue,
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
                segmentSchedule.value.schedule_time = dayjs(res.segment_schedule[0].schedule_time, 'HH:mm')

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
                    list.value[index].condition_type = undefined
                    list.value[index].condition_value = undefined
                    checkList.value[index]=list.value[index].list[e].condition_name
                    list.value[index].condition_type_list = list.value[index].list[e].condition_type
                    list.value[index].condition_value_list = list.value[index].list[e].condition_value
                    list.value[index].condition_name = list.value[index].list[e].condition_name
                    getDisabledList()
                } else if(type == '2'){
                    list.value[index].condition_value = undefined
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
                                    list.value[index].condition_value = e
                                } else if(list.value[index].type == 'number') {
                                    list.value[index].condition_value = String(e)         
                                }
                               
                            }
                        })      
                    }
                } else if(type == '4'){
                    list.value[index].list.forEach((item, i) => {
                            if(item.condition_name == list.value[index].condition_name){
                                if(list.value[index].condition_type == 'between'){
                                    list.value[index].condition_end_value = String(e)   
                                }
                               
                            }
                     })      
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

            const onSubmit = (type) => {
                formRef.value
                .validate()
                .then(() => {
                        const dataList = []
                        list.value.forEach(item => {
                            let value = item.condition_value
                            if(!Array.isArray(value) && item.condition_type == 'between'){
                                value = item.condition_value + ',' + item.condition_end_value
                            }
                            dataList.push({
                                condition_value: Array.isArray(value)? value.join(',') : value,
                                condition_type: item.condition_type,
                                condition_name: item.condition_name,
                                create_user: "string"
                            })
                        })
                        formState.public = formState.public ? 1 : 0
                        formState.export = formState.export ? 1 : 0
                        let value=  JSON.parse(JSON.stringify(segmentSchedule.value))
                        value.schedule_time =  dayjs(value.schedule_time).format("HH:mm")
                        value.create_user = "string"
                        if(isAdd.value){
                            formState.segment_id = 0
                        }
                        if(type){
                             formState.promotion_status = 'active'
                        }
                        var data = {
                            segment: toRaw(formState),
                            segment_schedule: value,
                            segment_condition: dataList,
                            segment_type: segmentType
                        }
                         spinning.value = true
                        submitSegments(data).then(res => {
                            spinning.value = false
                            if(res.code == 200){

                                message.success(res.message)
                                isAdd.value = false
                                id.value=res.segment_id
                                router.push('/segment/'+segmentType+'/update/'+res.segment_id)
                            }else{
                                message.error(res.message)
                            }
                            
                        })
                })
                .catch(error => {
                    console.log('error', error);
                });
                
            }

            
            const onChangeCheckbox = (e, type) => {
                formState[type]=e.target.checked

            }

            const onChangeSwitch = () => {
                 onSubmit('1')
            }


            const onCancel = () => {
                 router.push('/segment/list')
            }

            const onDeletDetail = item => {
                const data = {
                     segment_type: segmentType,
                     segment_id: id.value
                }
                deleteSegments(data).then(res => {
                     if(res.code == 200){

                        message.success(res.message)
                        router.push('/segment/'+segmentType)
                     }
                })
               
            };


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
                onChangeCheckbox,
                onConditionType,
                isAdd,
                onDeletDetail,
                segmentType,
                id,
                onChangeSwitch,
                rules,
                formRef,
                paginationData,
                onPaginationChange,
                onSearch
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
    .ml30{
        margin-left: 30px;
    }
    .segment-relative{
        position: relative;
        margin-left: 60px;
    }
    .segment-left{
        position: absolute;
        height: calc(100% - 60px);
        width: 20px;
        left: -20px;
        top: 10px;
        border-left: 2px solid #d9d9d9;
        border-top: 2px solid #d9d9d9;
        border-bottom: 2px solid #d9d9d9;
    }
    .segment-left-border{
        border-top: none;
        border-bottom: none;
    }
    .segment-block{
        position: absolute;
        top: 0;
        bottom: 0;
        height: 60px;
        margin: auto;
        left: -15px;
        background: #f1f1f1;
         color: #999;
        border-radius: 5px;
    }
    .condition_type{
       
        width: 25px;
        height: 30px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
       
       
    }
    .ml50{
        margin-left: 50px;
    }
    
    
</style>
