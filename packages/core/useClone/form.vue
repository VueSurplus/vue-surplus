<!-- <script lang="ts" setup>
import { reactive } from 'vue';
import { useClone } from './index'
const props = defineProps<{
    formData: {
        name: string,
        age: string,
        address: string
    }
}>()
const formData = reactive(useClone(props.formData))
</script>
<template></template> -->
<script lang="ts" setup>
import { ref } from 'vue';
import { useClone } from './vue-surplus'

const len = 1000000;
const arr = new Array(len);
for (let i = 0; i < len; i++) {
    arr[i] = { id: i, name: "test" };
}
const arrRef = ref(arr)
const onClick = () => {
    const list: any[] = []
    const arrClone = useClone(arrRef)
    for (let i = 0; i < 50; i++) list.push({ a: 1 });
    arrClone.unshift(...list)
    arrRef.value = arrClone
}
</script>
<template>
    <div>{{ arr.length }}</div>
    <button @click="onClick">click</button>
</template>