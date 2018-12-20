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
} from '../../lib'
import { ReactProps } from '../../../types/utils'

export interface DividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps {
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
    size: 0,
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Divider.create = createShorthandFactory(Divider, 'content')

export default Divider

export type DividerPropsWithDefaults = DividerProps & typeof Divider.defaultProps
