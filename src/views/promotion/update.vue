<template>
<a-spin :spinning="spinning">
    <a-form ref="formRef" :model="formState" :rules="rules">
    <a-breadcrumb v-if="!isCustom"  class="mb10">
        <a-breadcrumb-item>
            <router-link to="/promotion">
                {{ $t(`menu.promotion`) }}
            </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>
                {{ $t(`menu.addPromotion`) }}
                <span v-if="checkRow?.code">({{checkRow?.code}})</span>
            </span>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="container-form">
        
         <div class="filed">
            
                <a-row>
                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionName')" >
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionDesc')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.description" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionType')">
                            <a-select v-model:value="formState.promotion_type" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.type_value">{{item.type_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionTime')">
                            <a-range-picker 
                                format="YYYY-MM-DD HH:mm"
                                @change="onChange"
                                v-model:value="time" 
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionLevel')">
                            <a-select v-model:value="formState.promotion_level" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in levelList" :key="index" :value="item.level_value">{{item.level_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <!-- <a-col :span="6">
                        <a-form-item :label="$t('filter.periodicity')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col> -->
                    <a-col :span="8">
                        <a-form-item :label="$t('filter.repulsionSeries')">
                            <a-select v-model:value="formState.promotion_group" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in groupList" :key="index" :value="item.group_code">{{item.group_value}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    
                </a-row>
           
        </div>
        <div class="promotion">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" :tab="$t('updatePromotion.promotionConditions')">
                    <tab1 
                      @onEmit="getEmitData"
                      :key="classList" 
                      :resultList="resultList" 
                      :returnList="returnList" 
                      :promotionItemSegments="promotionItemSegments" 
                      :promotionConditionData="promotionCondition"
                      :promotionResultData="promotionResult"
                      />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('updatePromotion.storeScope')" force-render>
                    <tab2  @onEmit="getStoreEmitData" :promotionLocationSegments="promotionLocationSegments" />
                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('updatePromotion.customerScope')" force-render>
                    <tab3 @onEmit="getCustomerEmitData" :promotionCustomerSegments="promotionCustomerSegments" />
                </a-tab-pane>
            </a-tabs>

        </div>
        <div class="pt20" style="text-align: right">
            
            <a-button @click="onSubmit" type="primary">{{$t('common.submit')}}</a-button>
            <a-button class="ml10">{{$t('common.cancel')}}</a-button>

        </div>

         <a-modal width="800px" v-model:visible="visible" title="" :closable="false" @ok="handleOk">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" :tab="$t('updatePromotion.selectFromPromotionTypes')">
                    <a-row :gutter="16">
                        <a-col :span="8" class="mt10" v-for="(item, index) in classList" :key="index">
                            <a-card 
                               :class="item.checked ? 'borderactive' : ''"
                               @click="onClickCard(item, index)" 
                               :title="item.code" 
                            >
                                <div class="desc color9">{{item.discription}}</div>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('updatePromotion.selectFromPromotionTemplate')" force-render>
                    <div class="flex flex-jcsb">
                        <div style="width: 250px">
                            <div class="mt10" v-for="(item, index) in classList" :key="index">
                                <a-card
                                    :class="item.checked ? 'borderactive' : ''"
                                    @click="onClickCard(item, index)"  
                                    :title="item.code" 
                                >
                                    <div class="desc color9">{{item.discription}}</div>
                                </a-card>
                            </div>
                        </div>
                        <div style="width: 450px" >
                            <div class="mt10" v-for="(item, index) in childList" :key="index">
                                <a-card :class="item.checked ? 'borderactive' : ''" @click="onClickChildCard(index)" >
                                    Buy X get Y at 2%/$ off
                                </a-card>
                            </div>
                        </div>

                    </div>


                </a-tab-pane>

            </a-tabs>
        </a-modal>  
    </div>
     </a-form>
</a-spin>
</template>

