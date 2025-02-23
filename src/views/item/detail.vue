=<template>
       <Detail />
</template>

<script>
    import { defineComponent, provide } from 'vue';
    import Detail from '../components/segment/detail.vue';
    export default defineComponent({
         components: { Detail },
          setup() {
            provide('segmentType', 'item'); 
          }
    });

</script>
<style>

</style>