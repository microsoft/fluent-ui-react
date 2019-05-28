import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// import { findDOMNode } from 'react-dom'

import {
  commonPropTypes,
  ContentComponentProps,
  isBrowser,
  UIComponent,
  UIComponentProps,
} from '../../lib'
import { RenderResultConfig } from '../../lib/renderComponent'
import { Accessibility } from '../../lib/accessibility/types'
import { ShorthandValue, WithAsProp } from '../../types'
import AppLayoutArea, { AppLayoutAreaProps } from './AppLayoutArea'
import createComponent from '../../lib/createComponent'

if (isBrowser()) {
  ;(window as any).React1 = require('react')
}

export interface AppSlotClassNames {
  content: string
}

export interface AppLayoutProps extends UIComponentProps, ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default AppBehavior
   * @available AppWarningBehavior
   */
  accessibility?: Accessibility

  debug?: boolean
  gap?: string
  mode?: string
  renderActiveOnly?: boolean
  slots?: {
    [key: string]: AppLayoutAreaProps
    header?: AppLayoutAreaProps
    nav?: AppLayoutAreaProps
    full?: AppLayoutAreaProps
    tile?: AppLayoutAreaProps
    start?: AppLayoutAreaProps
    content?: AppLayoutAreaProps
    end?: AppLayoutAreaProps
  }
  template?: string
}

const getSlotOrder = template =>
  template
    .split('\n')
    .filter(s => s.includes('"') && s.trim())
    .map(s => s.match(/"(.*)"/)[1])
    .join(' ')
    .split(/ +/)
    .reduce((acc: string[], next: string) => {
      if (acc.indexOf(next) === -1) acc.push(next)
      return acc
    }, [])

/**
 * A app layout contains and arranges the high level areas of an application.
 */
class AppLayoutClass extends UIComponent<WithAsProp<AppLayoutProps>> {
  static displayName = 'AppLayout'
  static className = 'ui-app-layout'

  static defaultProps = {
    renderActiveOnly: true,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    debug: PropTypes.bool,
    gap: PropTypes.string,
    renderActiveOnly: PropTypes.bool,
    slots: PropTypes.objectOf(
      PropTypes.shape({
        styles: PropTypes.object,
        content: PropTypes.node,
      }),
    ),
    template: PropTypes.string,
  }

  // getUnusedSlots = () => {
  //   const { slots, template } = this.props
  //
  //   return Object.keys(slots).filter(name => {
  //     return new RegExp(`/\W${_.escapeRegExp(name)}\W/`).test(template)
  //   })
  // }

  renderComponent(config: RenderResultConfig<AppLayoutProps>) {
    const { classes, ElementType, unhandledProps } = config
    const { debug, slots, template } = this.props

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {getSlotOrder(template).map(k => {
          const v = slots[k]

          return (
            <AppLayoutArea
              debug={debug}
              key={k}
              area={k}
              className={`${AppLayoutArea.className}-${k}`}
              {...v}
            />
          )
        })}
        {/*{!renderActiveOnly && this.getUnusedSlots.map()}*/}
      </ElementType>
    )
  }
}

export default AppLayout
