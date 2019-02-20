import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ColorComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  customPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps } from '../../types'

export interface DividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** A divider can be fitted, without any space above or below it.  */
  fitted?: boolean

  /** Size multiplier (default 0) * */
  size?: number

  /** A divider can appear more important and draw the user's attention. */
  important?: boolean
}

/**
 * A divider visually segments content into groups.
 */
class Divider extends UIComponent<ReactProps<DividerProps>, any> {
  static displayName = 'Divider'

  static create: Function

  static className = 'ui-divider'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    fitted: PropTypes.bool,
    size: PropTypes.number,
    important: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    size: 0,
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Divider.create = createShorthandFactory(Divider, 'content')

export default Divider

export type DividerPropsWithDefaults = DividerProps & typeof Divider.defaultProps
