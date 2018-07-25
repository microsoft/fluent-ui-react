import React from 'react'
import PropTypes from 'prop-types'

import { IFocusableProps, focusTokenProperty } from './interfaces'
import FocusGrab from './FocusGrab'
import UIComponent from '../UIComponent'

export default abstract class FocusItem<P extends IFocusableProps, S> extends UIComponent<P, S> {
  static propTypes = {
    /** A menu item can be focusable. */
    focusable: PropTypes.bool,
  }

  static handledProps = ['focusable']

  private focusableElementRef: HTMLElement

  protected getFocusableElementRef: () => HTMLElement = () => this.focusableElementRef
  protected setFocusableElementRef: (element: HTMLElement) => void = element =>
    (this.focusableElementRef = element)

  protected focusWithin(): void {
    FocusGrab.focusWithin(this.getFocusableElementRef())
  }

  componentDidUpdate() {
    if (
      this.focusableElementRef &&
      FocusGrab.tokenShouldGrabFocus(this.props[focusTokenProperty])
    ) {
      this.focusableElementRef.focus()
    }
  }

  componentDidMount() {
    if (FocusGrab.elementShouldGrabFocus(this.focusableElementRef)) {
      this.focusableElementRef.focus()
    }
  }
}
