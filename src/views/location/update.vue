<template>
       <Update />
</template>

<script>
    import { defineComponent, provide } from 'vue';
    import Update from '../components/segment/update.vue';
    export default defineComponent({
         components: { Update },
          setup() {
            provide('segmentType', 'location'); 
          }
    });

</script>
<style>

</style>