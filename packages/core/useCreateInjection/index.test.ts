import { defineComponent, h, ref } from "vue";
import { useCreateInjection } from ".";
import { expect, describe, it } from "vitest";
import { mounted } from "../../test/mount";

const [useProvideCount, useinjectCount] = useCreateInjection(
  (initialValue: number) => {
    const count = ref(initialValue);
    return count;
  }
);

const ChildComponent = defineComponent({
  setup() {
    const count = useinjectCount();
    expect(count?.value).toBe(0);

    return () => h("div");
  },
});

const RootComponent = defineComponent({
  setup() {
    useProvideCount(0);

    return () => h(ChildComponent);
  },
});

describe("computedWithControl", () => {
  it("should work", () => {
    mounted(RootComponent);
  });
});
