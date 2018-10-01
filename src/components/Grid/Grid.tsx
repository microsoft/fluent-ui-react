import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'

export interface IGridProps {
  as?: any
  className?: string
  children?: ReactChildren
  columns?: string | number
  content?: ItemShorthand | ItemShorthand[]
  rows?: string | number
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A grid.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Grid extends UIComponent<Extendable<IGridProps>, any> {
  public static displayName = 'Grid'

  public static className = 'ui-grid'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Shorthand for primary content. */
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.itemShorthand),
        customPropTypes.itemShorthand,
      ]),
    ]),

    /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { children, content } = this.props

    return (
      <ElementType className={classes.root} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Grid
