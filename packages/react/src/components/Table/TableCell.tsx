import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import { getFirstFocusable } from '@stardust-ui/react-bindings'
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
} from '../../lib'

import { WithAsProp } from '../../types'
import { Accessibility } from '@stardust-ui/accessibility'

export interface TableCellProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<React.ReactNode | React.ReactNode[]> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available TableCellBehavior
   * */
  accessibility?: Accessibility
  focused?: boolean
  focusable?: boolean
  cellIndex?: number
  onClick?: (e, props) => void
}

/**
 * A TableCell is used to harmonize negative space in a layout.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class TableCell extends UIComponent<WithAsProp<any>, any> {
  static displayName = 'TableCell'

  static className = 'ui-TableCell'

  cellRef: HTMLElement
  focusableElement: HTMLElement
  setRef = (ref: HTMLElement) => (this.cellRef = ref)

  static propTypes = {
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
    onClick: PropTypes.func,
  }

  static defaultProps = {
    as: 'td',
  }

  tryFocusCell() {
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

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }
  renderComponent({
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
        onClick={this.handleClick}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default TableCell
