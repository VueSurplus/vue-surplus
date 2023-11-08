function throttleFn<T extends (...args: any[]) => any>(ms?: number) {
  let lastExe = 0;
  let isLock = false;
  let lastValue: any;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return function (fn: T, trailing: boolean, leading: boolean) {
    const elapsed = Date.now() - lastExe;
    clear();
    if (typeof ms === "number" && elapsed >= ms && leading) {
      lastExe = Date.now();
      lastValue = fn();
    } else if (typeof ms === "number" && trailing && elapsed < ms) {
      lastValue = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          lastExe = Date.now();
          resolve(fn());
          clear();
        }, ms - elapsed);
      });
    }
    if (typeof ms === "undefined" && !isLock) {
      lastValue = fn(() => {
        isLock = false;
      });
      isLock = true;
    }
    return lastValue;
  };
}

export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  ms?: number,
  trailing = true,
  leading = true
) {
  return throttleFn<T>(ms)(fn, trailing, leading);
}
