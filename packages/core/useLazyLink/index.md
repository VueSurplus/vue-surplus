# useLazyLink

异步懒加载添加link。

## 使用

```javascript
import { useLazyLink } from './index'
const { load, unload } = useLazyLink('https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css')
load.then(()=>{
    console.log('css加载完成')
})

```
