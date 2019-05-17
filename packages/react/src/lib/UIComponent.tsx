import * as React from 'react'
import * as _ from 'lodash'
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/reactTypes'
import { Omit } from '@stardust-ui/react'

// TODO @Bugaa92: deprecated by createComponent.tsx
class UIComponent<P, S = {}> extends React.Component<P, S> {
  readonly childClass = this.constructor as typeof UIComponent
  static displayName: string
  static className: string

  static contextType = ThemeContext
  static propTypes: any

  /** Array of props to exclude from list of handled ones. */
  static unhandledProps: string[] = []

  static _handledPropsCache: string[] = undefined
  static get handledProps() {
    if (!this._handledPropsCache) {
      this._handledPropsCache = _.difference(_.keys(this.propTypes), this.unhandledProps).sort()
    }

    return this._handledPropsCache
  }

  actionHandlers: AccessibilityActionHandlers

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

  renderComponent(config: Omit<RenderResultConfig<P>, 'wrap'>): React.ReactNode {
    throw new Error('renderComponent is not implemented.')
  }

  render() {
    const { wrap, ...config } = renderComponent<P>({
      className: this.childClass.className,
      displayName: this.childClass.displayName,
      handledProps: this.childClass.handledProps,
      props: this.props,
      state: this.state,
      actionHandlers: this.actionHandlers,
      context: this.context,
    })

    return wrap(this.renderComponent(config))
  }
}

export default UIComponent
