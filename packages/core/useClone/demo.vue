<script setup>
import { isReactive, isRef, reactive, ref } from 'vue';
import { useClone } from './index'
const state = {
    count: 0,
    text: 'demo',
    date: new Date()
}
const countRef = ref(0)
const stateRef = ref(state)
const stateReactive = reactive(state)
const stateCloned = useClone(state)
const countCloned = useClone(countRef)
const stateRefCloned = useClone(stateRef)
const stateReactiveCloned = useClone(stateReactive)
</script>
<template>
    <div>state:</div>
    <div>{{ state }}</div>
    <div>stateCloned:</div>
    <div>{{ stateCloned }}</div>
    <div>state is stateCloned: {{ state == stateCloned }}</div>
    <div>countCloned:</div>
    <div>{{ countCloned }}</div>
    <div>stateRefCloned:</div>
    <div>{{ stateRefCloned }}</div>
    <div>stateRefCloned is Ref:{{ isRef(stateRefCloned) }}</div>
    <div>stateReactiveCloned:</div>
    <div>{{ stateReactiveCloned }}</div>
    <div>stateReactiveCloned is reactive:{{ isReactive(stateReactiveCloned) }}</div>
</template>
