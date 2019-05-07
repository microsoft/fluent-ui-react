import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import { getFirstFocusable } from '../../lib/accessibility/FocusZone/focusUtilities'
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
} from '../../lib'
import { ReactProps } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface TableCellProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<React.ReactNode | React.ReactNode[]> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility

  focused?: boolean
  focusable?: boolean
  cellIndex?: number
}

/**
 * A TableCell is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableCell extends UIComponent<ReactProps<TableCellProps>, any> {
  public static displayName = 'TableCell'

  public static className = 'ui-TableCell'

  private cellRef: HTMLElement
  private focusableElement: HTMLElement
  private setRef = (ref: HTMLElement) => (this.cellRef = ref)

  public static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.nodeContent),
        customPropTypes.nodeContent,
      ]),
    ]),
    isHeader: PropTypes.bool,
    focused: PropTypes.bool,
    focusable: PropTypes.bool,
    cellIndex: PropTypes.number,
  }

  public static defaultProps: TableCellProps = {
    as: 'td',
    accessibility: defaultBehavior,
  }

  private tryFocusCell() {
    const { focused } = this.props
    if (this.focusableElement) {
      if (focused) {
        this.focusableElement.focus()
        this.focusableElement.setAttribute('tabindex', '0')
      } else {
        this.focusableElement.setAttribute('tabindex', '-1')
      }
    }
  }

  componentDidMount() {
    if (!this.props.focusable) {
      return
    }
    this.focusableElement = getFirstFocusable(this.cellRef, this.cellRef, true)
    if (!this.focusableElement) {
      this.focusableElement = this.cellRef
    }
    this.focusableElement.setAttribute('data-is-focusable', 'true')

    this.tryFocusCell()
  }

  componentDidUpdate() {
    if (!this.props.focusable) {
      return
    }
    this.tryFocusCell()
  }

  handleFocus = e => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
  }: RenderResultConfig<any>): React.ReactNode {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        ref={this.setRef}
        onFocus={this.handleFocus}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default TableCell
