<script lang="ts" setup>
import { useEmitProp } from '../index';
const props = defineProps<{ modelValue: number }>()
const modelValue = useEmitProp()
</script>
<template>
    <input v-model="modelValue"/>
</template>

