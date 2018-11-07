import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/types'
import { FocusZone } from './accessibility/FocusZone'
import { customPropTypes } from './index'

export const commonPropTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional CSS styles to apply to the component instance.  */
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string

  static propTypes: any

  /** Array of props to exclude from list of handled ones. */
  static unhandledProps: string[] = []

  private static _handledPropsCache: string[] = undefined
  static get handledProps() {
    if (!this._handledPropsCache) {
      this._handledPropsCache = _.difference(_.keys(this.propTypes), this.unhandledProps).sort()
    }

    return this._handledPropsCache
  }

  protected actionHandlers: AccessibilityActionHandlers
  protected focusZone: FocusZone

  constructor(props, context) {
    super(props, context)
    if (process.env.NODE_ENV !== 'production') {
      const child = this.constructor
      const childName = child.name

      if (typeof this.renderComponent !== 'function') {
        throw new Error(`${childName} extending UIComponent is missing a renderComponent() method.`)
      }
    }

    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent(config: RenderResultConfig<P>): React.ReactNode {
    throw new Error('renderComponent is not implemented.')
  }

  render() {
    return renderComponent(
      {
        className: this.childClass.className,
        defaultProps: this.childClass.defaultProps,
        displayName: this.childClass.displayName,
        handledProps: this.childClass.handledProps,
        props: this.props,
        state: this.state,
        actionHandlers: this.actionHandlers,
        focusZoneRef: this.setFocusZoneRef,
      },
      this.renderComponent,
    )
  }

  private setFocusZoneRef = (focusZone: FocusZone): void => {
    this.focusZone = focusZone
  }
}

export default UIComponent
