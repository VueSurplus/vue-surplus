import { ref } from "vue";
import { useCreateInjection } from "../index";

// 这里初始化声明返回了两个数组方法，一般是用到这两个数组方面，但不能再用到的地方都执行useCreateInjection
// 因此要单独在js中执行useCreateInjection然后再export对象中包含这两个方法，这点可以优化。
// 另一种方式可以在函数中return这两个方法数组
// 优化点二useCreateInjection是返回数组还是对象
const [useProvideCount, useinjectCount] = useCreateInjection(
  (initialValue: number) => {
    const count = ref(initialValue);
    return count;
  }
);

export { useProvideCount, useinjectCount };
