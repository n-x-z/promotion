<template>
  <a-sub-menu :key="menuInfo.label" :icon="menuInfo.icon">
    <!--<template #icon><MailOutlined /></template>-->
    <template #title>{{ $t(`menu.${menuInfo.label}`) }}</template>
    <template v-for="item in menuInfo.children" :key="item.label">
      <template v-if="!item.children">
        <a-menu-item :key="item.label" :icon="item.icon">

          <router-link :to="item.link" > {{ $t(`menu.${item.label}`) }} </router-link>

        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.label" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue';
    import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue';

    export default defineComponent({
        props: {
            menuInfo: {
                type: Object,
                default: () => ({}),
            },
        },
        setup() {
            const selectedKeys = ref(['1']);
            const openKeys = ref(['home']);
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
            PieChartOutlined,
            MailOutlined,
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
