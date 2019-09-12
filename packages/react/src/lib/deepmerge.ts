const deepmerge = (...sources) => {
  const inner = (target, source) => {
    Object.keys(source).forEach(k => {
      if (source[k] !== null && typeof source[k] === 'object' && !Array.isArray(source[k])) {
        target[k] = target[k] || {}
        inner(target[k], source[k])
      } else {
        target[k] = source[k]
      }
    })
    return target
  }
  return sources.filter(Boolean).reduce((acc, src) => inner(acc, src), {})
}

export default deepmerge
