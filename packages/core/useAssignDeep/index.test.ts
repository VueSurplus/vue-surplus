import { expect, it, describe } from 'vitest'
import { useAssignDeep } from '.'

describe('useAssignDeep', () => {
    it('assign', () => {
        const state = {
            name: 'qwee',
            type: ['string', { text: 'boolean', default: false }],
            data: { count: 1 }
        }
        const assignState = useAssignDeep<{ name: string, type?: any, data?: any }>(
            state,
            { name: 'assign' },
            { name: 'more', type: ['number'] })
        expect(assignState === state).toBe(true)
        expect(assignState.name).toBe('more')
        expect(assignState.data.count).toBe(1)

        const assign= useAssignDeep<{ name: string, type?: any, data?: any }>(state)
        expect(assign === state).toBe(true)
    })

})