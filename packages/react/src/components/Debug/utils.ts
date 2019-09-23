import * as _ from 'lodash'

export const includes = (s, target) => _.toLower(s).indexOf(_.toLower(target)) !== -1

export const find = (data, key, search) => {
  const value = data[key]
  return (
    search !== '' &&
    (includes(key, search) ||
      (typeof value !== 'object' && !_.isNil(value) && includes(value, search)))
  )
}

export const isOverridden = (data, key, overrides) => {
  return (
    typeof data[key] !== 'object' &&
    !!overrides &&
    overrides[key] !== null &&
    overrides[key] !== undefined
  )
}

const filterR = (search, data) => {
  let result = false

  Object.keys(data).forEach(key => {
    const value = data[key]

    if (find(data, key, search)) {
      result = true
    }

    // If the value is object invoke again
    if (typeof value === 'object' && filterR(search, value)) {
      result = true
    }
  })

  return result
}

export const filter = (data, value) => {
  return Object.keys(data)
    .filter(key => {
      if (find(data, key, value)) {
        return true
      }

      // if the value is object invoke again
      if (typeof data[key] === 'object' && data[key] !== null) {
        return filterR(value, data[key])
      }

      return false
    })
    .reduce((obj, key) => {
      obj[key] = data[key]
      return obj
    }, {})
}

export const getValues = (value, predicate) => {
  if (_.isNil(value)) {
    return []
  }

  if (typeof value === 'string') {
    if (predicate(value)) {
      return [value]
    }
  }

  if (typeof value === 'object') {
    let arr = []
    Object.keys(value).forEach(key => {
      arr = _.concat(arr, getValues(value[key], predicate))
    })
    return arr
  }

  return []
}

export const removeNulls = o => {
  if (typeof o !== 'object' && o !== null) {
    return o
  }
  const result = {}

  Object.keys(o).forEach(k => {
    if (!o[k] || typeof o[k] !== 'object') {
      if (o[k]) {
        result[k] = o[k] // If not null or not an object, copy value
      }
    }

    // The property is an object
    const val = removeNulls(o[k])

    if (typeof val === 'object' && val != null && Object.keys(val).length > 0) {
      result[k] = val
    }
  })

  return result
}
