<script setup>
import { isReactive, isRef, reactive, ref, watch } from 'vue';
import { useCloneDeep } from './index'
const state = {
    count: 0,
    text: 'demo'
}
const stateRef = ref(state)
const stateReactive = reactive(state)
const stateCloned = useCloneDeep(state, true)
const stateRefCloned = useCloneDeep(stateRef)
const stateReactiveCloned = useCloneDeep(stateReactive)
const stateWatchCloned = useCloneDeep(stateReactive, { deep: true, manual: true })
console.log(JSON.stringify(stateWatchCloned))
watch(stateReactive, () => {
    console.log(JSON.stringify(stateWatchCloned))
})
stateReactive.count = 2

</script>
<template>
    <div>state:{{ state }}</div>
    <div>stateCloned:{{ stateCloned }}</div>
    <div>state is stateCloned: {{ state == stateCloned }}</div>
    <div>stateRefCloned:{{ stateRefCloned }}</div>
    <div>stateRefCloned is Ref:{{ isRef(stateRefCloned) }}</div>
    <div>stateReactiveCloned:{{ stateReactiveCloned }}</div>
    <div>stateReactiveCloned is Reactive:{{ isReactive(stateReactiveCloned) }}</div>
</template>