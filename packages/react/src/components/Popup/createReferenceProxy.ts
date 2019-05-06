import * as _ from 'lodash'
import * as React from 'react'

class ReferenceProxy {
  ref: React.RefObject<HTMLElement>

  constructor(refObject) {
    this.ref = refObject
  }

  getBoundingClientRect() {
    return _.invoke(this.ref.current, 'getBoundingClientRect', {})
  }

  get clientWidth() {
    return this.getBoundingClientRect().width
  }

  get clientHeight() {
    return this.getBoundingClientRect().height
  }
}

/**
 * Popper.js does not support ref objects from `createRef()` as referenceElement. If we will pass
 * directly `ref`, `ref.current` will be `null` at the render process. We use memoize to keep the
 * same reference between renders.
 *
 * @see https://popper.js.org/popper-documentation.html#referenceObject
 */
const createReferenceProxy = _.memoize(
  reference =>
    new ReferenceProxy(
      // TODO: use toRefObject from Stardust
      // https://github.com/stardust-ui/react/issues/998
      reference.hasOwnProperty('current') ? reference : { current: reference },
    ),
)

export default createReferenceProxy
