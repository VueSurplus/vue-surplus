<script lang="ts" setup>
import { shallowRef } from 'vue';

const modules = import.meta.glob('../../../core/**/demo.vue')
const props = defineProps<{ moduleName: string }>()
const demo = shallowRef(null)
for (const path in modules) {
    if (path.includes(props.moduleName)) {
        modules[path]().then((mod) => {
            demo.value = mod.default
        })
    }
}
</script>
<template>
    <div class="demo-wrapper">
        <component v-if="demo" :is="demo"></component>
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