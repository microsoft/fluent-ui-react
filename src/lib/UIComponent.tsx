import * as React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import eventStack from './eventStack'
import {
  AccessibilityEventHandlers,
  IAccessibilityDefinition,
  IActionHandler,
} from './accessibility/interfaces'

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any
  protected actions: any
  protected currentAccessibility: IAccessibilityDefinition
  protected elementRef: HTMLElement
  protected accEventHandlers: AccessibilityEventHandlers[] = []

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

  renderComponent(config: IRenderResultConfig<P>): React.ReactNode {
    throw new Error('renderComponent is not implemented.')
  }

  attachEventHandler(eventHandlers: AccessibilityEventHandlers | AccessibilityEventHandlers[]) {
    const handlers: AccessibilityEventHandlers[] = [].concat(eventHandlers)

    handlers.forEach(eventHandler => {
      const eventName = Object.keys(eventHandler)[0]
      const handler = eventHandler[eventName]
      eventStack.sub(eventName, handler.handlers, { target: handler.target })
    })
  }

  detachEventHandler(eventHandlers: AccessibilityEventHandlers | AccessibilityEventHandlers[]) {
    const handlers: AccessibilityEventHandlers[] = [].concat(eventHandlers)
    handlers.forEach(eventHandler => {
      eventStack.unsub(eventHandler.name, eventHandler.handlers, { target: eventHandler.target })
    })
  }

  getAndAttachEventHandlers() {
    for (const action in this.actions) {
      const actionHandlers: IActionHandler[] = this.currentAccessibility.actionsDefinition[action]

      actionHandlers.forEach(actionHandler => {
        const eventHandler: Function = actionHandler.eventDecorator
          ? actionHandler.eventDecorator(this.actions[action], actionHandler.keyCodes)
          : this.actions[action]

        const accEventHandler = this.accEventHandlers.filter(itm => {
          return (
            itm[actionHandler.eventName] && itm[actionHandler.eventName].target === this.elementRef
          )
        })[0]

        if (accEventHandler) {
          accEventHandler[actionHandler.eventName].handlers.push(eventHandler)
        } else {
          this.accEventHandlers.push({
            [actionHandler.eventName]: {
              handlers: [eventHandler],
              target: this.elementRef,
            },
          })
        }
      })
    }

    if (this.accEventHandlers.length) {
      this.attachEventHandler(this.accEventHandlers)
    }
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
        rules: this.childClass.rules,
        variables: this.childClass.variables,
      },
      this.renderComponent,
    )
  }
}

export default UIComponent
