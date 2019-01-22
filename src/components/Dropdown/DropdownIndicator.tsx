import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { ComponentEventHandler, ReactProps } from '../../../types/utils'
import { commonPropTypes, createShorthandFactory, UIComponent, UIComponentProps } from '../../lib'
import Indicator from '../Indicator/Indicator'
import Loader from '../Loader/Loader'

export interface DropdownIndicatorProps extends UIComponentProps<DropdownIndicatorProps> {
  /** A dropdown can take the width of its container. */
  fluid?: boolean

  /** A dropdown can show that it is currently loading data. */
  loading: boolean

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<DropdownIndicatorProps>

  /** Controls whether or not the dropdown menu is displayed. */
  open: boolean
}

/**
 * A DropdownIndicator is a sub-component that outputs an indicator.
 */
class DropdownIndicator extends UIComponent<ReactProps<DropdownIndicatorProps>> {
  static className = 'ui-dropdown__indicator'
  static create: Function
  static displayName = 'DropdownIndicator'
  static propTypes = {
    ...commonPropTypes.createCommon({ children: false, content: false }),
    fluid: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    open: PropTypes.bool,
  }

  handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ classes, ElementType, unhandledProps }) {
    const { loading, open } = this.props

    return (
      <ElementType className={classes.root} onClick={this.handleClick}>
        {loading ? (
          <Loader size="small" />
        ) : (
          Indicator.create('', {
            defaultProps: { direction: open ? 'top' : 'bottom' },
          })
        )}
      </ElementType>
    )
  }
}

DropdownIndicator.create = createShorthandFactory(DropdownIndicator)

export default DropdownIndicator
