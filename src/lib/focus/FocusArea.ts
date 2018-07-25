import React, { ReactElement } from 'react'

import { IFocusAreaState, IFocusAreaProps, focusTokenProperty } from './interfaces'
import AutoControlledComponent from '../AutoControlledComponent'
import SetFocusableChild from '../../components/actions/SetFocusableChild'

export default class FocusArea<
  P extends IFocusAreaProps,
  S extends IFocusAreaState
> extends AutoControlledComponent<P, S> {
  protected childrenCount: number

  constructor(p, s) {
    super(p, s)
    this.registerActionHandler(
      SetFocusableChild.handler(params =>
        SetFocusableChild.updateState(params, this.childrenCount, this.setState.bind(this)),
      ),
    )
  }

  protected getFocusItemProps(index: number) {
    const { focusableIndex } = this.state

    return {
      focusable: focusableIndex === index,
      [focusTokenProperty]: focusableIndex === index && this.state[focusTokenProperty],
    }
  }

  protected renderFocusItems(children) {
    // TODO: is there a better way than to clone children?
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child as ReactElement<any>, {
        index,
        focusable: this.state.focusableIndex === index,
        [focusTokenProperty]: this.state.focusableIndex === index && this.state[focusTokenProperty],
      })
    })
  }
}
