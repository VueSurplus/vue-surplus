<script lang="ts" setup>
import { ref } from 'vue';
import vmodel from './vmodel.vue';
const count = ref(0)
</script>
<template>
    <vmodel v-model="count"></vmodel>
    <div> count: {{ count }}</div>
</template>