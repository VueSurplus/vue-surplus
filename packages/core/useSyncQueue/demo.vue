<script setup>
import { useCreateSyncQueue } from '.'
const useSyncQueue = useCreateSyncQueue()
const [useAddQueue, useDispatch] = useSyncQueue(Symbol('queue'))
useAddQueue(()=>{
    console.log('execute queue function')
})

useDispatch()//execute queue function

</script>
<template>
    <div>count: {{ count }}</div>
    <button @click="() => { count++ }">click</button>
</template>