import './assets/main.less'
import 'ant-design-vue/dist/reset.css' // 引入样式
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import {createI18n} from 'vue-i18n'
import Echarts from 'vue-echarts'
import * as echarts from 'echarts'
import en from './utils/lang/en.js'
import zh from './utils/lang/zh.js'


const app = createApp(App)
app.component('e-charts', Echarts)
app.config.globalProperties.$echarts = echarts
const i18n = createI18n({
    locale : localStorage.getItem('language') || 'zh', //当前语言标识
    messages: {
        en,
        zh
    }
})

app.use(i18n)
app.use(router)
app.use(Antd);
app.mount('#app')
