import PropTypes from 'prop-types'
import React, { ReactNode, CSSProperties } from 'react'

import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import gridRules from './gridRules'
import gridVariables from './gridVariables'

export type GridTemplate = string | number
export type FlowType = 'row' | 'column'
export type ItemPosition = 'start' | 'end' | 'center' | 'stretch'
export type ContentPosition = ItemPosition | 'space-around' | 'space-between' | 'space-evenly'

export interface IGridProps {
  alignContent?: ContentPosition
  alignItems?: ItemPosition
  as?: string
  children?: ReactNode
  className?: string
  columns?: GridTemplate
  content?: ReactNode
  flow?: FlowType
  gap?: string
  gridSize?: string
  itemSize?: string
  justifyContent?: ContentPosition
  justifyItems?: ItemPosition
  rows?: GridTemplate
  style?: CSSProperties
}

interface IGridState {}

/**
 * A grid.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Grid extends UIComponent<IGridProps, IGridState> {
  public static displayName = 'Grid'

  public static className = 'ui-grid'

  public static rules = gridRules

  public static variables = gridVariables

  public static propTypes = {
    /** Aligns the grid along the block (column) */
    alignContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

    /** Aligns grid items along the block (column) */
    alignItems: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'stretch',
      'space-around',
      'space-between',
      'space-evenly',
    ]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
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

    /** Specifies how the grid will be filled:
     * flow="row": fill in each row in turn, adding new rows as necessary (default)
     * flow="column": fill in each column in turn, adding new columns as necessary
     */
    flow: PropTypes.oneOf(['row', 'column']),

    /**
     * Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.
     * gap="<row-gap> [<column-gap>]" if unspecified, <column-gap> will be <row-gap>
     */
    gap: PropTypes.string,

    /**
     * Specifies grid size
     * gridSize="<height> [<width>]" if unspecified, <height> will be <width>
     */
    gridSize: PropTypes.string,

    /**
     * Specifies item size
     * itemSize="<height> [<width>]" if unspecified, <height> will be <width>
     */
    itemSize: PropTypes.string,

    /** Aligns the grid along the inline (row) axis */
    justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

    /** Aligns grid items along the inline (row) axis */
    justifyItems: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'stretch',
      'space-around',
      'space-between',
      'space-evenly',
    ]),

    /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  public static handledProps = [
    'alignContent',
    'alignItems',
    'as',
    'children',
    'className',
    'columns',
    'content',
    'flow',
    'gap',
    'gridSize',
    'itemSize',
    'justifyContent',
    'justifyItems',
    'rows',
  ]

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IGridProps>): ReactNode {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Grid
