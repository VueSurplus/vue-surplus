<script lang="ts" setup>
// import demo from '../../../core/useAssignDeep/demo.vue'

// const props = defineProps<{ moduleName: object }>()

import { cloneDeep } from '../../../core/useClone/clone';

console.log(cloneDeep({ a: 1, b: { c: 2, d: { m: 3 } } }))

</script>
<template>
    <div class="demo-wrapper">
        <demo></demo>
        <!-- <component :is="props.moduleName"></component> -->
    </div>
</template>
<style scoped>
.demo-wrapper {
    background-color: rgba(125, 125, 125, .04);
    padding: 25px 25px;
    border-radius: 10px;
    line-height: 2;
}
</style>