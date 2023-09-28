
# useCreateStore

创建全局状态

## 使用

```js
const useCountStore = useCreateStore(() => {
    // state
    const count = ref(1);

    // getters
    const doubleCount = computed(() => count.value * 2);

    // actions
    function increment() {
    count.value++;
    }
    return { count, doubleCount, increment };
});
```