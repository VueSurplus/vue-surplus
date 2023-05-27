<script lang="ts" setup>
import { useEmitProp } from '.';
const props = defineProps<{ value: string }>()
const modelValue = useEmitProp(props)
</script>
<template>
    <input v-model="modelValue"/>
</template>

