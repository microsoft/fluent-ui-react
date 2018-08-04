const toCompactArray = <T = any>(...values: T[]): T[] => {
  return [].concat(...values).filter(Boolean)
}

export default toCompactArray
