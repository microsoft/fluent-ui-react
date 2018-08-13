import * as React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'
import eventStack from './eventStack'
import {
  AccessibilityEventHandlers,
  IAccessibilityDefinition,
  IActionHandler,
  AccessibilityActionsDefinition,
  IEventHandlers,
} from './accessibility/interfaces'

import keyboardHandlerFilter from './accessibility/Helpers/keyboardHandlerFilter'
import { actions } from './accessibility/Actions/AccessibilityActions'

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any
  protected accessibilityActions: AccessibilityActionsDefinition = actions
  protected currentAccessibility: IAccessibilityDefinition
  protected elementRef: HTMLElement
  protected accEventHandlers: IEventHandlers[] = []

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

  setAccessibility = acc => (this.currentAccessibility = acc)
  setElementRef = ref => (this.elementRef = ref)

  attachKeyboardEventHandlers() {
    if (this.accEventHandlers.length) {
      const handlers: AccessibilityEventHandlers[] = [].concat(this.accEventHandlers)

      handlers.forEach(eventHandler => {
        eventStack.sub('keydown', eventHandler.handlers, { target: eventHandler.target })
      })
    } else {
      this.getAndAttachEventHandlers()
    }
  }

  detachKeyboardEventHandlers() {
    if (this.accEventHandlers.length) {
      const handlers: AccessibilityEventHandlers[] = [].concat(this.accEventHandlers)
      handlers.forEach(eventHandler => {
        eventStack.unsub('keydown', eventHandler.handlers, { target: eventHandler.target })
      })
    }
  }

  getAndAttachEventHandlers() {
    for (const action in this.accessibilityActions) {
      const actionHandler: IActionHandler = this.currentAccessibility.actionsDefinition[action]

      if (!actionHandler) continue

      const eventHandler: Function = keyboardHandlerFilter(
        this.accessibilityActions[action],
        actionHandler.keyCombinations,
      )

      const accEventHandler = this.accEventHandlers.filter(itm => {
        return itm.target === this.elementRef
      })[0]

      if (accEventHandler) {
        accEventHandler.handlers.push(eventHandler)
      } else {
        this.accEventHandlers.push({
          handlers: [eventHandler],
          target: this.elementRef,
        })
      }
    }

    if (this.accEventHandlers.length) {
      this.attachKeyboardEventHandlers()
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
