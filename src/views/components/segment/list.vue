<template>
  <div class="container-form">
      <div class="filed ">
          <a-form :model="formState" class="flex flex-jcsb">           
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
                <a-button type="primary" @click="onAdd">
                    <template #icon><PlusOutlined /></template>
                    {{$t('table.addSegment')}}
                </a-button>
          </a-form>
      </div>
      <div class="body-content">
          <!-- <div class="flex flex-jcsb">
              <h3>{{$t('table.SegmentList')}}</h3>
              <a-button type="primary" @click="onAdd">
                  <template #icon><PlusOutlined /></template>
                  {{$t('table.addSegment')}}
              </a-button>
          </div> -->

          <div >
              <a-table :pagination="false" :loading="loading" :data-source="dataSource" :columns="columns">
                  <template #index="{ index, record }">
                     {{index + 1}}
                  </template>
                   <template #segment_id="{ index, record }">
                     <div class="link" @click="onEdit(record.segment_id)" type="link">{{record.segment_id}}</div>
                     <a-tag color="orange">{{record.create_type}}</a-tag>
                  </template>
                   <template #name="{ index, record }">
                     <div>{{record.name}}</div>
                     <div class="description">{{record.description}}</div>
                  </template>
                  <template #status="{ index, record }">
                      <a-switch @change="e => onChangeSwitch(e, index, record)" :checkedValue="record.segment_status != 'active' " />
                  </template>
                  <template #operation="{ record }">
                      <a-dropdown>
                          <a class="ant-dropdown-link" @click.prevent>
                              <MoreOutlined style="font-weight: bold;font-size: 20px" />
                          </a>
                          <template #overlay>
                              <a-menu style="width: 150px">
                                  <a-menu-item>
                                      <a @click="onDetail(record.segment_id)" href="javascript:;"> {{$t('table.detail')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a @click="onEdit(record.segment_id)" href="javascript:;"> {{$t('table.edit')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a @click="onCopy(record.segment_id)" href="javascript:;"> {{$t('table.copy')}}</a>
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
                        v-model:pageSize="paginationData.page_size"
                        :total="paginationData.total"
                        show-size-changer
                        @change="onChange"
                        
                    />
              </div>
          </div>

      </div>
  </div>

</template>

<script>
    import { defineComponent, reactive, toRaw, ref, computed, onMounted, watch, inject } from 'vue';
    import { useRouter } from 'vue-router';
    import {useI18n} from 'vue-i18n'
    import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue';
    import { getSegmentsList, deleteSegments, updateStatusSegments } from '@/api/segments'
    
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined
        },
        setup() {
            const formState = reactive({
                key_word: '',
                segment_status: 'ALL',
            });
            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
            })
            let loading = ref(true)
            let {t} = useI18n()
            let segmentType = inject('segmentType');

            const columns = computed (() => {
                return ([
                {
                    title: t('table.serialNumber'),
                    dataIndex: 'index',
                    width: 80,
                    slots: {
                        customRender: 'index',
                    },
                },
                {
                    title: t('table.SegmentId'),
                    dataIndex: 'segment_id',
                    slots: {
                        customRender: 'segment_id',
                    },
                },
                {
                    title: t('table.SegmentName'),
                    dataIndex: 'name',
                    slots: {
                        customRender: 'name',
                    },
                },
                {
                    title: t('table.num'),
                    dataIndex: 'sub_count',
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
                    dataIndex: 'segment_status',
                    slots: {
                        customRender: 'status',
                    },
                },
                {
                    title:  t('table.operate'),
                    dataIndex: 'operation',
                    slots: {
                        customRender: 'operation',
                    },
                },
            ]);
            })
            const dataSource = ref([]);
            const router = useRouter();
            onMounted(()=>{
                 init()
            })

            const init = () => {
                const data = {
                     segment_type: segmentType,
                     ...toRaw(formState),
                     ...paginationData.value
                }
                loading.value = true
                getSegmentsList(data).then(res => {
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
                formState.segment_status = 'ALL'
                paginationData.value.page = 1
                init()
            };
            const onDelete = item => {
                const data = {
                     segment_type: segmentType,
                     segment_id: item.segment_id
                }
                deleteSegments(data).then(res => {
                    paginationData.value.page = 1
                    init()
                })
               
            };
            const onAdd = () => {
                router.push('/segment/'+segmentType+'/update/0')
            };
             const onDetail = (id) => {
                router.push('/segment/'+segmentType+'/detail/'+id)
            }
            const onEdit = (id) => {
                router.push('/segment/'+segmentType+'/update/'+id)
            }
            const onCopy = (id) => {
                router.push('/segment/'+segmentType+'/update/'+id+'?type=copy')
            }
            const onChange = (pageNumber, pageSize) => {
         
                paginationData.value.page = pageNumber || 1
                paginationData.value.page_size = pageSize
                init()
            };
            const onChangeSwitch = (e, index, item) => {
                 const data = {
                     segment_type: segmentType,
                     segment_id: item.segment_id,
                     segment_status: e ? 'active' : 'inactive'
                }
                loading.value = true
                updateStatusSegments(data).then(res => {
                    loading.value = false
                     dataSource.value[index].segment_status = e ? 'active' : 'inactive'
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
                onDetail,
                onChangeSwitch,
                onReset,
                onCopy
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
