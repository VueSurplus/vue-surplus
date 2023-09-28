<script setup>
import { ref } from "vue";
import { useCounterStore, useCountStore } from "./store";
import demo from "./demo.vue";
const comShow = ref(true);
const { counter } = useCounterStore();
const { count, doubleCount, increment } = useCountStore();
const counterAdd = () => {
  counter.value++;
  increment();
};
</script>
<template>
  <demo v-if="comShow" />
  <div>
    <button @click="comShow = !comShow">demo {{ comShow }}</button>
  </div>
  <div>
    <button @click="counterAdd">counter click</button>
  </div>
</template>