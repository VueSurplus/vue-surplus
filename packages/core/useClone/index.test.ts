import { expect, it, describe } from 'vitest'
import { useClone } from './index'
import { isReactive, isRef, reactive, ref, watch } from 'vue'

const state = {
    text: 'demo',
    data: { count: 0 }
}
describe('useClone', () => {
    it('deep is true', () => {
        const stateCloned = useClone(state, true)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == state).toBe(false)
        //   expect(result).toBe('1')
    })

    it('state is Ref', () => {
        const stateRef = ref(state)
        const stateRefCloned = useClone(stateRef)
        expect(isRef(stateRefCloned)).toBe(false)
        expect(stateRefCloned.text).toBe(stateRef.value.text)
        expect(stateRefCloned.data == stateRef.value.data).toBe(true)
    })

    it('state is Reactive', () => {
        const stateReactive = reactive(state)
        const stateReactiveCloned = useClone(stateReactive)
        expect(isReactive(stateReactiveCloned)).toBe(false)
        expect(stateReactiveCloned.text).toBe(stateReactive.text)
        expect(stateReactiveCloned.data == stateReactive.data).toBe(true)
    })

    it('manual is true', () => {
        const stateReactive = reactive(state)
        const stateWatchCloned = useClone(stateReactive, { deep: true, manual: true })
        expect(isReactive(stateWatchCloned)).toBe(false)
        watch(stateReactive, () => {
            expect(stateWatchCloned.text).toBe(stateReactive.text)
        })
        stateReactive.text = 'manual'
    })

    it('structed is true',()=>{
        const stateStructed = useClone(state, {deep: true,structed:true})
        expect(stateStructed.data == state.data).toBe(false)
        expect(stateStructed.text).toBe(state.text)
        expect(stateStructed.data.count).toBe(state.data.count)
        expect(stateStructed == state).toBe(false)

        const stateStructeds = useClone(state, {deep: false,structed:true})
        expect(stateStructeds.data == state.data).toBe(true)
        expect(stateStructeds.text).toBe(state.text)
        expect(stateStructeds.data.count).toBe(state.data.count)
        expect(stateStructeds == state).toBe(false)
    })

    it('source is Array',()=>{
        const source={arr:[1,2,3]}
        const stateCloned = useClone(source, true)
        expect(stateCloned.arr == source.arr).toBe(false)
        expect(stateCloned.arr[0]).toBe(source.arr[0])
        expect(stateCloned.arr[1]).toBe(source.arr[1])
        expect(stateCloned.arr[2]).toBe(source.arr[2])
        expect(stateCloned == state).toBe(false)
    })
    
})