import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { getNextElement, focusAsync } from './focusUtilities'

import { AutoFocusZoneProps } from './AutoFocusZone.types'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'
import * as customPropTypes from '../../customPropTypes'
import { callable } from '../../index'
import Ref from '../../../components/Ref/Ref'

/** AutoFocusZone is used to focus the first element inside it's children */
export class AutoFocusZone extends React.Component<AutoFocusZoneProps, {}> {
  private _root = React.createRef<HTMLElement>()
  private _previouslyFocusedElementInTrapZone?: HTMLElement

  static propTypes = {
    as: customPropTypes.as,
    firstFocusableSelector: PropTypes.string,
    disableFirstFocus: PropTypes.bool,
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
  }

  public componentDidMount(): void {
    const { disableFirstFocus = false } = this.props

    if (!disableFirstFocus) {
      this._findElementAndFocusAsync()
    }
  }

  public render(): JSX.Element {
    const unhandledProps = getUnhandledProps(
      { handledProps: [..._.keys(AutoFocusZone.propTypes)] },
      this.props,
    )
    // TODO: Remove `as` there after the issue will be resolved:
    // https://github.com/Microsoft/TypeScript/issues/28768
    const ElementType = getElementType({}, this.props) as React.ComponentClass<AutoFocusZoneProps>

    return (
      <Ref innerRef={this._root}>
        <ElementType {...unhandledProps} onFocusCapture={this._onFocusCapture}>
          {this.props.children}
        </ElementType>
      </Ref>
    )
  }

  private _findElementAndFocusAsync = () => {
    if (!this._root.current) return
    const { focusPreviouslyFocusedInnerElement, firstFocusableSelector } = this.props

    if (
      focusPreviouslyFocusedInnerElement &&
      this._previouslyFocusedElementInTrapZone &&
      this._root.current.contains(this._previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      focusAsync(this._previouslyFocusedElementInTrapZone)
      return
    }

    const focusSelector = callable(firstFocusableSelector)()

    const firstFocusableChild = focusSelector
      ? (this._root.current.querySelector(`.${focusSelector}`) as HTMLElement)
      : getNextElement(
          this._root.current,
          this._root.current.firstChild as HTMLElement,
          true,
          false,
          false,
          true,
        )

    firstFocusableChild && focusAsync(firstFocusableChild)
  }

  private _onFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    this.props.onFocusCapture && this.props.onFocusCapture(ev)
    if (ev.target !== ev.currentTarget) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      this._previouslyFocusedElementInTrapZone = ev.target as HTMLElement
    }
  }
}
