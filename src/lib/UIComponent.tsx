import React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import { IAccessibilityBehavior } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility/Behaviors/behaviors'
import { ActionHandler } from '../components/actions/Action'

abstract class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any

  public accBehavior: IAccessibilityBehavior<P, S>
  private actionHandlers: { [name: string]: (params: any) => boolean }

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
    this.accBehavior = new DefaultBehavior<P, S>()
  }

  registerActionHandler<A>(handler: ActionHandler<A>) {
    this.actionHandlers = this.actionHandlers || {}
    this.actionHandlers[handler.name] = handler.call
  }

  executeAction<A>(args: { name: string; params: A }): boolean {
    if (this.actionHandlers && this.actionHandlers[args.name]) {
      return this.actionHandlers[args.name](args.params)
    }
    return false
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
