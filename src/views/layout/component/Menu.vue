<template>
  <a-menu
          id="dddddd"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :theme="theme"
          @click="handleClick"
  >

    <template v-for="(item, index) in menuData" :key="index">
      <template v-if="!item.children">
        <a-menu-item :key="item.label" :icon="item.icon">
          <router-link :to="item.link" > {{ $t(`menu.${item.label}`) }} </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { MailOutlined, QqOutlined, HomeFilled, AppstoreOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons-vue';
    import SubMenu from './SubMenu.vue';
    export default defineComponent({
        props: {
            menuData: {
                type: Array,
                default: 'default'
            },
            theme: {
                type: String,
                default: 'default'
            },
            collapsed: {
                type: Boolean,
                default: 'default'
            },
        },
        setup() {
           
            const route = useRoute();
            const selectedKeys = ref([route.name]);
            const openKeys = ref(['segment']);
            const handleClick = (e) => {
                console.log('click', e);
            };
            const titleClick = (e) => {
                console.log('titleClick', e);
            };


            watch(
                () => openKeys,
                val => {
                    console.log('openKeys', val);
                },
            );
            return {
                selectedKeys,
                openKeys,
                handleClick,
                titleClick,
            };
        },
        components: {
            MailOutlined,
            SubMenu,
            QqOutlined,
            AppstoreOutlined,
            SettingOutlined,
            PieChartOutlined,
            HomeFilled
        },
    });


</script>

<style scoped>
  ul{
    margin: 0;
    padding: 0;
  }
  .btn-toggle-nav a {
    padding: .1875rem .5rem;
    margin-top: .125rem;
    margin-left: 1.25rem;
  }
  .menu-item{
    padding: 5px 10px;
  }

</style>
