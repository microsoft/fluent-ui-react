const toCompactArray = (...values: any[]): any[] => {
  return [].concat(...values).filter(Boolean)
}

export default toCompactArray
