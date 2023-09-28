import { effectScope } from "vue";

export function useCreateStore<Fn extends (...args: any[]) => any>(
  fn: Fn
): any {
  const fnCode = fn.toString();
  let initialized = false;
  let store: any;
  if (fnCode.includes("watch(") || fnCode.includes("computed(")) {
    const scope = effectScope(true);
    return () => {
      if (!initialized) {
        store = scope.run(() => fn())!;
        initialized = true;
      }
      return store;
    };
  } else {
    return () => {
      if (!initialized) {
        store = fn();
        initialized = true;
      }
      return store;
    };
  }
}
