<template>
    <div class="container-form">
        <div class="body-content">
            <a-row>
                <a-col :span="11">
                        <h4 class="include-title">
                        <img src="../../../assets/images/include.svg" />
                        {{$t('updatePromotion.includesCustomer')}}
                    </h4>
                    <a-divider style="margin: 10px 0 10px 0" />
                    <a-row :gutter="16">
                        <a-col :span="12" v-for="(item, index) in includeList" :key="index" >
                            <a-card class="mt10">
                                <a-row :gutter="16">
                                    <a-col :span="12">
                                        <div class="inline-block card-title">
                                            <div class="card-name fl">ID</div>
                                            <div class="card-desc fl">{{item.segment_id}}</div>
                                        </div>
                                    </a-col>
                                    <a-col :span="12">
                                        <div class="inline-block card-title">
                                            <div class="card-name fl">COUNT#</div>
                                            <div class="card-desc fl">{{item.sub_count}}</div>
                                        </div>
                                    </a-col>
                                    <a-col :span="24">
                                        <div class="inline-block card-title">
                                            <div class="card-name fl">名称</div>
                                            <div class="card-desc fl">{{item.name}}</div>
                                        </div>
                                    </a-col>
                                </a-row>
                                <div class="card-delete">
                                    <img src="../../../assets/images/detele.svg" v-if="!disabled" @click="onDelete(1, index)" class="ml10" />
                                </div>
                            </a-card>
                        </a-col>
                    
                    </a-row>
                    <a-button class="add-button" type="link" v-if="!disabled" @click="showModal(1)">
                            <template #icon><PlusOutlined /></template>
                            {{$t('updatePromotion.addCustomerSegments')}}
                        </a-button>
                </a-col>
                <a-col :span="2" style="text-align: center">
                    <a-divider style="height: 100%" type="vertical" />
                </a-col>
                <a-col :span="11">
                        <h4 class="include-title">
                        <img src="../../../assets/images/noinclude.svg" />
                        {{$t('updatePromotion.excludeCustomer')}}
                    </h4>
                    <a-divider style="margin: 10px 0 10px 0" />
                    <a-row :gutter="16">
                        <a-col :span="12" v-for="(item, index) in noIncludeList" :key="index" >
                                <a-card class="mt10">
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <div class="inline-block card-title">
                                    <div class="card-name fl">ID</div>
                                    <div class="card-desc fl">{{item.segment_id}}</div>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div class="inline-block card-title">
                                    <div class="card-name fl">COUNT#</div>
                                    <div class="card-desc fl">{{item.sub_count}}</div>
                                </div>
                            </a-col>
                            <a-col :span="24">
                                <div class="inline-block card-title">
                                    <div class="card-name fl">名称</div>
                                    <div class="card-desc fl">{{item.name}}</div>
                                </div>
                            </a-col>
                        </a-row>
                        <div class="card-delete">
                            <img src="../../../assets/images/detele.svg" v-if="!disabled" @click="onDelete(0, index)" class="ml10" />
                        </div>
                    </a-card>
                        </a-col>
                        </a-row>
                    <a-button class="add-button" type="link" v-if="!disabled" @click="showModal(0)">
                        <template #icon><PlusOutlined /></template>
                        {{$t('updatePromotion.addCustomerSegments')}}
                    </a-button>

                </a-col>
            </a-row>
             
            <a-modal width="500px" v-model:visible="visible" :title="$t('updatePromotion.addCustomerSegments')" @ok="handleOk">
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
                                    <div class="card-name fl">COUNT#</div>
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
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, defineEmits } from 'vue';
    import { useRoute } from 'vue-router';
    import { PlusOutlined, MoreOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons-vue';
    import { getSegmentsList } from '@/api/segments'
    const emits = defineEmits(['onEmit'])
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined,
            DeleteOutlined,
            SearchOutlined
        },
        emits: emits,
         props: {
            promotionCustomerSegments: {
                type: Array,
                default: 'default'
            },
        },
        setup(props, { emit }) {
            const formState = ref({
                key_word: '',
                segment_status: 'active',
            });
            const checkRow = ref({})
            const type = ref(0)
            const include = ref(1)
            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
            })
            const visible = ref(false);
            const includeList = ref([])
            const noIncludeList = ref([])
            const dataSource = ref([])
            const route = useRoute();
            const id = Number(route.params.id);
            const disabled = ref(false)
            let spinning = ref(false)
            

            onMounted(()=>{
                setTimeout(()=>{
                    disabled.value = route.name == 'promotionDetail'
                    if(id != 0){
                        showDetail()
                    }  
                    init()
                },2000)
            })

            const showDetail = () => {
                if(props.promotionCustomerSegments.length > 0){
                    includeList.value = props.promotionCustomerSegments.filter(item => item.include == 1)
                    noIncludeList.value = props.promotionCustomerSegments.filter(item => item.include == 0)
                }
            }

            const onDelete = (include1, index) => {
                if(include1 == 1){
                    includeList.value = includeList.value.filter((item, num) => index !== num);
                } else if(include1 == 0){
                    noIncludeList.value = noIncludeList.value.filter((item, num) => index !== num);
                }
                onUpdate()
            };
            const showModal = (include1) => {
                visible.value = true;
                dataSource.value.forEach((item, num) => {
                    item.checked = false
                })
                include.value = include1
            };

            const handleOk = e => {
                getTypeList()
                visible.value = false;
            };

            const getTypeList = () => {
                if(include.value == 1){
                   includeList.value.push(checkRow.value)
                } else if(include.value == 0){
                   noIncludeList.value.push(checkRow.value)
                }
                onUpdate()
            }

            const onUpdate = () => {
                const promotionLocationSegments = includeList.value.concat(noIncludeList.value);
                emit('onEmit', {
                    promotion_customer_segments:promotionLocationSegments
                })
            };

             const init = () => {
                const data = {
                     segment_type: 'customer',
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
                formState,
                visible,
                MoreOutlined,
                onDelete,
                dataSource,
                noIncludeList,
                includeList,
                showModal,
                handleOk,
                onClickCard,
                paginationData,
                disabled,
                onSearch,
                onSizeChange,
                spinning
            };
        },
    });

</script>
<style>
    .card-title{

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
