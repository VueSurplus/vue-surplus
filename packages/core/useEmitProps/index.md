# useEmitProps

批量处理props的更新。

## 使用

```html
<script lang="ts" setup>
import { useEmitProps } from '../index';
const props = defineProps<{ count: number, name: string }>()
const count = useEmitProps(['count', 'name'])
</script>
<template>
    <div>
        count: <input v-model="count" />
    </div>
    <div>
        name:<input v-model="name" />
    </div>
</template>
```
<demoEmitProps></demoEmitProps>