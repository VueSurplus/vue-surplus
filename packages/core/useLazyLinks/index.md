
# useLazyLinks

批量异步懒加载添加link。

## 使用

```javascript
import { useLazyLinks } from './index'
const { load, unload } = useLazyLinks(['https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css'])
load.then(()=>{
    console.log('css加载完成')
})
```
