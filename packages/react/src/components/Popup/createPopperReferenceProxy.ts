import { isRefObject, toRefObject } from '@stardust-ui/react-component-ref'
import * as _ from 'lodash'
import * as React from 'react'
import * as PopperJS from 'popper.js'

class ReferenceProxy implements PopperJS.ReferenceObject {
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
const createPopperReferenceProxy = _.memoize(
  (reference: any) =>
    new ReferenceProxy(isRefObject(reference) ? reference : toRefObject(reference)),
)

export default createPopperReferenceProxy
