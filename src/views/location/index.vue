<template>
       <List />
</template>

<script>
    import { defineComponent, provide } from 'vue';
    import List from '../components/segment/list.vue';
    export default defineComponent({
         components: { List },
          setup() {
            provide('segmentType', 'location'); 
          }
    });

</script>
<style>

</style>
