<script setup>
import { useCounterStore, useCountStore } from "./store";
const { counter } = useCounterStore();
const { count, doubleCount, increment } = useCountStore();
</script>
<template>
  <div>counter:{{ counter }}</div>
  <div>count:{{ count }}</div>
  <div>doubleCount:{{ doubleCount }}</div>
  <button @click="increment">increment</button>
</template>