import React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import { IAccessibilityBehavior } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility/Behaviors/behaviors'
import { ActionHandler } from '../lib/actions/Action'
import { A11yBehaviorFactory } from './accessibility/A11yBehaviorFactory'

abstract class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any

  public accBehavior: IAccessibilityBehavior<P, S>
  private actionHandlers: { [name: string]: (params: any) => void }

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
    this.accBehavior = A11yBehaviorFactory.createBehavior()
  }

  // state machine should be used instead, for now allow simple actions on components
  registerActionHandler<A>(handler: ActionHandler<A>) {
    this.actionHandlers = this.actionHandlers || {}
    this.actionHandlers[handler.name] = handler.call
  }

  executeAction<A>(args: { name: string; params: A }): void {
    if (this.actionHandlers && this.actionHandlers[args.name]) {
      this.actionHandlers[args.name](args.params)
    }
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
