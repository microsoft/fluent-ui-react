import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { getNextElement, focusAsync } from './focusUtilities'

import { AutoFocusZoneProps } from './AutoFocusZone.types'
import getUnhandledProps from '../../getUnhandledProps'
import getElementType from '../../getElementType'
import * as customPropTypes from '../../customPropTypes'

/** AutoFocusZone is used to focus the first element inside it's children */
export class AutoFocusZone extends React.Component<AutoFocusZoneProps, {}> {
  private _root: { current: HTMLElement | null } = { current: null }
  private _previouslyFocusedElementOutsideTrapZone: HTMLElement
  private _previouslyFocusedElementInTrapZone?: HTMLElement

  private createRef = elem => (this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement)

  static propTypes = {
    as: customPropTypes.as,
    className: PropTypes.string,
    ariaLabelledBy: PropTypes.string,
    firstFocusableSelector: PropTypes.string,
    disableFirstFocus: PropTypes.bool,
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
  }

  static defaultProps: AutoFocusZoneProps = {
    as: 'div',
  }

  public componentDidMount(): void {
    const { disableFirstFocus = false } = this.props

    if (
      !this._root.current.contains(this._previouslyFocusedElementOutsideTrapZone) &&
      !disableFirstFocus
    ) {
      this._findElementAndFocusAsync()
    }
  }

  public render(): JSX.Element {
    const { className, ariaLabelledBy } = this.props
    const unhandledProps = getUnhandledProps(
      { handledProps: [..._.keys(AutoFocusZone.propTypes)] },
      this.props,
    )
    // TODO: Remove `as` there after the issue will be resolved:
    // https://github.com/Microsoft/TypeScript/issues/28768
    const ElementType = getElementType(
      { defaultProps: AutoFocusZone.defaultProps },
      this.props,
    ) as React.ComponentClass<AutoFocusZoneProps>

    return (
      <ElementType
        {...unhandledProps}
        className={className}
        ref={this.createRef}
        aria-labelledby={ariaLabelledBy}
        onFocusCapture={this._onFocusCapture}
      >
        {this.props.children}
      </ElementType>
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

    const focusSelector =
      firstFocusableSelector &&
      (typeof firstFocusableSelector === 'string'
        ? firstFocusableSelector
        : firstFocusableSelector())

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
