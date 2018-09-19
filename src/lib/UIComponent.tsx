import * as React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/interfaces'
import { IFocusZone } from './accessibility/FocusZone'

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static handledProps: any
  protected actionHandlers: AccessibilityActionHandlers
  protected focusZone: IFocusZone

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
    this.setFocusZoneRef = this.setFocusZoneRef.bind(this)
  }

  renderComponent(config: IRenderResultConfig<P>): React.ReactNode {
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

  private setFocusZoneRef(focusZone: IFocusZone) {
    this.focusZone = focusZone
  }
}

export default UIComponent
