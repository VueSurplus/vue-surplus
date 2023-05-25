<script lang="ts" setup>
import { useAssignDeep } from '.';
const state = {
    name: 'qwee',
    type: ['string', { text: 'boolean', default: false }],
    data: { count: 1 }
}
const assignState = useAssignDeep<{ name: string, type?: any }>(
    state,
    { name: 'assign' },
    { name: 'more', type: ['number'] })
console.log(JSON.stringify(assignState)) 
// {"name":"more","type":["number",{"text":"boolean","default":false}],"data":{"count":1}}
</script>
<template></template>