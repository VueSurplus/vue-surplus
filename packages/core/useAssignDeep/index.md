# useAssignDeep

深合并对象，类似object.assgin。

## 使用

```js
import { useAssignDeep } from 'vue-surplus';
const state = {
    name: 'qwee',
    type: ['string', { text: 'boolean', default: false }],
    data: { count: 1 }
}
const assignState = useAssignDeep<{ name: string, type?: any }>(
    state,
    { name: 'assign' },
    { name: 'more', type: ['number'] })
console.log(JSON.stringify(assignState)) 
// {"name":"more","type":["number",{"text":"boolean","default":false}],"data":{"count":1}}
```
