<template>
<a-spin :spinning="spinning">
    <a-form ref="formRef" :model="formState" :rules="rules">
    <a-breadcrumb class="mb10">
        <a-breadcrumb-item>
            <router-link to="/promotion">
                {{ $t(`menu.promotion`) }}
            </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>
                {{ $t(`menu.addPromotion`) }}
                <span v-if="checkRow?.code">{{checkRow?.code}} </span>
                <span v-if="!isAdd">(Promotion ID: {{id}})</span>
                
            </span>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="container-form">
        
         <div class="filed">
            
                <a-row>
                    <a-col :span="8">
                        <a-form-item name="name" :label="$t('filter.promotionName')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item name="description" :label="$t('filter.promotionDesc')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.description" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item name="promotion_level" :label="$t('filter.promotionLevel')">
                            <a-select v-model:value="formState.promotion_level" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in levelList" :key="index" :value="item.level_value">{{item.level_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    

                    <a-col :span="8">
                        <a-form-item :label="$t('filter.promotionTime')">
                            <a-range-picker 
                                format="YYYY-MM-DD HH:mm"
                                style="width: 100%"
                                @change="onChange"
                                v-model:value="time" 
                            />
                        </a-form-item>
                    </a-col>
                   
                    <!-- <a-col :span="6">
                        <a-form-item :label="$t('filter.periodicity')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col> -->
                    <a-col :span="8">
                        <a-form-item name="promotion_group" :label="$t('filter.repulsionSeries')">
                            <a-select v-model:value="formState.promotion_group" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in groupList" :key="index" :value="item.group_code">{{item.group_value}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item name="promotion_type" :label="$t('filter.promotionType')">
                            <a-select v-model:value="formState.promotion_type" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.type_value">{{item.type_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="8" v-if="formState.promotion_type == 'Coupon'" >
                        <a-form-item :label="$t('filter.couponCode')">
                            <a-input 
                                v-model:value="formState.coupon_code"
                                :placeholder="$t('filter.placeholderInput')" 
                            />
                        </a-form-item>
                    </a-col>
                    
                </a-row>
           
        </div>
        <div class="promotion">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" :tab="$t('updatePromotion.promotionConditions')">
                    <tab1 
                      @onEmit="getEmitData"
                      :resultList="resultList" 
                      :returnList="returnList" 
                      :promotionItemSegments="promotionItemSegments" 
                      :promotionConditionData="promotionCondition"
                      :promotionResultData="promotionResult"
                      />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('updatePromotion.LocationScope')" force-render>
                    <tab2  @onEmit="getStoreEmitData" :promotionLocationSegments="promotionLocationSegments" />
                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('updatePromotion.customerScope')" force-render>
                    <tab3 @onEmit="getCustomerEmitData" :promotionCustomerSegments="promotionCustomerSegments" />
                </a-tab-pane>
            </a-tabs>

        </div>
        <div class="pt20" style="text-align: right">
            
            <a-button @click="onSubmit" type="primary">{{$t('common.submit')}}</a-button>
            <a-button v-if="!isAdd && formState.promotion_status == 'inactive'" class="ml10" type="primary" @click="onChangeSwitch">{{$t('common.approve')}}</a-button>
            <a-button v-if="!isAdd" class="ml10" @click="onDeletDetail">{{$t('common.delete')}}</a-button>
            <a-button class="ml10" @click="onCancel">{{$t('common.cancel')}}</a-button>

        </div>

    </div>
     </a-form>
</a-spin>
</template>

