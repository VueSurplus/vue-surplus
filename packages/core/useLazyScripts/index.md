# useLazyScripts

批量异步懒加载JavaScript，通过添加script标签加载JavaScript文件。

## 使用

 ```javascript
import { useLazyScripts } from './index'
const { load, unload } = useLazyScripts([
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/vue-router@4'
])
load.then(() => {
    console.log('js加载完成')
})
 ```
