<template>
    <div>
      <a-row :gutter="[16,16]">
      <a-col :span="8" >
         <div class="info">
            <div class="info-tit">{{$t('menu.promotion')}}</div>
            <div class="info-num">132</div>
            <div>
              <a-row :gutter="[16,16]">
                <a-col :span="8">
                   <div class="info-b">未开始</div>
                   <div class="info-bt">12</div>
                </a-col>
                <a-col :span="8">
                   <div class="info-b">进行中</div>
                   <div class="info-bt">6</div>
                </a-col>
                <a-col :span="8">
                   <div class="info-b">已结束</div>
                   <div class="info-bt">17</div>
                </a-col>
              </a-row>
            </div>
         </div>
      </a-col>
      <a-col :span="8">
        <div class="info">
          <div class="info-tit">{{$t('filter.promotionType')}}</div>
          <div>
            <e-charts class="chart" :option="option" />
          </div>
        </div>  
      </a-col>
      <a-col :span="8">
        <div class="info">
          <div class="info-tit">{{$t('filter.promotionWay')}}</div>
          <div>
            <e-charts class="chart" :option="option" />
          </div>
        </div>  
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]" style="margin-top: 16px;">
      <a-col :span="8" >
        <div class="info">
          <div class="info-tit">{{$t('menu.customer')}} {{$t('menu.segment')}}</div>
           <div style="margin-top: 48px;">
              <a-row :gutter="[16,16]">
                <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.inactive')}}</div>
                </a-col>
                <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.active')}}</div>
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
      <a-col :span="8" >
        <div class="info">
          <div class="info-tit">{{$t('menu.item')}} {{$t('menu.segment')}}</div>
           <div style="margin-top: 48px;">
              <a-row :gutter="[16,16]">
               <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.inactive')}}</div>
                </a-col>
                <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.active')}}</div>
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
      <a-col :span="8" >
        <div class="info">
          <div class="info-tit">{{$t('menu.location')}} {{$t('menu.segment')}}</div>
           <div style="margin-top: 48px;">
              <a-row :gutter="[16,16]">
                <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.inactive')}}</div>
                </a-col>
                <a-col :span="12">
                  <div class="info-bt">6</div>
                  <div class="info-b" style="margin-top: 20px;">{{$t('filter.active')}}</div>
                </a-col>
              </a-row>
            </div>
        </div>
      </a-col> 
    </a-row>
    </div>
      
</template>

<script>
    import { defineComponent, ref, computed } from 'vue';
    export default defineComponent({
         components: { 
          },
          setup() {
            const data = ref([
              {value:21, name: 'A'}
            ])
            const option = computed(()=>{
              return{
                 tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    top: '0%',
                    // right:'0%',
                    left: 'right',
                    // top:'center',
                    orient:'vertical',
                    icon: 'circle',
                    itemHeight: 10,
                    itemGap: 10
                    // align:'center'
                  },
                  color: ['#312e2a','#999999'],
                series:  [
                    {
                      name: 'promtion类型',
                      type: 'pie',
                      radius: ['40%', '70%'],
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
                          fontSize: 20,
                          // fontWeight: 'bold'
                        }
                      },
                      labelLine: {
                        show: false
                      },
                      data: [
                        { value: 8, name: 'product' },
                        { value: 2, name: 'Coupon' },
                    
                      ],
            
                    }
                  ]
              }
            })

            return {
              option
            }
           
          }
    });

</script>
<style scoped>
.info{
  width: 100%;
  height: 230px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
}
.info-tit{
  font-weight: bold;
  font-size: 16px;
  color: #303030;
}
.info-num{
  font-size: 24px;
  font-weight: bold;
  color: #303030;
  text-align: center;
  margin-top: 24px;
}
.info-b{
  margin-top: 32px;
  color: #606060;
  text-align: center;
  font-size: 14px;
}
.info-bt{
  color: #303030;
  text-align: center;
  margin-top: 8px;
  font-size: 22px;
  font-weight: bold;
}

.chart{
  width: 100%;
  height: 200px;
}
</style>
