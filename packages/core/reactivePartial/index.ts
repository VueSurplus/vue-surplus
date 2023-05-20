export function reactivePartial(object: any, sources: any, rule: 'left' | 'right') {
    if (rule === 'left') {
        Object.keys(object).forEach((key) => {
            object[key] = sources[key]
        })
    } else {
        Object.keys(sources).forEach((key) => {
            if (object[key] === undefined) {
                object[key] = sources[key]
            }
        })
    }
}