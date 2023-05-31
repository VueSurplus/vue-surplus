<script lang="ts" setup>
import { ref } from 'vue';
import demo from './demo.vue'
const count = ref(0)
const name = ref('')
</script>
<template>
    <demo v-model:count="count" v-model:name="name"></demo>
    <p>count: {{ count }}</p>
    <p>name: {{ name }}</p>
</template>