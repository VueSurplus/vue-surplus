<script lang="ts" setup>
import { useLazyLink } from './index'
const { load, unload } = useLazyLink('https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css')
load.then(()=>{
    console.log('css加载完成')
})
</script>
<template></template>