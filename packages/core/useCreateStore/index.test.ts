import { expect, it, describe } from "vitest";
import { useCreateStore } from "./index";
import { computed, ref } from "vue";
import { useSetup } from "../../test/mount";

describe("useCreareStore", () => {
  it("should work after dispose", () => {
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

    const useCounterStore = useCreateStore(() => {
      const counter = ref(1);

      return { counter };
    });

    const { count, doubleCount, increment } = useCountStore();
    const { counter } = useCounterStore();

    const vm = useSetup(() => {
      const { count, doubleCount } = useCountStore();
      const { counter } = useCounterStore();

      expect(count.value).toBe(1);
      expect(doubleCount.value).toBe(2);

      expect(counter.value).toBe(1);

      return { count, doubleCount };
    });

    increment();
    expect(count.value).toBe(2);
    expect(doubleCount.value).toBe(4);

    counter.value = 2;
    expect(counter.value).toBe(2);

    vm.unmounted();

    increment();
    expect(count.value).toBe(3);
    expect(doubleCount.value).toBe(6);

    counter.value = 3;
    expect(counter.value).toBe(3);
  });
});
