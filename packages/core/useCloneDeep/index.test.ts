import { expect, it, describe } from 'vitest'
import { useCloneDeep } from './index'
import { isReactive, reactive, watch } from 'vue'

const sourceMap=new Map()
sourceMap.set('map','test')
const state = {
    text: 'demo',
    data: { count: 0 },
    bool:new Boolean(1),
    number:new Number(10),
    set:new Set([1,2,3]),
    map:sourceMap
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
        const newState = { ...state, callback: () => { } }
        const stateCloned = useCloneDeep(newState)
        expect(stateCloned.data == newState.data).toBe(false)
        expect(stateCloned.text).toBe(newState.text)
        expect(stateCloned.data.count).toBe(newState.data.count)
        expect(stateCloned == newState).toBe(false)
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
        const target = [{ state: [state] }]
        const stateCloned = useCloneDeep(target, { original: true })
        expect(stateCloned == target).toBe(false)
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