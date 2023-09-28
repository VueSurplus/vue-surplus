import {
  inject,
  readonly,
  provide,
  DeepReadonly,
  UnwrapNestedRefs,
} from "vue";
export function useCreateInjection<T extends Object>(
  composable: (args: any) => T,
  key: string | Symbol = Symbol("Injection")
): [
  useProviding: (args) => void,
  useInjected: () => DeepReadonly<UnwrapNestedRefs<T>>
] {
  const useProviding = (args) => {
    const state = composable(args);
    provide(key, state);
  };
  const useInjected = (): DeepReadonly<UnwrapNestedRefs<T>> => {
    return readonly<T>(inject(key)!);
  };
  return [useProviding, useInjected];
}
