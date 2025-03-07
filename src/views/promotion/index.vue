 <template>
  <div class="container-form">
      <div class="filed">
          <a-form :model="formState" class="flex flex-jcsb">
                <a-input-group style="width: 500px"  compact>
                    <a-input style="width: 60%"   allowClear :placeholder="$t('filter.placeholderDetailInput')" v-model:value="formState.key_word" >
                        <template #prefix>
                            <SearchOutlined />
                        </template>
                    </a-input>
                    <a-select 
                    style="width: 20%"  
                    allowClear
                    v-model:value="formState.promotion_status" 
                    :placeholder="$t('filter.placeholderChange')"
                    >
                        <a-select-option value="ALL">{{$t('filter.all')}}</a-select-option>
                        <a-select-option value="active">{{$t('filter.active')}}</a-select-option>
                        <a-select-option value="inactive">{{$t('filter.inactive')}}</a-select-option>
                    </a-select>
                    <a-button  style="width: 20%"   type="primary" @click="onSubmit">{{$t('common.query')}}</a-button>
                </a-input-group>
                 <a-button type="primary" @click="onAdd">
                    <template #icon><PlusOutlined /></template>
                    {{$t('table.addPromotion')}}
                </a-button>
          </a-form>
      </div>
      <div class="body-content">
          <div >
              <a-table :pagination="false" :loading="loading" :data-source="dataSource" :columns="columns">
                  <template #index="{ index, record }">
                     {{index + 1}}
                  </template>
                  <template #promotion_id="{ index, record }">
                     <div class="link" @click="onEdit(record.promotion_id, record)" type="link">{{record.promotion_id}}</div>
                  </template>
                   <template #name="{ index, record }">
                     <div>{{record.name}}</div>
                     <div class="description">{{record.description}}</div>
                  </template>
                   <template #type="{ index, record }">
                     <div class="flex">
                        {{record.promotion_type}}
                        <img class="ml5" v-if="record.promotion_type == 'Coupon'" src="../../assets/images/coupon.svg" />
                    </div>
                     
                  </template>
                  <template #time="{ index, record }">
                    <a-tag v-if="record.time_stats == 'Completed'" color="default">{{$t('table.Completed')}}</a-tag>
                    <a-tag v-if="record.time_stats == 'In Progress'" color="green">{{$t('table.InProgress')}}</a-tag>
                    <a-tag v-if="record.time_stats == 'Not Started'" color="blue">{{$t('table.NotStarted')}}</a-tag>
                     <div>{{record.start_date}}~{{record.end_date}}</div>
                  </template>
                  <template #status="{ index, record }">
                      <a-switch @change="e => onChangeSwitch(e, index, record)" :checkedValue="record.promotion_status != 'active' " />
                  </template>
                  <template #operation="{ record }">
                      <a-dropdown>
                          <a class="ant-dropdown-link" @click.prevent>
                              <MoreOutlined style="font-weight: bold;font-size: 20px" />
                          </a>
                          <template #overlay>
                              <a-menu style="width: 150px">
                                  <a-menu-item>
                                      <a class="operate-li" @click="onDetail(record.promotion_id, record)" href="javascript:;"> 
                                         <img src="../../assets/images/detail.svg" />
                                        {{$t('table.detail')}}
                                      </a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a class="operate-li" @click="onEdit(record.promotion_id, record)" href="javascript:;"> 
                                         <img src="../../assets/images/edit.svg" />
                                        {{$t('table.edit')}}
                                      </a>
                                  </a-menu-item>
                                   <a-menu-item>
                                      <a class="operate-li" @click="onCopy(record.promotion_id, record)" href="javascript:;"> 
                                        <img src="../../assets/images/copy.svg" />
                                        {{$t('table.copy')}}
                                      </a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a class="operate-li" href="javascript:;"> 
                                         <img src="../../assets/images/export.svg" />
                                        {{$t('table.export')}}
                                      </a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a-popconfirm
                                              v-if="dataSource.length"
                                              title="Sure to delete?"
                                              @confirm="onDelete(record)"
                                      >
                                          <a class="operate-li">
                                             <img src="../../assets/images/detele.svg" />
                                             {{$t('table.delete')}}
                                         </a>
                                      </a-popconfirm>
                                  </a-menu-item>
                              </a-menu>
                          </template>
                      </a-dropdown>
                  </template>
              </a-table>
              <div class="mt20" style="text-align: right;">
                <a-pagination
                        v-model:current="paginationData.page"
                        :show-total="total => `${$t('table.total')} ${paginationData.total} ${$t('table.items')}`"
                        v-model:pageSiz="paginationData.page_size"
                        :total="paginationData.total"
                        show-size-changer
                        @change="onChange"
                        
                    />
              </div>
          </div>

      </div>

        <a-modal width="800px" v-model:visible="visible" :maskClosable="false" title="" :closable="false" @ok="handleOk">
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
                            <div class="mt10" v-for="(item, index) in templateList" :key="index">
                                <a-card :title="item.code"  :class="item.checked ? 'borderactive' : ''" @click="onClickChildCard(index)" >
                                   
                                     <div class="desc color9">{{item.discription}}</div>
                                </a-card>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>

            </a-tabs>
        </a-modal>  
  </div>

