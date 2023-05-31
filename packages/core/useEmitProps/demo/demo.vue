<script lang="ts" setup>
import { useEmitProps } from '../index';
const props = defineProps<{ count: number, name: string }>()
const { count, name } = useEmitProps(['count', 'name'])
</script>
<template>
    <div>
        count: <input v-model="count" />
    </div>
    <div>
        name: <input v-model="name" />
    </div>
</template>