<script>
    import { defineComponent, ref, provide, toRaw, onMounted, reactive, h} from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { message, notification } from 'ant-design-vue';
    import { CheckCircleOutlined } from '@ant-design/icons-vue';
    import moment from 'moment';
    import tab1 from './component/tab1.vue'
    import tab2 from './component/tab2.vue'
    import tab3 from './component/tab3.vue'
    import { 
        getPromotionCondition, 
        submitPromotion, 
        getPromotionDetail, 
        getPromotionLevel,
        getPromotionType,
        getPromotionClass,
        getPromotionResult,
        getPromotionGroup
     } from '@/api/promotion'
    export default defineComponent({
        components: {
            tab1,
            tab2,
            tab3,
            CheckCircleOutlined
        },
         setup() {
            const formState = reactive({
                name: '',
                promotion_id: 0,
                promotion_level: undefined,
                promotion_status: 'active',
                promotion_type: undefined,
                class_id: undefined,
                description: '',
                start_date: '',
                end_date: '',
                create_user: 'string',
                update_user: 'string'
            });
            const time = ref([]);
            const checkRow = ref({})
            const visible = ref(false);
            const promotionCondition = ref({})
            const promotionResult = ref({})
            const levelList = ref([]);
            const typeList = ref([]);
            const classList = ref([]);
            const returnList = ref([]);
            const resultList = ref([]);
            const groupList = ref([]);
            const detailInfo = ref({})
            const promotionItemSegments = ref([]);
            const promotionLocationSegments = ref([]);
            const promotionCustomerSegments = ref([]);
            const router = useRouter();
            const route = useRoute();
            const id = Number(route.params.id);
            let spinning = ref(false)
            const formRef = ref();
            const rules = {
                name: [
                    {
                    required: true,
                    message: 'Please input Activity name',
                    trigger: 'change',
                    }
                ],
                description: [
                    {
                    required: true,
                    message: 'Please select Activity zone',
                    trigger: 'change',
                    },
                ],
            }

            onMounted(async ()=>{
                 if(id != 0){
                    spinning.value = true
                    visible.value = false;
                    getPromotionDetail({
                        promotion_id: id,
                    }).then(res => {
                        spinning.value = false
                        detailInfo.value =  JSON.parse(JSON.stringify(res))
                        
                        promotionCondition.value = JSON.parse(JSON.stringify(res.promotion_condition[0]))
                        promotionResult.value = JSON.parse(JSON.stringify(res.promotion_result[0]))
                        promotionItemSegments.value = JSON.parse(JSON.stringify(res.promotion_item_segments))
                        promotionLocationSegments.value = JSON.parse(JSON.stringify(res.promotion_location_segments))
                        promotionCustomerSegments.value = JSON.parse(JSON.stringify(res.promotion_customer_segments))

                        showDetail(res)
                    })
                } else {
                    visible.value = true
                } 
                
                getPromotionCondition().then(res => {
                    returnList.value = res.promotion_condition
                })
                getPromotionLevel().then(res => {
                    levelList.value = res.promotion_level
                })
                getPromotionType().then(res => {
                    typeList.value = res.promotion_type
                })
                getPromotionClass().then(res => {
                    classList.value = res.promotion_class
                })
                getPromotionResult().then(res => {
                    resultList.value = res.promotion_condition
                })

                getPromotionGroup().then(res => {
                    groupList.value = res.promotion_group
                })
               
            })

            const showDetail = (res) => {
                formState.name = res.promotion_header.name
                formState.promotion_id = res.promotion_header.promotion_id
                formState.promotion_type = res.promotion_header.promotion_type
                time.value = [moment(res.promotion_header.start_date), moment(res.promotion_header.end_date)]
                formState.promotion_level = res.promotion_header.promotion_level
                formState.description = res.promotion_header.description
                formState.class_id = res.promotion_header.class_id
                formState.end_date = res.promotion_header.end_date
                formState.start_date = res.promotion_header.start_date
               
            }
            const onChange = (value, dateString) => {
                formState.start_date = dateString[0]
                formState.end_date = dateString[1]
            };

            const getEmitData = (data) => {
                promotionCondition.value = data.promotion_condition
                promotionResult.value = data.promotion_result
                promotionItemSegments.value = data.promotion_item_segments

            }



            const getStoreEmitData = (data) => {
                promotionLocationSegments.value = data.promotion_location_segments
            }

             const getCustomerEmitData = (data) => {
                promotionCustomerSegments.value = data.promotion_customer_segments
            }

            const onClickCard = (item, index) => {
                checkRow.value = item
                classList.value.forEach((item, num) => {
                    if(index == num){
                        item.checked = !item.checked
                    } else {
                        item.checked = false
                    }
                })
            }

             const handleOk = e => {
                visible.value = false;
                checkRow.value = item
                formState.class_id = checkRow.value.class_id
                console.log(e, 'e')
            };
            const onSubmit = () => {
                const conditionIncludeList = promotionItemSegments.value.filter((item, num) => item.item_type == 'Condition');
                const resultIncludeList = promotionItemSegments.value.filter((item, num) => item.item_type == 'Result');
                if(conditionIncludeList.length == 0){
                    message.info('请添加促销条件的商品标签~');
                    return
                }
                if(resultIncludeList.length == 0){
                    message.info('请添加促销结果的商品标签~');
                    return
                }
                const data = {
                    promotion: toRaw(formState),
                    promotion_condition: promotionCondition.value,
                    promotion_result: promotionResult.value,
                    promotion_item_segments: promotionItemSegments.value,
                    promotion_location_segments: promotionLocationSegments.value,
                    promotion_customer_segments: promotionCustomerSegments.value
                }
                 submitPromotion(data).then(res => {
                    if(res.code == 200){
                       message.success(res.message)
                       router.push('/promotion/list')
                    } else{
                         message.error(res.message)
                    }
                    
                })
                
            };

            return {
                formState,
                onSubmit,
                activeKey: ref('1'),
                onChange,
                spinning,
                levelList,
                typeList,
                classList,
                returnList,
                resultList,
                groupList,
                detailInfo,
                promotionCondition,
                promotionItemSegments,
                promotionLocationSegments,
                promotionCustomerSegments,
                promotionResult,
                time,
                getEmitData,
                visible,
                onClickCard,
                handleOk,
                getStoreEmitData,
                getCustomerEmitData,
                spinning,
                checkRow,
                rules
            };
        }
    });

</script>
<style>
    .promotion .ant-tabs-nav{
        background: #ffffff;
        padding: 0 10px;
        border-radius: 5px;
        margin: 10px 0 0 0;
    }
    .checkedTitle{
        position: absolute;
        top: -20px;
    }
    .mb10{
        margin-bottom: 10px;
    }
</style>
