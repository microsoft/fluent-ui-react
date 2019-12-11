/* tslint:disable */

function withMemoryId<T>(target: T): T {
  let Prototype: Function // eslint-disable-line
  eval(`Prototype = function FluentMemoryRecord () {}`) // eslint-disable-line

  // @ts-ignore
  return Object.setPrototypeOf(target, new Prototype())
}

export default withMemoryId
