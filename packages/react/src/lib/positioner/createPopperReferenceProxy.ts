import { isRefObject, toRefObject } from '@stardust-ui/react-component-ref'
import * as _ from 'lodash'
import * as React from 'react'
import * as PopperJS from 'popper.js'

class ReferenceProxy implements PopperJS.ReferenceObject {
  constructor(private ref: React.RefObject<HTMLElement>) {}

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
 * directly `ref`, `ref.current` will be `null` at the render process.
 *
 * @see https://popper.js.org/popper-documentation.html#referenceObject
 * @see https://github.com/FezVrasta/react-popper/blob/v1.3.3/src/Popper.js#L166
 */
const createPopperReferenceProxy = (reference: HTMLElement | React.RefObject<HTMLElement>) => {
  const referenceRef = isRefObject(reference) ? reference : toRefObject(reference)

  return new ReferenceProxy(referenceRef)
}

export default createPopperReferenceProxy
