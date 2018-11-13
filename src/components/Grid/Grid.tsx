import * as PropTypes from 'prop-types'
import * as React from 'react'
import { UIComponent, childrenExist, customPropTypes, RenderResultConfig } from '../../lib'
import { Extendable, ShorthandValue } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'
import ReactNode = React.ReactNode

export interface GridProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: string | number

  /** Shorthand for primary content. */
  content?: ShorthandValue | ShorthandValue[]

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: string | number
}

/**
 * A grid is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Grid extends UIComponent<Extendable<GridProps>, any> {
  public static displayName = 'Grid'

  public static className = 'ui-grid'

  public static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.func,
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.itemShorthand),
        customPropTypes.itemShorthand,
      ]),
    ]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  public static defaultProps: GridProps = {
    as: 'div',
    accessibility: defaultBehavior,
  }

  public renderComponent({ ElementType, classes, rest }: RenderResultConfig<any>): ReactNode {
    const { children, content } = this.props

    return (
      <ElementType className={classes.root} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Grid
