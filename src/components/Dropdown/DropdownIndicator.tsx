import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { ReactProps } from '../../../types/utils'
import { commonPropTypes, createShorthandFactory, UIComponent, UIComponentProps } from '../../lib'
import Loader from '../Loader/Loader'

export interface DropdownIndicatorProps extends UIComponentProps<DropdownIndicatorProps> {
  /** A dropdown can take the width of its container. */
  fluid?: boolean

  loading: boolean
  onClick?: (e: React.SyntheticEvent, props: DropdownIndicatorProps) => void
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
    const content = open ? String.fromCharCode(9650) : String.fromCharCode(9660)

    return (
      <ElementType className={classes.root} onClick={this.handleClick}>
        {loading ? <Loader size="small" /> : <span>{content}</span>}
      </ElementType>
    )
  }
}

DropdownIndicator.create = createShorthandFactory(DropdownIndicator)

export default DropdownIndicator
