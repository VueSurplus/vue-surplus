
# useEmitProp

获取 props 中指定 key 值，并且通过 emit 修改 props 值，默认实现 v-model

## 使用

### v-model

```html
<!-- sub component -->
<!-- sub.vue -->
<script lang="ts" setup>
import { useEmitProp } from 'vue-surplus';
const props = defineProps<{ modelValue: string }>()
const modelValue = useEmitProp()
</script>
<template>
    <input v-model="modelValue"/>
</template>
```

```html
<!-- component -->
<script lang="ts" setup>
import { sub } from 'sub.vue';
const count = ref(0)
</script>
<template>
    <sub v-model="modelValue"></sub>
    <div> count: {{ count }}</div>
</template>
```

<script setup>
    import demoVmodel from './demo/index.vue'
    import demoProps from './demo/demo.vue'
</script>

<demo-vmodel></demo-vmodel>

### props

<demo-props></demo-props>