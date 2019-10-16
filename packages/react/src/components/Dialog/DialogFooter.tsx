import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ShorthandFactory,
  childrenExist,
} from '../../lib'

import { ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { BoxProps } from '../Box/Box'

export interface DialogFooterProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Dialog actions */
}

class DialogFooter extends UIComponent<WithAsProp<DialogFooterProps>> {
  static create: ShorthandFactory<DialogFooterProps>

  static displayName = 'DialogFooter'
  static className = 'ui-dialog__footer'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, actions, styles } = this.props

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

DialogFooter.create = createShorthandFactory({ Component: DialogFooter, mappedContent: 'content' })

/**
 * A TooltipContent contains the content of a Tooltip component.
 */
export default withSafeTypeForAs<typeof DialogFooter, DialogFooterProps>(DialogFooter)
