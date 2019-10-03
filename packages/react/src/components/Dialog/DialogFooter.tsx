import * as React from 'react'
// import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  // childrenExist,
  createShorthandFactory,
  UIComponent,
  // RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  // rtlTextContainer,
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
  actions: ShorthandValue<BoxProps>
}

class DialogFooter extends UIComponent<WithAsProp<DialogFooterProps>> {
  static create: ShorthandFactory<DialogFooterProps>

  static displayName = 'DialogFooter'
  static className = 'ui-dialog__footer'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    actions: customPropTypes.itemShorthand,
  }

  renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, actions, styles } = this.props

    return (
      <ElementType styles={styles} className={classes.root} {...unhandledProps}>
        {childrenExist(children) ? children : actions}
      </ElementType>
    )
  }
}

DialogFooter.create = createShorthandFactory({ Component: DialogFooter })

/**
 * A TooltipContent contains the content of a Tooltip component.
 */
export default withSafeTypeForAs<typeof DialogFooter, DialogFooterProps>(DialogFooter)
