import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, UIComponent } from '../../lib'
import { Extendable } from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'
import Slot from '../Slot/Slot'

export interface DividerProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {
  /** A divider can be fitted, without any space above or below it.  */
  fitted?: boolean

  /** Size multiplier (default 0) * */
  size?: number

  /** A Divider can be formatted to show different levels of emphasis. */
  type?: 'primary' | 'secondary'

  /** A divider can appear more important and draw the user's attention. */
  important?: boolean
}

/**
 * A divider visually segments content into groups.
 */
class Divider extends UIComponent<Extendable<DividerProps>, any> {
  static displayName = 'Divider'

  static create: Function

  static className = 'ui-divider'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    fitted: PropTypes.bool,
    size: PropTypes.number,
    type: PropTypes.oneOf(['primary', 'secondary']),
    important: PropTypes.bool,
  }

  static defaultProps = {
    size: 0,
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children)
          ? children
          : Slot.create(content, {
              defaultProps: { as: 'span', styles: styles.content },
            })}
      </ElementType>
    )
  }
}

Divider.create = createShorthandFactory(Divider, 'content')

export default Divider

export type DividerPropsWithDefaults = DividerProps & typeof Divider.defaultProps
