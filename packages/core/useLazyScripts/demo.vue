<script lang="ts" setup>
import { useLazyScripts } from './index'
const { load, unload } = useLazyScripts([
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/vue-router@4'
])
load.then(() => {
    console.log('js加载完成')
})
</script>
<template></template>
