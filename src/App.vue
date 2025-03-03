<script>
    import { defineComponent, ref, onMounted } from 'vue';
    import {useI18n} from 'vue-i18n'
    import enUS from 'ant-design-vue/es/locale/en_US';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
    setup() {
        const colorList = ref([
          {name: '深灰',color: '#312e2a',menFontColor: '#333333',menBgColor: '#eef0f4'},
          {name: '浅灰',color: '#9a9da4',menFontColor: '#333333',menBgColor: '#eef0f4'},
          {name: '黑色',color: '#000000',menFontColor: '#ffffff',menBgColor: '#ffffff'},
          {name: '蓝色',color: '#1677ff',menFontColor: '#1677ff',menBgColor: '#e6f4ff'},
          {name: '绿色',color: '#00b96b',menFontColor: '#00b96b',menBgColor: '#e1faeb'},
        ])
        const colorChecked = ref('#312e2a')
        const checked = ref(localStorage.getItem('language') == 'zh');
        const { t, locale } = useI18n()
        const getPopupContainer = (el, dialogContext) => {
            if (dialogContext) {
                return dialogContext.getDialogWrap();
            } else {
                return document.body;
            }
        }
        const changeLang = (value) => {
            checked.value = value
            localStorage.setItem('language', !value ? 'en' : 'zh')
            locale.value = !value ? 'en' : 'zh';
        }

        onMounted(()=>{
            
            const body = document.querySelector('body');
            body && body.style.setProperty('--theme', colorChecked.value);
            body && body.style.setProperty('--thememenu', getColor(colorChecked.value, 'menFontColor'));
            body && body.style.setProperty('--thememenubg', getColor(colorChecked.value, 'menBgColor'));
            
        })

        const changeColor = (e) => {
            colorChecked.value = e
            const body = document.querySelector('body');
            body && body.style.setProperty('--theme', e);
            body && body.style.setProperty('--thememenu', getColor(e, 'menFontColor'));
            body && body.style.setProperty('--thememenubg', getColor(colorChecked.value, 'menBgColor'));
        }

        const getColor = (value,name) => {
            var color = ''
            colorList.value.forEach(item => {
              if(item.color == value){
                 color = item[name]
              }
            });
            return color;
        }

        return {
            checked,
            enUS,
            zhCN,
            changeColor,
            changeLang,
            getPopupContainer,
            colorChecked,
            colorList
        }
    }
})

</script>

<template>

  <div class="change-lang">
    <a-select style="width:80px" v-model:value="checked" @change="changeLang">
      <a-select-option :value="true">中文</a-select-option>
      <a-select-option :value="false">英文</a-select-option>
    </a-select>
    <a-select style="width:80px;margin-left: 10px" v-model:value="colorChecked" @change="changeColor">
      <a-select-option v-for="(item,index) in colorList" :key="index" :value="item.color">
        {{item.name}}
      </a-select-option>
    </a-select>
    
  </div>
  <a-config-provider 
      :theme="{
        token:{
          colorPrimary: colorChecked, 
          borderRadius: '2px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0)',
          boxShadowBase:'none !important', 
          colorLink: colorChecked, 
        },
      }" 
      :locale="!checked ? enUS : zhCN" 
      :getPopupContainer="getPopupContainer"
  >
     <RouterView />
  </a-config-provider>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.change-lang{
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 99;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
