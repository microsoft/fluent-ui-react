const mergeEventHanders = (handler1, handler2) => {
  return (...args) => {
    console.warn('HERE')
    handler1(args)
    handler2(args)
  }
}

const mergePropsEventHandlers = (sourceProps, propsToMerge) => {
  if (!sourceProps || !propsToMerge) {
    return null
  }

  const propNamesToMerge = Object.keys(propsToMerge)

  const mergedEventHandlers = Object.keys(sourceProps).reduce((acc, sourcePropName) => {
    if (
      sourcePropName.startsWith('on') &&
      propNamesToMerge.some(propName => propName === sourcePropName)
    ) {
      return {
        ...{
          [sourcePropName]: mergeEventHanders(
            sourceProps[sourcePropName],
            propsToMerge[sourcePropName],
          ),
        },
        ...acc,
      }
    }
    return acc
  }, {})

  // TODO lodash filter props?
  const baseEventHandlers = Object.keys(propsToMerge)
    .filter(propName => propName.startsWith('on'))
    .reduce((acc, propName) => {
      return {
        [propName]: propsToMerge[propName],
        ...acc,
      }
    }, {})

  return { ...baseEventHandlers, ...mergedEventHandlers }
}

export default mergePropsEventHandlers
