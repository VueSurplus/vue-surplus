import { expect, it, describe } from 'vitest'
import { useClone } from './index'
import { isReactive, isRef, reactive, ref, watch } from 'vue'

const state = {
    text: 'demo',
    data: { count: 0 }
}
describe('onLongPress', () => {
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
})