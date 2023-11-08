import { useScriptQueue } from "../queue/scriptQueue";

export interface LazyScriptOptions {
  type?: string;
  async?: boolean;
  crossorigin?: string;
  defer?: boolean;
  attrs?: Record<string, string>;
}

function loadScript(
  src: string,
  options: LazyScriptOptions = {}
): Promise<() => void> {
  const {
    type = "text/javascript",
    async,
    crossorigin,
    defer,
    attrs = {},
  } = options;
  let el = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  const {
    useDispatchScriptReject,
    useAddScriptResolve,
    useDispatchScriptResolve,
    useAddScriptReject,
  } = useScriptQueue(src);

  const unload = () => {
    const el = document.querySelector<HTMLLinkElement>(`link[href="${src}"]`);
    if (el) document.head.removeChild(el);
  };

  if (!el) {
    el = document.createElement("script");
    el.src = src;
    async && (el.async = async);
    crossorigin && (el.crossOrigin = crossorigin);
    defer && (el.defer = defer);
    el.type = type;
    Object.keys(attrs!).forEach((attr) => el?.setAttribute(attr, attrs![attr]));
    el.addEventListener("error", (event) => useDispatchScriptReject(event));
    el.addEventListener("abort", (event) => useDispatchScriptReject(event));
    el.addEventListener("load", () => {
      el!.setAttribute("data-load", "true");
      useDispatchScriptResolve(unload);
    });
    el = document.head.appendChild(el);
  } else if (el.hasAttribute("data-load")) {
    useDispatchScriptResolve(unload);
  }
  const load = new Promise<() => void>((resolve, reject) => {
    useAddScriptResolve(resolve);
    useAddScriptReject(reject);
  });
  return load;
}

export function useLazyScript(
  src: string | string[],
  options: LazyScriptOptions = {}
): Promise<() => void> | Promise<(() => void)[]> {
  if (Array.isArray(src)) {
    const loads: Promise<() => void>[] = [];
    src.forEach((item) => {
      const load = loadScript(item, options);
      loads.push(load);
    });
    return Promise.all(loads);
  }
  return loadScript(src, options);
}
