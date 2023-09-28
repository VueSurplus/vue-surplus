import { createApp, defineComponent, h } from "vue";

export function mounted<T>(com: T) {
  const el = document.createElement("div");
  const app = createApp(com as any);
  const unmounted = () => app.unmount();
  const comp = app.mount(el) as any;
  comp.unmounted = unmounted;
  return comp;
}

export function useSetup<T>(setup: () => T) {
  const Comp = defineComponent({
    setup,
    render() {
      return h("div", []);
    },
  });
  return mounted(Comp);
}
