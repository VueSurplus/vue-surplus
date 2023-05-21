export function getTypeof(source:any){
    const map = {
        "[object Number]": "number",
        "[object Boolean]": "boolean",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Null]": "null",
        "[object Undefined]": "undefined",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Proxy]":"proxy",
        "[Object Symbol]":"symbol"
      };
      const toString = Object.prototype.toString;
      return map[toString.call(source)];
}
