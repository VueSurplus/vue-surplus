<script lang="ts" setup>
import { useEmitProp } from '../index';
const props = defineProps<{ count: number }>()
const count = useEmitProp('count')
</script>
<template>
    <input v-model="count" />
</template>