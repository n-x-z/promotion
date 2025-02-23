<template>
  <div class="container-form">
      <div class="filed">
          <a-form :model="formState" >
              <a-row>
                  <a-col :span="6">
                      <a-form-item :label="$t('filter.tagName')">
                          <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                      </a-form-item>
                  </a-col>

                  <a-col :span="6">
                      <a-form-item :label="$t('filter.createTime')">
                          <a-date-picker
                                  v-model:value="formState.date1"
                                  show-time
                                  type="date"
                                  :placeholder="$t('filter.placeholderChange')"
                                  style="width: 100%"
                          />
                      </a-form-item>
                  </a-col>

                  <a-col :span="6">
                      <a-form-item :label="$t('filter.createPerson')">
                          <a-input :placeholder="$t('filter.placeholderInput')" v-model:value="formState.name" />
                      </a-form-item>
                  </a-col>
                  <a-col :span="6">
                      <a-form-item :wrapper-col="{  offset: 2 }">
                          <a-button type="primary" @click="onSubmit">{{$t('common.query')}}</a-button>
                          <a-button  @click="onReset" style="margin-left: 10px">{{$t('common.reset')}}</a-button>
                      </a-form-item>
                  </a-col>
              </a-row>
          </a-form>
      </div>
      <div class="body-content">
          <div class="flex flex-jcsb">
              <h3>{{$t('table.tagList')}}</h3>
              <a-button type="primary" @click="onAdd">
                  <template #icon><PlusOutlined /></template>
                  {{$t('table.addTag')}}
              </a-button>
          </div>

          <div class="mt20">
              <a-table :pagination="false" :loading="loading" :data-source="dataSource" :columns="columns">
                  <template #index="{ index, record }">
                     {{index + 1}}
                  </template>
                   <template #name="{ index, record }">
                     <div>{{record.name}}</div>
                     <div class="description">{{record.description}}</div>
                  </template>
                  <template #status="{ record }">
                      <a-switch v-model:checked="record.checked" />
                  </template>
                  <template #operation="{ record }">
                      <a-dropdown>
                          <a class="ant-dropdown-link" @click.prevent>
                              <MoreOutlined style="font-weight: bold;font-size: 20px" />
                          </a>
                          <template #overlay>
                              <a-menu style="width: 150px">
                                  <a-menu-item>
                                      <a href="javascript:;"> {{$t('table.detail')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a @click="onEdit(record.segment_id)" href="javascript:;"> {{$t('table.edit')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a href="javascript:;"> {{$t('table.export')}}</a>
                                  </a-menu-item>
                                  <a-menu-item>
                                      <a-popconfirm
                                              v-if="dataSource.length"
                                              title="Sure to delete?"
                                              @confirm="onDelete(record.key)"
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
    import { getSegmentsList } from '@/api/segments'
    
    export default defineComponent({
        components: {
            PlusOutlined,
            MoreOutlined
        },
        setup() {
            const formState = reactive({
                name: '',
                description: '',
            });
            let paginationData = ref({
                page: 1,
                page_size: 10,
                total: 0,
            })
            let loading = ref(true)
            let segmentType = ref('item') 
            let {t} = useI18n()

            const columns = computed (() => {
                return ([
                {
                    title: t('table.serialNumber'),
                    dataIndex: 'index',
                    slots: {
                        customRender: 'index',
                    },
                },
                {
                    title: t('table.tagId'),
                    dataIndex: 'segment_id',
                },
                {
                    title: t('table.tagName'),
                    dataIndex: 'name',
                    slots: {
                        customRender: 'name',
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
                     segment_type: segmentType.value,
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
                formState.name = ''
                formState.description = ''
                paginationData.value.page = 1
                paginationData.value.page_size = 10
                init()
            };
            const onDelete = key => {
                dataSource.value = dataSource.value.filter(item => item.key !== key);
            };
            const onAdd = () => {
                router.push('/segment/'+segmentType.value+'/update/0')
            };
            const onEdit = (id) => {
                router.push('/segment/'+segmentType.value+'/update/'+id)
            }
            const onChange = (pageNumber, pageSize) => {
                console.log(pageNumber, 'pageNumber')
                paginationData.value.page = pageNumber || 1
                paginationData.value.page_size = pageSize
                init()
            };
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
                onReset
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
