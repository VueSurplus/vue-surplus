# useLazyScript

异步懒加载JavaScript，通过添加script标签加载JavaScript文件。

## 使用

```JavaScript
import { useLazyScript } from './index'
const { load, unload } = useLazyScript('https://unpkg.com/vue@3/dist/vue.global.js')
load.then(()=>{
    console.log('js加载完成')
})
```
