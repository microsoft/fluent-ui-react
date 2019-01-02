import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import {
  UIComponent,
  RenderResultConfig,
  createShorthandFactory,
  customPropTypes,
  commonPropTypes,
} from '../../lib'
import { ShorthandValue, ComponentEventHandler, ReactProps } from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import ListItem from '../List/ListItem'
import Image from '../Image/Image'

export interface DropdownItemProps extends UIComponentProps<DropdownItemProps> {
  /** A dropdown item can be active. */
  active?: boolean

  /** Item's content. */
  content?: string

  /** Item's header. */
  header?: string

  /** Item's image. */
  image?: ShorthandValue

  /**
   * Called on dropdown item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownItemProps>
}

/**
 * A DropdownItem is a sub-component of the Dropdown,
 * used to display items of the dropdown list.
 */
class DropdownItem extends UIComponent<ReactProps<DropdownItemProps>, any> {
  static displayName = 'DropdownItem'

  static create: Function

  static className = 'ui-dropdown__item'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    accessibilityItemProps: PropTypes.object,
    active: PropTypes.bool,
    content: PropTypes.string,
    header: PropTypes.string,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({ classes, rest }: RenderResultConfig<DropdownItemProps>) {
    const { content, header, image, accessibilityItemProps } = this.props
    return (
      <ListItem
        className={classes.root}
        header={header}
        onClick={this.handleClick}
        media={Image.create(image, {
          defaultProps: {
            avatar: true,
          },
        })}
        content={content}
        {...accessibilityItemProps}
        {...rest}
      />
    )
  }
}

DropdownItem.create = createShorthandFactory(DropdownItem, 'header')

export default DropdownItem
