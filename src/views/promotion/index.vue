 <template>
  <div class="container-form">
      <div class="filed">
          <a-form :model="formState" >
             
                    <a-input-group style="width: 500px"  compact>
                            <a-input style="width: 60%"   allowClear :placeholder="$t('filter.placeholderDetailInput')" v-model:value="formState.key_word" />
                            <a-select 
                            style="width: 20%"  
                            allowClear
                            v-model:value="formState.segment_status" 
                            :placeholder="$t('filter.placeholderChange')"
                            >
                                <a-select-option value="ALL">{{$t('filter.all')}}</a-select-option>
                                <a-select-option value="active">{{$t('filter.active')}}</a-select-option>
                                <a-select-option value="inactive">{{$t('filter.inactive')}}</a-select-option>
                            </a-select>
                            <a-button  style="width: 20%"   type="primary" @click="onSubmit">{{$t('common.query')}}</a-button>
                    </a-input-group>
               
                  <!-- <a-col :span="6">
                      <a-form-item :label="$t('filter.promotionName')">
                          <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.key_word" />
                      </a-form-item>
                  </a-col> -->

                  <!-- <a-col :span="6">
                    <a-form-item :label="$t('table.status')">
                        <a-select 
                           v-model:value="formState.promotion_status" 
                           :placeholder="$t('filter.placeholderChange')"
                        >
                            <a-select-option value="ALL">全部</a-select-option>
                            <a-select-option value="active">开启</a-select-option>
                            <a-select-option value="inactive">关闭</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->

                  <!-- <a-col :span="6">
                      <a-form-item :label="$t('filter.createTime')">
                          <a-date-picker
                                  v-model:value="formState.date1"
                                  show-time
                                  type="date"
                                  :placeholder="$t('filter.placeholderChange')"
                                  style="width: 100%"
                          />
                      </a-form-item>
                  </a-col> -->

                  <!-- <a-col :span="6">
                      <a-form-item :label="$t('filter.createPerson')">
                          <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                      </a-form-item>
                  </a-col> -->
                  <!-- <a-col :span="6">
                      <a-form-item :wrapper-col="{  offset: 2 }">
                          <a-button type="primary" @click="onSubmit">{{$t('common.query')}}</a-button>
                          <a-button  @click="onReset" style="margin-left: 10px">{{$t('common.reset')}}</a-button>
                      </a-form-item>
                  </a-col> -->
             
          </a-form>
      </div>
      <div class="body-content">
          <div class="flex flex-jcsb">
              <h3>{{$t('table.promotionList')}}</h3>
              <a-button type="primary" @click="onAdd">
                  <template #icon><PlusOutlined /></template>
                  {{$t('table.addPromotion')}}
              </a-button>
          </div>

          <div class="mt10">
              <a-table :pagination="false" :loading="loading" :data-source="dataSource" :columns="columns">
                  <template #index="{ index, record }">
                     {{index + 1}}
                  </template>
                  <template #promotion_id="{ index, record }">
                     <div class="link" @click="onEdit(record.promotion_id)" type="link">{{record.promotion_id}}</div>
                  </template>
                   <template #name="{ index, record }">
                     <div>{{record.name}}</div>
                     <div class="description">{{record.description}}</div>
                  </template>
                  <template #time="{ index, record }">
                    <a-tag v-if="record.time_stats == '已结束'" color="default">{{record.time_stats}}</a-tag>
                    <a-tag v-if="record.time_stats == '进行中'" color="green">{{record.time_stats}}</a-tag>
                     <a-tag v-if="record.time_stats == '未开始'" color="blue">{{record.time_stats}}</a-tag>
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
                                      <a @click="onDetail(record.promotion_id)" href="javascript:;"> {{$t('table.detail')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a @click="onEdit(record.promotion_id)" href="javascript:;"> {{$t('table.edit')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a href="javascript:;"> {{$t('table.export')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a-popconfirm
                                              v-if="dataSource.length"
                                              title="Sure to delete?"
                                              @confirm="onDelete(record)"
                                      >
                                          <a> {{$t('table.delete')}}</a>
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
                        @change="onChange"
                        
                    />
              </div>
          </div>

      </div>
  </div>

</template>

<script>
    import { defineComponent, reactive, toRaw, ref, computed, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import {useI18n} from 'vue-i18n'
    import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue';
    import { getPromotionList, deletePromotion, updateStatusPromotion } from '@/api/promotion'
    
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined
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
            let {t} = useI18n()

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
            const onAdd = () => {
                router.push('/promotion/update/0')
            };
            const onDetail = (id) => {
                router.push('/promotion/detail/'+id)
            }
            const onEdit = (id) => {
                router.push('/promotion/update/'+id)
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
                onDetail
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