</template>

<script>
    import { defineComponent, reactive, toRaw, ref, computed, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import {useI18n} from 'vue-i18n'
    import { PlusOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons-vue';
    import { 
        getPromotionList, 
        deletePromotion, 
        updateStatusPromotion, 
        getPromotionClass,
        getPromotionTemplate
     } from '@/api/promotion'
    
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined,
            SearchOutlined
        },
        setup() {
            const formState = reactive({
                key_word: '',
                promotion_status: 'ALL',
            });
            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
            })
            let loading = ref(true)
            const visible = ref(false);
            const classList = ref([]);
            const templateList = ref([])
            let {t} = useI18n()
            const checkRow = ref({})

            const columns = computed (() => {
                return([
                 {
                    title: t('table.serialNumber'),
                    dataIndex: 'index',
                    width: 80,
                    slots: {
                        customRender: 'index',
                    },
                },
                {
                    title: t('table.promotionId'),
                    dataIndex: 'promotion_id',
                    slots: {
                        customRender: 'promotion_id',
                    },
                },
                {
                    title: t('table.promotionName'),
                    dataIndex: 'name',
                    slots: {
                        customRender: 'name',
                    },
                },
                {
                    title: t('table.type'),
                    dataIndex: 'promotion_type',
                    slots: {
                        customRender: 'type',
                    },
                },
                {
                    title: t('table.startingTime'),
                    dataIndex: 'time',
                    slots: {
                        customRender: 'time',
                    },
                },
                {
                    title: t('table.createTime'),
                    dataIndex: 'create_time',
                },
                {
                    title: t('table.createPerson'),
                    dataIndex: 'create_user',
                },
                {
                    title: t('table.status'),
                    dataIndex: 'promotion_status',
                    slots: {
                        customRender: 'status',
                    },
                },
                {
                    title: t('table.operate'),
                    dataIndex: 'operation',
                    slots: {
                        customRender: 'operation',
                    },
                },
            ])
            })
            const dataSource = ref([]);
            const router = useRouter();
            onMounted(()=>{
                 init()
            })

            const init = () => {
                const data = {
                     ...toRaw(formState),
                     ...paginationData.value
                }
                loading.value = true
                getPromotionList(data).then(res => {
                    loading.value = false
                    dataSource.value = res.data
                    paginationData.value.page = res.page
                    paginationData.value.page_size = res.page_size
                    paginationData.value.total = res.total
                })
            }
            const onSubmit = () => {
                init()
            };
            const onReset = () => {
                formState.key_word = ''
                formState.promotion_status = 'ALL'
                paginationData.value.page = 1
                init()
            };
            const onDelete = item => {
                const data = {
                     promotion_id: item.promotion_id
                }
                deletePromotion(data).then(res => {
                    paginationData.value.page = 1
                    init()
                })
               
            };
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
            const onAdd = () => {
                getPromotionClass().then(res => {
                    classList.value = res.promotion_class
                })
                getPromotionTemplate().then(res => {
                    templateList.value = res.promotion_template
                })
                visible.value = true;
                // router.push('/promotion/update/0')
            };
            const handleOk = () => {
                router.push('/promotion/update/0?code='+checkRow.value.code+'&class_id='+checkRow.value.class_id)
            }
            const onDetail = (id, item) => {
                router.push('/promotion/detail/'+id + '?code='+item.class_code+'&class_id='+item.class_id)
            }
            const onEdit = (id, item) => {
                router.push('/promotion/update/'+id + '?code='+item.class_code+'&class_id='+item.class_id)
            }
            const onCopy = (id, item) => {
                router.push('/promotion/update/'+id+'?type=copy' + '&code='+item.class_code+'&class_id='+item.class_id)
            }
            const onChange = (pageNumber, pageSize) => {
         
                paginationData.value.page = pageNumber || 1
                paginationData.value.page_size = pageSize
                init()
            };
            const onChangeSwitch = (e, index, item) => {
                 const data = {
                     promotion_id: item.promotion_id,
                     promotion_status: e ? 'active' : 'inactive'
                }
                loading.value = true
                updateStatusPromotion(data).then(res => {
                    loading.value = false
                    dataSource.value[index].promotion_status = e ? 'active' : 'inactive'
                })
            }
            return {
                loading,
                dataSource,
                columns,
                formState,
                onSubmit,
                MoreOutlined,
                onChange,
                paginationData,
                onAdd,
                onEdit,
                onDelete,
                onChangeSwitch,
                onReset,
                onDetail,
                onCopy,
                visible,
                classList,
                onClickCard,
                handleOk,
                templateList
            };
        },
    });

</script>
<style>
.description{
    color: #999;
    font-size: 12px;
}
</style>