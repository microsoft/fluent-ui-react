import React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import { IAccessibilityBehavior } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility/Behaviors/behaviors'

abstract class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any

  public accBehavior: IAccessibilityBehavior<P, S>

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
    this.accBehavior = new DefaultBehavior()
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
        rules: this.childClass.rules,
        variables: this.childClass.variables,
      },
      this.renderComponent,
    )
  }
}

export default UIComponent
