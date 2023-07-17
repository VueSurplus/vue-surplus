import { expect, it, describe } from 'vitest'
import { useCloneDeep } from './index'
import { isReactive, reactive, watch } from 'vue'

const state = {
    text: 'demo',
    data: { count: 0 }
}
describe('useCloneDeep', () => {
    it('use structedClone', () => {
        const stateCloned = useCloneDeep(state)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == state).toBe(false)
    })
    it('use cloneDeep', () => {
        const state = { text: 'demo', data: { count: 0 }, callback: () => { } }
        const stateCloned = useCloneDeep(state)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == state).toBe(false)
    })
    it('use JSON', () => {
        structuredClone = undefined
        const stateCloned = useCloneDeep(state)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == state).toBe(false)
    })
    it('circular reference', () => {
        var b = {}
        var a = { ...state, b: b }
        b.a = a
        const stateCloned = useCloneDeep(a)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == a).toBe(false)
    })
    it('clone array', () => {
        var b = {}
        var a = { state: [state], b: b }
        b.a = a
        const stateCloned = useCloneDeep(a)
        expect(stateCloned == a).toBe(false)
    })

    it('reactive is true', () => {
        const stateReactive = reactive(state)
        const stateWatchCloned = useCloneDeep(stateReactive, { reactive: true })
        expect(isReactive(stateWatchCloned)).toBe(false)
        watch(stateReactive, () => {
            expect(stateWatchCloned.text).toBe(stateReactive.text)
        })
        stateReactive.text = 'reactive is true'
    })

    it('customize clone', () => {
        const stateCloned = useCloneDeep(state, { clone: (source) => ({ name: 'useCloneDeep' }) })
        expect(stateCloned.name).toBe('useCloneDeep')
        expect(stateCloned == state).toBe(false)
    })
})