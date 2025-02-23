<template>
  <div>
 <div class="tabs">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="标签数据"></a-tab-pane>
          <a-tab-pane key="2" tab="标签配置" force-render></a-tab-pane>
        </a-tabs>
       </div>
       <div v-if="activeKey=='1'"> 
         <div class="tabs-t">
             <a-row :gutter="[16,16]">
                <a-col :span="6">
                  <div class="tabs-b">关联的Promtion</div>
                  <div class="tabs-bt">10</div>
                </a-col>
                <a-col :span="6" class="flex ">
                  <div class="info-icon">
                    <MinusCircleFilled />
                  </div>
                  <div class="ml20">
                    <div class="info-bt">未开始</div>
                    <div class="info-b">10</div>
                  </div>
                 
                </a-col>
                 <a-col :span="6" class="flex ">
                  <div class="info-icon">
                    <FileAddFilled />
                  </div>
                  <div class="ml20">
                    <div class="info-bt">未开始</div>
                    <div class="info-b">10</div>
                  </div>
                 
                </a-col><a-col :span="6" class="flex ">
                  <div class="info-icon">
                    <MinusCircleFilled />
                  </div>
                  <div class="ml20">
                    <div class="info-bt">未开始</div>
                    <div class="info-b">10</div>
                  </div>
                 
                </a-col>
                 <a-col :span="6" class="flex ">
                  <div class="info-icon">
                    <StopFilled />
                  </div>
                  <div class="ml20">
                    <div class="info-bt">未开始</div>
                    <div class="info-b">10</div>
                  </div>
                 
                </a-col>
              </a-row>
         </div>
 <a-row :gutter="[16,16]">
      <a-col :span="8">
        <div class="info">
          <div class="info-tit">近七天销售</div>
          <div>
            <e-charts class="chart" :option="option" />
          </div>
        </div>  
      </a-col>
      <a-col :span="8">
        <div class="info">
          <div class="info-tit">Promtion类型</div>
          <div>
            <e-charts class="chart" :option="option" />
          </div>
        </div>  
      </a-col>
      <a-col :span="8">
        <div class="info">
          <div class="info-tit">Promtion折扣方式</div>
          <div>
            <e-charts class="chart" :option="option" />
          </div>
        </div>  
      </a-col>
    </a-row>


       </div>
       <div v-if="activeKey=='2'">
             <a-spin :spinning="spinning">
    <a-form :model="formState" class="container-form">
        <div class="filed">
            <h3>{{$t('updateSegment.collocationMethod')}}</h3>
            <!-- <a-form :model="formState" > -->
                <a-row class="mt20">
                    <a-col :span="8">
                        <a-form-item :label="$t('filter.SegmentName')">
                            <a-input  :disabled="true" :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item :label="$t('table.SegmentDesc')">
                            <a-input  :disabled="true" :placeholder="$t('filter.placeholderInput')" v-model:value="formState.description" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :span="10">
                        <a-form-item :label="$t('table.SegmentSet')">
                           
                            <a-checkbox  :disabled="true" @change="e => onChangeCheckbox(e, 'public')" v-model:value="formState.public" >Public</a-checkbox>
                             <a-checkbox  :disabled="true"  @change="e => onChangeCheckbox(e, 'export')" v-model:value="formState.export" >Export</a-checkbox>
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
                            :disabled="true"
                           :placeholder="$t('filter.placeholderChange')"
                           @change="e =>handleConditionNameChange(e,index, '1')"
                        >
                            <a-select-option :disabled="i.disabled" v-for="(i, num) in returnList" :key="num" >{{i.condition_name}}</a-select-option>
                        </a-select>
                        <a-select 
                           v-model:value="item.condition_type" 
                           style="width: 80px" 
                           class="ml10" 
                            :disabled="true"
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
                            :disabled="true"
                           :placeholder="$t('filter.placeholderChange')"
                        >
                            <a-select-option v-for="(i, num) in item.condition_value_list" :key="num">{{i}}</a-select-option>
                        </a-select>
                        <a-input-number 
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'number'" 
                           style="width: 150px" 
                            :disabled="true"
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-input
                           v-model:value="item.condition_value" 
                           @change="e =>handleConditionNameChange(e,index, '3')" 
                           v-if="item.type == 'string'" 
                           style="width: 150px" 
                            :disabled="true"
                           class="ml10" 
                           :placeholder="$t('filter.placeholderInput')" 
                        />
                        <a-date-picker 
                            v-model:value="item.condition_value" 
                            :disabled="true"
                            @change="e =>handleConditionNameChange(e,index, '3')" 
                            v-if="item.type == 'Date'" 
                            style="width: 150px" 
                            class="ml10" 
                        />
                        
                       
                    </div>
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
                            :disabled="true"
                           v-model:value="segmentSchedule.schedule_type" 
                           style="width: 30%">
                            <a-select-option value="D">{{$t('updateSegment.everyDate')}}</a-select-option>
                            <a-select-option value="W">{{$t('updateSegment.everyWeek')}}</a-select-option>
                            <a-select-option value="M">{{$t('updateSegment.everyMonth')}}</a-select-option>
                        </a-select>
                        <a-select 
                           v-if="segmentSchedule.schedule_type == 'W'"
                           style="width: 30%"  
                            :disabled="true"
                           :placeholder="$t('filter.placeholderChange')" 
                           v-model:value="segmentSchedule.schedule_value" 
                        >
                            <a-select-option v-for="(item, index) in weeks" :key="index" :value="Number(item.value)">{{item.label}}</a-select-option>
                        </a-select>
                        <a-select 
                            v-if="segmentSchedule.schedule_type == 'M'"
                            style="width: 30%" 
                             :disabled="true"
                            :placeholder="$t('filter.placeholderChange')" 
                            v-model:value="segmentSchedule.schedule_value" >
                            <a-select-option v-for="(item, index) in days" :key="index" :value="Number(item.value)">{{item.label}}</a-select-option>
                        </a-select>
                        <a-time-picker  :disabled="true" format="HH:mm" v-model:value="segmentSchedule.schedule_time" style="width: 40%" />
                    </a-input-group>
                </div>

            </div>




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

    </a-form>
   </a-spin>
       </div>
  </div>


