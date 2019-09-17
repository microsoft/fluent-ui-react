import * as _ from 'lodash'

export const includes = (s, target) => _.toLower(s).indexOf(_.toLower(target)) !== -1

export const find = (data, key, search) => {
  const value = data[key]
  if (key === 'paddingBottom') {
    console.log('key', key)
    console.log('search', search)
    console.log('value', data[key])
    console.log('includes', includes(value, search))
    console.log(
      'result',
      search !== '' &&
        (includes(key, search) ||
          (typeof value !== 'object' && !_.isNil(value) && includes(value, search))),
    )
  }
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
