# useCreateInjection

创建Inject/Provide

## 使用

```js
const [useProvideCount, useinjectCount] = useCreateInjection(
  (initialValue: number) => {
    const count = ref(initialValue);
    return count;
  }
);

useProvideCount(0);

const count = useinjectCount();
```