</template>

<script>
    import { defineComponent, reactive, ref, onMounted, computed, toRaw, inject } from 'vue';
    import { message } from 'ant-design-vue';
    import {useI18n} from 'vue-i18n'
    import moment from 'moment'
    import * as echarts from 'echarts'
    import { useRouter, useRoute } from 'vue-router';
    import { weeks, days } from '@/utils/utils'
    import {
        PlusOutlined,
        DeleteOutlined,
        CloudUploadOutlined,
        FileAddOutlined,
        FileDoneOutlined,
        MinusCircleFilled, FileAddFilled, StopFilled
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
            FileDoneOutlined,
            MinusCircleFilled, FileAddFilled, StopFilled
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
            let segmentType = reactive('item')  
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
             const option = computed(()=>{
              return{
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
                series:  [
                    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#1677ff'
          },
          {
            offset: 1,
            color: '#ffffff'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
                  ]
              }
            })


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
                    router.push('/segment/'+segmentType)
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
                onChangeCheckbox,
                option,
              activeKey: ref('1'),
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
.tabs{
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 16px;
  height: 50px;
}
.info{
  width: 100%;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}
.tabs-t{
  border-radius: 8px;
  background-color: #fff;
  padding: 16px;
  margin-top: 12px;
  height: 150px;
}
.tabs-b{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 18px;
}
.tabs-bt{
  font-size: 28px;
  text-align: center;
  margin-top: 16px;
  font-weight: bold;
}
.info-bt{
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  margin-top: 35px;
  color: #888;
}
.info-b{
  font-size: 20px;
  text-align: center;
  font-weight: bold;

}
.info-tit{
  font-size: 16px;
  font-weight: bold;
}
.chart{
  width: 100%;
  height: 300px;
  
}
.info-icon{
  font-size: 30px;
  background: #fbefdf;
  color: #f5c14c;
  text-align: center;
  line-height: 60px;
  width: 60px;
  height: 60px;
  margin-left: 30px;
  border-radius: 5px;
  margin-top: 30px;
}
</style>
