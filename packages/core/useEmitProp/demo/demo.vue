<script lang="ts" setup>
import { ref } from 'vue';
import props from './props.vue'
const count = ref(0)
</script>
<template>
    <props v-model:count="count"></props>
    <div>count:{{ count }}</div>
</template>