<template>
    <a-spin :spinning="spinning">
      <a-row :gutter="[16,16]">
      <a-col :span="8" >
         <div class="dashboard ht300">
            
            <div class="dashboard-num font mt40">
              <span class="fs16"> {{$t('menu.promotion')}}</span>
               <div class="mt10 fs32">{{dashboardInfo.Promotion_Count.Total}}</div>
            </div>
            <div class="mt40">
              <a-row :gutter="[16,16]">
                <a-col :span="8">
                   <div class="dashboard-title"><a-tag color="blue">{{$t('table.NotStarted')}}</a-tag></div>
                   <div class="dashboard-num font fs20">{{dashboardInfo.Promotion_Count.Not_Started}}</div>
                </a-col>
                <a-col :span="8">
                   
                   <div class="dashboard-title"> <a-tag color="green">{{$t('table.InProgress')}}</a-tag></div>
                   <div class="dashboard-num font fs20">{{dashboardInfo.Promotion_Count.In_Progress}}</div>
                </a-col>
                <a-col :span="8">
                
                   <div class="dashboard-title"> <a-tag color="default">{{$t('table.Completed')}}</a-tag></div>
                   <div class="dashboard-num font fs20">{{dashboardInfo.Promotion_Count.Completed}}</div>
                </a-col>
              </a-row>
            </div>
         </div>
      </a-col>
      <a-col :span="16">
         <div class="dashboard ht300">
         <a-row :gutter="[16,16]">
             <a-col :span="8">
                    <div>
                      <e-charts class="chart" :option="promotionOption" />
                      <div class="chart-ul">
                        <div class="chart-li" v-for="(item, index) in promotionOption.series[0].data" :key="index">

                          <a-badge :color="chartColor[index]" />
                          <span class="font-color6">{{item.name}} </span>
                          <span class="font ml5">{{item.value}}</span>
                        </div>
                      </div>
                     
                    </div> 
              </a-col>
               <a-col :span="8">
                 
                    <div>
                      <e-charts class="chart" :option="applyOption" />
                      <div class="chart-ul">
                        <div class="chart-li" v-for="(item, index) in applyOption.series[0].data" :key="index">
                          <a-badge :color="chartColor[index]" />
                          <span class="font-color6">{{item.name}} </span>
                          <span class="font ml5">{{item.value}}</span>
                        </div>
                      </div>
                    </div>
               </a-col>
                <a-col :span="8">
                 
                    <div>
                      <e-charts class="chart" :option="discountOption" />
                      <div class="chart-ul">
                          <div class="chart-li" v-for="(item, index) in discountOption.series[0].data" :key="index">
                           <a-badge :color="chartColor[index]" />
                            <span class="font-color6">{{item.name}} </span>
                            <span class="font ml5">{{item.value}}</span>
                          </div>
                        </div>
                    </div>
                  
               </a-col>
         </a-row>
         </div>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]" style="margin-top: 16px;">
      <a-col :span="8" >
        <div class="dashboard ht230">
          <div class="dashboard-header">{{$t('menu.customer')}} {{$t('menu.segment')}}</div>
           <div class="mt40">
              <a-row :gutter="[16,16]">
                <a-col :span="12">
                  <div class="dashboard-title" >{{$t('table.total')}}</div>
                  <div class="dashboard-num font fs30">{{dashboardInfo.Customer_Segment.Total}}</div>
                </a-col>
                <a-col :span="12">
                  <div class="flex">
                      <img class="dashboard-icon" src="../../assets/images/active.svg" />
                      <div class="dashboard-title" >{{$t('filter.active')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Customer_Segment.Active}}</div>
                  </div>
                  <div class="flex mt20">
                      <img class="dashboard-icon" src="../../assets/images/inuse.svg" />
                      <div class="dashboard-title">{{$t('filter.inUse')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Customer_Segment.In_Use}}</div>
                  </div>
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
      <a-col :span="8" >
        <div class="dashboard ht230">
          <div class="dashboard-header">{{$t('menu.item')}} {{$t('menu.segment')}}</div>
           <div class="mt40">
              <a-row :gutter="[16,16]">
                <a-col :span="12">
                  <div class="dashboard-title">{{$t('table.total')}}</div>
                  <div class="dashboard-num font fs30">{{dashboardInfo.Item_Segment.Total}}</div>
                </a-col>
                <a-col :span="12">
                  <div class="flex">
                      <img class="dashboard-icon" src="../../assets/images/active.svg" />
                      <div class="dashboard-title" >{{$t('filter.active')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Item_Segment.Active}}</div>
                  </div>
                  <div class="flex mt20">
                      <img class="dashboard-icon" src="../../assets/images/inuse.svg" />
                      <div class="dashboard-title">{{$t('filter.inUse')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Item_Segment.In_Use}}</div>
                  </div>
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
      <a-col :span="8" >
        <div class="dashboard ht230">
          <div class="dashboard-header">{{$t('menu.location')}} {{$t('menu.segment')}}</div>
           <div class="mt40">
              <a-row :gutter="[16,16]">
                <a-col :span="12">
                  <div class="dashboard-title" >{{$t('table.total')}}</div>
                   <div class="dashboard-num font fs30">{{dashboardInfo.Location_Segment.Total}}</div>
                </a-col>
                <a-col :span="12">
                   <div class="flex">
                      <img class="dashboard-icon" src="../../assets/images/active.svg" />
                      <div class="dashboard-title" >{{$t('filter.active')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Location_Segment.Active}}</div>
                  </div>
                  <div class="flex mt20">
                      <img class="dashboard-icon" src="../../assets/images/inuse.svg" />
                      <div class="dashboard-title">{{$t('filter.inUse')}}</div>
                      <div class="dashboard-num font fs16 ml10">{{dashboardInfo.Location_Segment.In_Use}}</div>
                  </div>
                 
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
    </a-row>
    </a-spin>
      
