import { expect, it, describe } from 'vitest'
import { useCloneDeep } from './index'

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
        var a = {...state,b: b}
        b.a = a
        const stateCloned = useCloneDeep(a)
        expect(stateCloned.data == state.data).toBe(false)
        expect(stateCloned.text).toBe(state.text)
        expect(stateCloned.data.count).toBe(state.data.count)
        expect(stateCloned == state).toBe(false)
    })
})