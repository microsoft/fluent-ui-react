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

export const isOverridden = (data, key, prevData) => {
  return (
    typeof data[key] !== 'object' &&
    prevData &&
    prevData[key] !== null &&
    prevData[key] !== undefined
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
