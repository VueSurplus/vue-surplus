export type TypeName='string'|'number'|'object'|'array'|'set'|'map'|'symbol'|'function'|'boolean'|'date'

export function getTypeof<T>(source: T): TypeName {
  let stringTag
  let typeName
  let isReadOnly = false
  const getTypeName = (source) => Object.prototype.toString.call(source).slice(8, -1).toLowerCase()
  try {
    stringTag = source[Symbol.toStringTag]
    source[Symbol.toStringTag] = undefined
  } catch (error) {
    isReadOnly = true
  }
  typeName = getTypeName(source)
  if (!isReadOnly && typeof source === 'object' && source !== null) {
    if (source.hasOwnProperty(Symbol.toStringTag)) {
      source[Symbol.toStringTag] = stringTag
    } else {
      delete source[Symbol.toStringTag]
    }
  }
  return typeName
}
