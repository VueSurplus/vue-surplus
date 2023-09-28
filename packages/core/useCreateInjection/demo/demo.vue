<script setup>
import { useinjectCount } from "./injection";
const count = useinjectCount();
</script>
<template>
  <div>
    {{ count }}
  </div>
</template>