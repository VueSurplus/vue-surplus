let timer: any = null;
let isSetting = false;

function clear() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function deferredFn<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): Promise<ReturnType<T>> | undefined {
  let lastValue: Promise<ReturnType<T>> | undefined = undefined;
  if (timer) {
    clear();
  } else {
    if (isSetting) {
      lastValue = Promise.resolve(fn());
      isSetting = !isSetting;
    } else {
      lastValue = new Promise((resolve, inject) => {
        timer = setTimeout(() => {
          isSetting = !isSetting;
          clear();
          resolve(fn());
        }, ms);
      });
    }
  }
  return lastValue;
}

/**
 * @description: 延迟执行
 * @param {array} args
 * @return {*}
 */
export function useDeferredFn<T extends (...args: any[]) => any>(
  fn: T,
  ms = 200
): (...args: any[]) => Promise<ReturnType<T>> | undefined {
  return () => deferredFn<T>(fn, ms);
}
