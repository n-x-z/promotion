<template>
    <div class="container-form">
        <div class="body-content">
            <div class="">
                <a-row>
                    <a-col :span="8">
                        <div class="flex flex-jcsb">
                            <h3>{{$t('updatePromotion.promotionConditions')}}</h3>
                        </div>
                        <a-divider style="margin: 10px 0 20px 0" />

                        <div v-for="(item,index) in returnList" :key="index" :class="index == 0 ? '' : 'mt10'">
                            <a-form-item v-if="item.value_type == 'LIST' && item.condition_name == 'Condition Type'" :label="item.condition_name">
                                <a-select 
                                    :disabled="disabled"
                                    v-model:value="promotionCondition.condition_type"
                                    :placeholder="$t('filter.placeholderChange')"
                                    @change="onChange"
                                >
                                    <a-select-option v-for="(item, index) in item.condition_value" :key="index" :value="item">{{item}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item v-if="item.value_type == 'LIST' && item.condition_name == 'Threshold Style'" :label="item.condition_name">
                                <a-select 
                                :disabled="disabled"
                                    v-model:value="promotionCondition.threshold_style"
                                    :placeholder="$t('filter.placeholderChange')"
                                     @change="onChange"
                                >
                                    <a-select-option v-for="(item, index) in item.condition_value" :key="index" :value="item">{{item}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item v-if="item.value_type == 'number'" :label="item.condition_name">
                                <a-input-number :disabled="disabled"  @change="onChange" style="width:100%"  :placeholder="$t('filter.placeholderInput')" v-model:value="promotionCondition.subtotal" />
                            </a-form-item>

                        </div>
                    </a-col>
                    <a-col :span="2" style="text-align: center">
                        <a-divider style="height: 100%" type="vertical" />
                    </a-col>
                    <a-col :span="14">
                        <div class="flex flex-jcsb">
                            <h3>{{$t('updatePromotion.PromotionConditionManagement')}}</h3>
                        </div>
                        <a-divider style="margin: 10px 0 10px 0" />

                        <a-row :gutter="16">
                            <a-col :span="12">
                                <h4>{{$t('updatePromotion.includesProducts')}}</h4>
                                <a-card v-for="(item, index) in conditionIncludeList" :key="index" class="mt10">
                                    <a-row :gutter="16">
                                       <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">ID</div>
                                                <div class="card-desc fl">{{item.segment_id}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">COUNT</div>
                                                <div class="card-desc fl">{{item.sub_count}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">{{$t('updatePromotion.name')}}</div>
                                                <div class="card-desc fl">{{item.name}}</div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <div class="card-delete">
                                        <DeleteOutlined v-if="!disabled" style="color: #d9d9d9" @click="onDelete('Condition', 1,index)" class="ml10" />
                                    </div>
                                </a-card>
                                <a-button v-if="!disabled" type="link" @click="showModal('Condition', 1)">
                                    <template #icon><PlusOutlined /></template>
                                    {{$t('updatePromotion.addProductSegments')}}
                                </a-button>
                            </a-col>
                            <a-col :span="12">
                                <h4>{{$t('updatePromotion.excludeProducts')}}</h4>
                                <a-card v-for="(item, index) in conditionNoIncludeList" :key="index" class="mt10">
                                    <a-row :gutter="16">
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">ID</div>
                                                <div class="card-desc fl">{{item.segment_id}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">COUNT</div>
                                                <div class="card-desc fl">{{item.sub_count}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">{{$t('updatePromotion.name')}}</div>
                                                <div class="card-desc fl">{{item.name}}</div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <div class="card-delete">
                                        <DeleteOutlined v-if="!disabled" style="color: #d9d9d9" @click="onDelete('Condition', 0, index)" class="ml10" />
                                    </div>
                                </a-card>
                                <a-button v-if="!disabled" type="link" @click="showModal('Condition', 0)">
                                    <template #icon><PlusOutlined /></template>
                                    {{$t('updatePromotion.addProductSegments')}}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="body-content">
            <div class="">
                <a-row>
                    <a-col :span="8">
                        <div class="flex flex-jcsb">
                            <h3>{{$t('updatePromotion.promotionResults')}}</h3>
                        </div>
                        <a-divider style="margin: 10px 0 20px 0" />
                        <div v-for="(item,index) in resultList" :key="index" :class="index == 0 ? '' : 'mt10'">
                            <a-form-item  v-if="item.value_type == 'LIST' && item.result_name == 'Apply Type'" :label="item.result_name">
                                <a-select 
                                    v-model:value="promotionResult.apply_type"
                                    :placeholder="$t('filter.placeholderChange')"
                                     @change="onChange"
                                     :disabled="disabled"
                                >
                                    <a-select-option v-for="(item, index) in item.condition_value" :key="index" :value="item">{{item}}</a-select-option>
                                </a-select>
                            </a-form-item>
                             <a-form-item v-if="item.value_type == 'LIST' && item.result_name == 'Discount Type'" :label="item.result_name">
                                <a-select 
                                    :disabled="disabled"
                                    v-model:value="promotionCondition.discount_type"
                                    :placeholder="$t('filter.placeholderChange')"
                                    @change="onChange"
                                >
                                    <a-select-option v-for="(item, index) in item.condition_value" :key="index" :value="item">{{item}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item v-if="item.value_type == 'number'" :label="item.result_name">
                                <a-input-number :disabled="disabled"  @change="onChange" style="width:100%" :placeholder="$t('filter.placeholderInput')" v-model:value="promotionResult.discount_value" />
                            </a-form-item>

                        </div>
                    </a-col>
                    <a-col :span="2" style="text-align: center">
                        <a-divider style="height: 100%" type="vertical" />
                    </a-col>
                    <a-col :span="14">
                        <div class="flex flex-jcsb">
                            <h3>{{$t('updatePromotion.promotionResultsManagement')}}</h3>
                        </div>
                        <a-divider style="margin: 10px 0 10px 0" />
                        <a-row :gutter="16">
                            <a-col :span="12" >
                                <h4>{{$t('updatePromotion.includesProducts')}}</h4>
                                <a-card v-for="(item, index) in resultIncludeList" class="mt10" :key="index">
                                    <a-row :gutter="16">
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">ID</div>
                                                <div class="card-desc fl">{{item.segment_id}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">COUNT</div>
                                                <div class="card-desc fl">{{item.sub_count}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">{{$t('updatePromotion.name')}}</div>
                                                <div class="card-desc fl">{{item.name}}</div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <div class="card-delete">
                                        <DeleteOutlined v-if="!disabled" style="color: #d9d9d9" @click="onDelete('Result', 1, index)" class="ml10" />
                                    </div>
                                </a-card>
                                <a-button type="link" v-if="!disabled" @click="showModal('Result', 1)">
                                    <template #icon><PlusOutlined /></template>
                                    {{$t('updatePromotion.addProductSegments')}}
                                </a-button>
                            </a-col>
                            <a-col :span="12">
                                <h4>{{$t('updatePromotion.excludeProducts')}}</h4>
                                <a-card v-for="(item, index) in resultNoIncludeList" class="mt10" :key="index">
                                    <a-row :gutter="16">
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">ID</div>
                                                <div class="card-desc fl">{{item.segment_id}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="12">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">COUNT</div>
                                                <div class="card-desc fl">{{item.sub_count}}</div>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <div class="inline-block card-title">
                                                <div class="card-name fl">{{$t('updatePromotion.name')}}</div>
                                                <div class="card-desc fl">{{item.name}}</div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <div class="card-delete">
                                        <DeleteOutlined v-if="!disabled" style="color: #d9d9d9" @click="onDelete('Result', 0, index)" class="ml10" />
                                    </div>
                                </a-card>
                                <a-button type="link" v-if="!disabled" @click="showModal('Result', 0)">
                                    <template #icon><PlusOutlined /></template>
                                    {{$t('updatePromotion.addProductSegments')}}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-modal width="500px" v-model:visible="visible" :title="$t('updatePromotion.addProductSegments')" @ok="handleOk">
                <a-divider style="margin: 0 0 20px 0" />
                <div class="flex">
                    <a-input allowClear v-model:value="formState.key_word" :placeholder="$t('filter.placeholderDetailInput')" >
                        <template #icon>
                            <SearchOutlined />
                        </template>
                    </a-input>

                    <a-button type="primary" @click="onSearch" class="ml10">{{$t('common.query')}}</a-button>
                </div>

                <h4 class="mt10">{{$t('updatePromotion.selectedSegments')}}</h4>
                <a-spin :spinning="spinning">
                    <a-row class="mt10" :gutter="16">
                        <a-col class="mt10" :span="12" v-for="(item, index) in dataSource" :key="index">
                            <a-card :class="item.checked ? 'borderactive' : ''" @click="onClickCard(item, index)" >
                                <div class="inline-block card-title">
                                    <div class="card-name fl">ID</div>
                                    <div class="card-desc fl">{{item.segment_id}}</div>
                                </div>
                                <div class="inline-block card-title">
                                    <div class="card-name fl">{{$t('updatePromotion.name')}}</div>
                                    <div class="card-desc fl">{{item.name}}</div>
                                </div>
                                <div class="inline-block card-title">
                                    <div class="card-name fl">COUNT</div>
                                    <div class="card-desc fl">{{item.sub_count}}</div>
                                </div>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-spin>
                <div class="mt10">
                    <a-pagination
                        v-model:current="paginationData.page"
                        :show-total="total => `${$t('table.total')} ${paginationData.total} ${$t('table.items')}`"
                        v-model:pageSize="paginationData.page_size"
                        :total="paginationData.total"
                        @change="onSizeChange"
                        
                    />
                </div>

            </a-modal>  
    </div>

</template>

<script>
    import { defineComponent, defineEmits, ref, onMounted, toRefs, inject, watch, defineProps } from 'vue';
    import { useRoute } from 'vue-router';
    import { PlusOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons-vue';
    import { getSegmentsList } from '@/api/segments'
    const emits = defineEmits(['onEmit'])
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined,
            DeleteOutlined
        },
        emits: emits,
        props: {
            classList: {
                type: Array,
                default: 'default'
            },
            resultList: {
                type: Array,
                default: 'default'
            },
            returnList: {
                type: Array,
                default: 'default'
            },
            promotionItemSegments: {
                type: Array,
                default: 'default'
            },
            promotionConditionData: {
                type: Object,
                default: 'default'
            },
            promotionResultData: {
                type: Object,
                default: 'default'
            }
        },
        setup(props, { emit }) {
            const visible = ref(false);
            const time = ref([]);
            const promotionCondition = ref(props.promotionConditionData)
            const promotionResult = ref(props.promotionResultData)
            const formState = ref({
                key_word: '',
                segment_status: 'ALL',
            });
            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
            })
            const conditionIncludeList = ref([])
            const conditionNoIncludeList = ref([])
            const resultIncludeList = ref([])
            const resultNoIncludeList = ref([])
            const dataSource = ref([])
            const checkRow = ref({})
            const type = ref(0)
            const include = ref(1)
            const route = useRoute();
            const disabled = ref(false)
            const id = Number(route.params.id);
            let spinning = ref(false)

            onMounted(()=>{
                
                setTimeout(()=>{
                    disabled.value = route.name == 'promotionDetail'
                    if(id != 0){
                        showDetail()
                    }  
                    init()
                },1000)

               
            })

            const showDetail = () => {
                promotionCondition.value = props.promotionConditionData
                promotionResult.value = props.promotionResultData
                
                if(props.promotionItemSegments.length > 0){
                    conditionIncludeList.value = props.promotionItemSegments.filter(item => item.include == 1 && item.item_type == 'Condition')
                    conditionNoIncludeList.value = props.promotionItemSegments.filter(item => item.include == 0 && item.item_type == 'Condition')
                    resultIncludeList.value = props.promotionItemSegments.filter(item => item.include == 1 && item.item_type == 'Result')
                    resultNoIncludeList.value = props.promotionItemSegments.filter(item => item.include == 0 && item.item_type == 'Result')
                }
            }

            const init = () => {
                const data = {
                     segment_type: 'item',
                     ...formState.value,
                     ...paginationData.value
                }
                spinning.value = true
                getSegmentsList(data).then(res => {
                    spinning.value = false
                    dataSource.value = res.data
                    paginationData.value.page = res.page
                    paginationData.value.page_size = res.page_size
                    paginationData.value.total = res.total
                })
            }

            const onSearch = () => {
                paginationData.value.page = 1
                init()
            }

            const onSizeChange = (pageNumber, pageSize) => {
         
                paginationData.value.page = pageNumber || 1
                paginationData.value.page_size = pageSize
                init()
            };

            const showModal = (type1, include1) => {
                visible.value = true;
                dataSource.value.forEach((item, num) => {
                    item.checked = false
                })
                type.value = type1
                include.value = include1
            };

            const getTypeList = () => {
                if(type.value == 'Condition' && include.value == 1){
                   conditionIncludeList.value.push(checkRow.value)
                } else if(type.value == 'Condition' && include.value == 0){
                   conditionNoIncludeList.value.push(checkRow.value)
                } else if(type.value == 'Result' && include.value == 1){
                   resultIncludeList.value.push(checkRow.value)
                } else if(type.value == 'Result' && include.value == 0){
                   resultNoIncludeList.value.push(checkRow.value)
                }
                onUpdate()
            }

            const handleOk = e => {
                getTypeList()
                visible.value = false;
            };

            const onChange = () => {
                onUpdate()
            }
            const onUpdate = () => {
                const promotionItemSegments = conditionIncludeList.value.concat(conditionNoIncludeList.value, resultIncludeList.value, resultNoIncludeList.value);
                emit('onEmit', {
                    promotion_condition: promotionCondition.value,
                    promotion_result: promotionResult.value,
                    promotion_item_segments: promotionItemSegments
                })
            };
            const onDelete = (type1, include1, index) => {
                if(type1 == 'Condition' && include1 == 1){
                    conditionIncludeList.value = conditionIncludeList.value.filter((item, num) => index !== num);
                } else if(type1 == 'Condition' && include1 == 0){
                    conditionNoIncludeList.value = conditionNoIncludeList.value.filter((item, num) => index !== num);
                } else if(type1 == 'Result' && include1 == 1){
                    resultIncludeList.value = resultIncludeList.value.filter((item, num) => index !== num);
                } else if(type1 == 'Result' && include1 == 0){
                    resultNoIncludeList.value = resultNoIncludeList.value.filter((item, num) => index !== num);
                }
                onUpdate()
            };
            const onClickCard = (item, index) => {
                checkRow.value = item
                checkRow.value.include = include.value
                checkRow.value.item_type = type.value
                dataSource.value.forEach((item, num) => {
                    if(index == num){
                        item.checked = !item.checked
                    } else {
                        item.checked = false
                    }
                })
            }

            return {
                visible,
                onDelete,
                formState,
                showModal,
                handleOk,
                onClickCard,
                spinning,
                dataSource,
                conditionIncludeList,
                conditionNoIncludeList,
                resultIncludeList,
                resultNoIncludeList,
                promotionCondition,
                promotionResult,
                time,
                onChange,
                disabled,
                onSearch,
                paginationData,
                onSizeChange
            };
        },
    });

</script>
<style>
    .card-title{
       width: 100%;
    }
   .card-name{
       width: 60px;
       opacity: 0.6;
   }
    .card-desc{
        width: calc(100% - 60px);
        color: #181818;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .card-delete{
        display: none;
        position: absolute;
        right: 5px;
        top: 5px;
    }
   
    .ant-card-bordered:hover .card-delete{
        display: block;
    }
</style>