</template>

<script>
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import {BulbFilled} from '@ant-design/icons-vue';
    import { promotionDashboard } from '@/api/home'
    export default defineComponent({
          components: {
            BulbFilled
          },
          setup() {
            const dashboardInfo = ref({
              Promotion_Count: {},
              Customer_Segment: {},
              Item_Segment: {},
              Location_Segment: {}
            })
            const chartColor = ref(['#312e2a','#999999', '#666666'])
            let spinning = ref(false)

            const option =ref({
                tooltip: {
                  trigger: 'item'
                },
                color: chartColor,
                series:  [
                  {
                    name: '',
                    type: 'pie',
                    radius: ['70%', '100%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center'
                    },
                      itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 3
                      },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 16,
                        // fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: []
                  }
                ]
          })

          const promotionOption = computed(()=>{
              var data = JSON.parse(JSON.stringify(option.value))
              data.series[0].data = newArr(dashboardInfo.value.Promotion_Type)
              return data
          })

          const applyOption = computed(()=>{
              var data = JSON.parse(JSON.stringify(option.value))
              data.series[0].data = newArr(dashboardInfo.value.Apply_Type)
              return data
          })

          const discountOption = computed(()=>{
              var data = JSON.parse(JSON.stringify(option.value))
              data.series[0].data = newArr(dashboardInfo.value.Discount_Type)
              return data
            })

            onMounted(()=>{
                 init()
            })
            const init = () => {
                spinning.value = true
                promotionDashboard().then(res => {
                    spinning.value = false
                    dashboardInfo.value = res.data
                })
            }

            const newArr = (obj) => {
              const arr = [];
              for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                  arr.push({name:key, value:obj[key]});
                }
              }
              return arr
            }

            return {
              promotionOption,
              applyOption,
              discountOption,
              spinning,
              dashboardInfo,
              chartColor
            }
           
          }
    });

</script>
<style scoped>
.dashboard{
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}
.ht300{
  height: 300px;
}
.ht230{
  height: 230px;
}
.font-color6{
  color: #606060;
}
.dashboard-header{
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #303030;
  position: relative;
  padding: 20px 0;
}
.dashboard-header::after{
  content: '';
  position: absolute;
  height: 1px;
  background: #f1f1f1;
  width: 100%;
  bottom: 0;
  left: 0;
}

.dashboard-title{
  color: #606060;
  text-align: center;
  font-size: 14px;
  line-height: 26px;
}
.dashboard-num{
  color: #303030;
  text-align: center;
  font-weight: bold;
}

.chart{
  width: 100%;
  height: 120px;
  margin: 10px 0;
  padding: 0px 30px;
}
.chart-ul{
  width: 120px;
 position: absolute;
 left: 40px;
 right: 0;
 margin: auto;
  margin-top: 20px;
}
.chart-li{
  position: relative;
  margin-top: 10px;

}
.dashboard-icon{
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 5px;
}
</style>
