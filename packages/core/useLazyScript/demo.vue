<script lang="ts" setup>
import { useLazyScript } from './index'
const { load, unload } = useLazyScript('https://unpkg.com/vue@3/dist/vue.global.js')
load.then(()=>{
    console.log('js加载完成')
})
</script>
<template></template>