<script>
    import { defineComponent, ref, provide, toRaw, onMounted, reactive, h} from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { message, notification } from 'ant-design-vue';
    import { CheckCircleOutlined } from '@ant-design/icons-vue';
    import dayjs from 'dayjs';
    import {useI18n} from 'vue-i18n'
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
        getPromotionGroup,
        deletePromotion,
        updateStatusPromotion
     } from '@/api/promotion'
    export default defineComponent({
        components: {
            tab1,
            tab2,
            tab3,
            CheckCircleOutlined
        },
         setup() {
            const router = useRouter();
            const route = useRoute();
            const formState = reactive({
                name: '',
                promotion_id: 0,
                promotion_level: undefined,
                promotion_status: 'inactive',
                promotion_type: undefined,
                class_id: route.query.class_id,
                description: '',
                start_date: '',
                end_date: '',
                create_user: 'string',
                update_user: 'string',
                condition_type: '',
                threshold_style: '',
                threshold_min: '',
                threshold_max: '',
                apply_type:'',
                discount_type: '',
                discount_value: '',
                overlap: 0,
            });
            let {t} = useI18n()
            const checkRow = ref({
                class_id:route.query.class_id,
                code:route.query.code
            })
            const promotionCondition = ref({})
            const promotionResult = ref({})
            const levelList = ref([]);
            const typeList = ref([]);
            const returnList = ref([]);
            const resultList = ref([]);
            const groupList = ref([]);
            const detailInfo = ref({})
            const promotionItemSegments = ref([]);
            const promotionLocationSegments = ref([]);
            const promotionCustomerSegments = ref([]);
            const time = ref([])
           
            let isAdd = ref(true)
            const id = ref(Number(route.params.id));
            let spinning = ref(false)
            const formRef = ref();
            const rules = {
                name: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                description: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                promotion_type: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                promotion_level: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                promotion_group: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                condition_type: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                threshold_style: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                threshold_min: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                threshold_max: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                apply_type: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                discount_type: [{required: true,message:  t('filter.required'),trigger: 'change',}],
                discount_value: [{required: true,message:  t('filter.required'),trigger: 'change',}],
            }

            onMounted(async ()=>{
                formState.class_id = route.query.class_id
                 if(id.value != 0){
                    spinning.value = true
                    isAdd.value = route.query.type == 'copy'
                    getPromotionDetail({
                        promotion_id: id.value,
                    }).then(res => {
                        spinning.value = false
                        detailInfo.value =  JSON.parse(JSON.stringify(res))
                        
                        const promotiondata = JSON.parse(JSON.stringify(res.promotion_condition[0]))
                        promotionCondition.value = JSON.parse(JSON.stringify(promotiondata))
                        if(res.promotion_result.length > 0){
                            promotionResult.value = JSON.parse(JSON.stringify(res.promotion_result[0]))
                        }
                       
                        promotionItemSegments.value = JSON.parse(JSON.stringify(res.promotion_item_segments))
                        promotionLocationSegments.value = JSON.parse(JSON.stringify(res.promotion_location_segments))
                        promotionCustomerSegments.value = JSON.parse(JSON.stringify(res.promotion_customer_segments))

                        showDetail(res)
                    })
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
                time.value = [dayjs(res.promotion_header.start_date, 'YYYY-MM-DD HH:mm'), dayjs(res.promotion_header.end_date, 'YYYY-MM-DD HH:mm')]
                formState.promotion_level = res.promotion_header.promotion_level
                formState.description = res.promotion_header.description
                formState.class_id = res.promotion_header.class_id
                formState.end_date = res.promotion_header.end_date
                formState.start_date = res.promotion_header.start_date
                formState.coupon_code = res.promotion_header.coupon_code

                formState.condition_type= res.promotion_condition[0].condition_type
                formState.threshold_style= res.promotion_condition[0].threshold_style
                formState.threshold_max= res.promotion_condition[0].threshold_max
                formState.threshold_min= res.promotion_condition[0].threshold_min
                formState.apply_type= res.promotion_result[0].apply_type
                formState.discount_type= res.promotion_result[0].discount_type
                formState.discount_value= res.promotion_result[0].discount_value
                formState.overlap = res.promotion_result[0].overlap
               
            }
            const onChange = (value, dateString) => {
                // formState.time = dateString
                formState.start_date = dateString[0]
                formState.end_date = dateString[1]
            };

            const getEmitData = (data) => {
                formState.condition_type= data.promotion_condition.condition_type
                formState.threshold_style= data.promotion_condition.threshold_style
                formState.threshold_min= data.promotion_condition.threshold_min
                formState.threshold_max= data.promotion_condition.threshold_max
                formState.apply_type= data.promotion_result.apply_type
                formState.discount_type= data.promotion_result.discount_type
                formState.discount_value= data.promotion_result.discount_value
                formState.overlap = data.promotion_result.overlap

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

            const onChangeSwitch = () => {
                onSubmit('1')
            }

            const onDeletDetail = () => {
                const data = {
                     promotion_id: id.value
                }
                deletePromotion(data).then(res => {
                    if(res.code == 200){
                         message.success(res.message)
                         router.push('/promotion/list')
                    } else{
                        message.error(res.message)
                    }
                })
            }

            const onSubmit = (type) => {
                formRef.value
                .validate()
                .then(() => {
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
                        const promotiondata = JSON.parse(JSON.stringify(promotionCondition.value))
                        
                        if(isAdd.value){
                            formState.promotion_id = 0
                        }
                        if(type){
                             formState.promotion_status = 'active'
                        }
                       
                        const data = {
                            promotion: toRaw(formState),
                            promotion_condition: promotiondata,
                            promotion_result: promotionResult.value,
                            promotion_item_segments: promotionItemSegments.value,
                            promotion_location_segments: promotionLocationSegments.value,
                            promotion_customer_segments: promotionCustomerSegments.value
                        }
                        submitPromotion(data).then(res => {
                            if(res.code == 200){
                                message.success(res.message)
                                isAdd.value = false
                                id.value=res.promotion_id
                                router.push('/promotion/update/'+res.promotion_id)
                            } else{
                                if(type){
                                    formState.promotion_status = 'inactive'
                                }
                                message.error(res.message)
                            }
                            
                        })
                })
                .catch(error => {
                    console.log('error', error);
                });
                
                
            };

            const onCancel = () => {
                 router.push('/promotion/list')
            }

            return {
                formState,
                formRef,
                onSubmit,
                onCancel,
                activeKey: ref('1'),
                onChange,
                spinning,
                levelList,
                typeList,
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
                getStoreEmitData,
                getCustomerEmitData,
                spinning,
                checkRow,
                rules,
                isAdd,
                onDeletDetail,
                id,
                onChangeSwitch
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
