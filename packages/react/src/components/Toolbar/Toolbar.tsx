import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility
}

class Toolbar extends UIComponent<WithAsProp<ToolbarProps>, any> {
  static create: Function

  static className = 'ui-text'

  static displayName = 'Toolbar'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    as: 'span',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' })

/**
 * A Toolbar component groups actions.
 * @accessibility
 * TODO
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps, 'span'>(Toolbar)
