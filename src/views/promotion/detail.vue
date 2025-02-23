<template>
<a-spin :spinning="spinning">
    <div class="container-form">
         <div class="filed">
            <a-form :model="formState" >
                <a-row>
                    <a-col :span="6">
                        <a-form-item :label="$t('filter.promotionName')">
                            <a-input :disabled="true" :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item :label="$t('filter.dealDesc')">
                            <a-input :disabled="true" :placeholder="$t('filter.placeholderInput')" v-model:value="formState.description" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item :label="$t('filter.promotionType')">
                            <a-select :disabled="true" v-model:value="formState.promotion_type" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.type_value">{{item.type_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item :label="$t('filter.promotionTime')">
                            <a-range-picker 
                            :disabled="true"
                                format="YYYY-MM-DD HH:mm"
                                @change="onChange"
                                v-model:value="time" 
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item :label="$t('filter.level')">
                            <a-select :disabled="true" v-model:value="formState.promotion_level" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in levelList" :key="index" :value="item.level_value">{{item.level_code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <!-- <a-col :span="6">
                        <a-form-item :label="$t('filter.periodicity')">
                            <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                        </a-form-item>
                    </a-col> -->
                    <a-col :span="6">
                        <a-form-item :label="$t('filter.repulsionSeries')">
                            <a-select :disabled="true" v-model:value="formState.class_id" :placeholder="$t('filter.placeholderChange')">
                                <a-select-option v-for="(item, index) in classList" :key="index" :value="item.class_id">{{item.code}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    
                </a-row>
            </a-form>
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

    </div>
</a-spin>
</template>

<script>
    import { defineComponent, ref, provide, toRaw, onMounted, reactive} from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { message } from 'ant-design-vue';
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
        getPromotionResult
     } from '@/api/promotion'
    export default defineComponent({
        components: {
            tab1,
            tab2,
            tab3
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
            const detailInfo = ref({})
            const promotionItemSegments = ref([]);
            const promotionLocationSegments = ref([]);
            const promotionCustomerSegments = ref([]);
            const router = useRouter();
            const route = useRoute();
            const id = Number(route.params.id);
            let spinning = ref(false)

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
                    // provide('returnList', res.promotion_condition); 
                })
                getPromotionLevel().then(res => {
                    levelList.value = res.promotion_level
                })
                getPromotionType().then(res => {
                    typeList.value = res.promotion_type
                })
                getPromotionClass().then(res => {
                    classList.value = res.promotion_class
                    // provide('classList', res.promotion_class); 
                })
                getPromotionResult().then(res => {
                    resultList.value = res.promotion_condition
                    // provide('resultList', res.promotion_condition); 
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
            };
            const onSubmit = () => {
                if(promotionItemSegments.value.length == 0){
                    message.info('请添加商品标签');
                    return
                }
                if(promotionLocationSegments.value.length == 0){
                    message.info('请添加店铺标签');
                    return
                }
                 if(promotionCustomerSegments.value.length == 0){
                    message.info('请添加客户标签');
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
                       router.push('/promotion/list')
                    } else {
                       message.info(res);
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
                spinning
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
</style>
