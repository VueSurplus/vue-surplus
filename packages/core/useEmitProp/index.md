
# useEmitProp

获取 props 中指定 key 值，并且通过 emit 修改 props 值，默认实现 v-model

## 使用

### v-model

```html
<!-- sub component -->
<!-- sub.vue -->
<script lang="ts" setup>
import { useEmitProp } from 'vue-surplus';
const props = defineProps<{ value: string }>()
const modelValue = useEmitProp(props)
</script>
<template>
    <input v-model="modelValue" />
</template>
```

```html
<!-- component -->
<script lang="ts" setup>
import { sub } from 'sub.vue';
const data=ref('')
</script>
<template>
    <sub v-model="modelValue"></sub>
</template>
```

### props


## 使用场景
