<template>
    <div class="layout">
    <a-layout>
        <a-layout-sider :style="{background: theme == 'dark'? '#001529' : '#fff'}" v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div :class="theme !== 'dark'?'borderbottom logo':'logo'" >
               <img src="../../assets/images/logo.jpg" />
                <!-- 标签后台系统 -->
            </div>
            
            <Menu :menuData="leftMenuData" :theme="theme"/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0;position: relative;border-bottom: 1px solid #f1f1f1;">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                <div class="user-menu">
                   
                </div>

            </a-layout-header>
            <a-layout-content>
                <div class="main-breadcrumb">

                        <a-breadcrumb v-if="!isCustom" class="mb10">
                            <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
                                <span v-if="!item.path">
                                {{ $t(`menu.${item.name}`) }}
                                
                                </span>
                                <router-link v-else :to="item.path">
                                    {{ $t(`menu.${item.name}`) }}
                                </router-link>
                            </a-breadcrumb-item>
                        </a-breadcrumb>
                   
                    
                    <main class="content">
                         <router-view></router-view>
                    </main>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    </div>
</template>
<script>
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        DownOutlined,
        HomeFilled,
        SlackCircleFilled,
        FileAddFilled
    } from '@ant-design/icons-vue';
    import { defineComponent, ref, computed, reactive, toRefs, h } from 'vue';
    import { useRoute } from 'vue-router';
    import Menu from './component/Menu.vue';

    export default defineComponent({
        components: {
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            MenuUnfoldOutlined,
            MenuFoldOutlined,
            DownOutlined,
            HomeFilled,
            SlackCircleFilled,
            FileAddFilled,
            Menu
        },

        setup() {
            const router = useRoute();
            const state = reactive({
                theme: 'light'
            });
            let breadcrumbList = computed(() => {
                let matched = router.matched.filter(item => item.name)
                return matched
            })

            let isCustom = computed(() => {
                let matched = router.name == 'addPromotion' || router.name == 'addCustomer' || router.name == 'addLocation' || router.name == 'addItem'
                return matched
            })

            const changeTheme = (checked) => {
                state.theme = checked ? 'dark' : 'light';
            };

            return {
                selectedKeys: ref(['1']),
                collapsed: ref(false),
                breadcrumbList,
                changeTheme,
                ...toRefs(state),
                isCustom,
                leftMenuData: ref([
                    {
                        label: 'home',
                        icon: () => h(HomeFilled),
                        link: '/home'
                    },
                    {
                        label: 'segment',
                        icon: () => h(FileAddFilled),
                        children: [
                            { label: 'customer', link: '/segment/customer' },
                            { label: 'item', link: '/segment/item' },
                            { label: 'location', link: '/segment/location' },
                        ],
                    },
                    {
                        label: 'promotion',
                        icon: () => h(SlackCircleFilled),
                        link: '/promotion'
                    },
                ])
            };
        },
    });
</script>
<style>
   .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    }
    .layout .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .layout .trigger:hover {
        color: #1890ff;
    }

    .layout .logo {
        height: 64px;
        /*background: rgba(0, 0, 0, 0.3);*/
        /* padding: 16px; */
        /* margin-left: 0px; */
        font-size: 16px;
        font-weight: bold;
        line-height: 64px;
       
        text-align: center;
    }
    .layout .logo img{
        width: 160px;
    }
   .layout .borderbottom{
        border-bottom: 1px solid #f1f1f1;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }
   .content {
       overflow-y: auto;
       height: calc(100vh - 100px);
   }
   .main-breadcrumb{
       padding: 10px;
   }
    .user-menu{
        position: absolute;
        right: 100px;
        top: 0px;
    }
    .header-theme{
        margin-left: 10px;
    }
    .mb10{
        margin-bottom: 10px;
    }
</style>
