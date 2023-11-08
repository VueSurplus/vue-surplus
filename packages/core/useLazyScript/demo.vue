<script lang="ts" setup>
import { useLazyScript } from './index'
const load = useLazyScript('https://unpkg.com/vue@3/dist/vue.global.js')
load.then(() => {
    console.log('js加载完成')
})

const loads = useLazyScript([
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/vue-router@4'
])

loads.then(() => {
    console.log('js加载完成')
})
</script>
<template>
    <div>1212</div>
</template>
