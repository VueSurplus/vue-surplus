<script setup>
import { isReactive, isRef, reactive, ref } from 'vue';
import { useClone } from './index'
const state = {
    count: 0,
    text: 'demo'
}
const stateRef = ref(state)
const stateReactive = reactive(state)
const stateCloned = useClone(state)
const stateRefCloned = useClone(stateRef)
const stateReactiveCloned = useClone(stateReactive)
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