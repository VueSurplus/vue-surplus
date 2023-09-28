import { computed, ref } from "vue";
import { useCreateStore } from "../index";

export const useCounterStore = useCreateStore(() => {
  const counter = ref(0);
  return { counter };
});

export const useCountStore = useCreateStore(() => {
  // state
  const count = ref(0);

  // getters
  const doubleCount = computed(() => count.value * 2);

  // actions
  function increment() {
    count.value++;
  }
  return { count, doubleCount, increment };
});
