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
import {
  Extendable,
  ShorthandValue,
  ShorthandRenderFunction,
  ComponentEventHandler,
} from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import ListItem from '../List/ListItem'
import Image from '../Image/Image'

export interface DropdownItemProps extends UIComponentProps<any, any> {
  /** If the item is highlighted inside the list. */
  active?: boolean

  /** Secondary text content to serve as item description. */
  content?: string

  /** Main text displayed for the item. */
  header?: string

  /** The item can have an image avatar. */
  image?: ShorthandValue

  /**
   * Called when clicking on the dropdown item in the list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownItemProps>

  /**
   * A custom render function the image slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderImage?: ShorthandRenderFunction
}

/**
 * A DropdownItem is a sub-component of the Dropdown, used to display the items as options inside the list.
 */
class DropdownItem extends UIComponent<Extendable<DropdownItemProps>, any> {
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
    renderImage: PropTypes.func,
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({ classes, variables, rest }: RenderResultConfig<DropdownItemProps>) {
    const { content, header, active, image, accessibilityItemProps } = this.props
    return (
      <ListItem
        className={classes.root}
        header={header}
        onClick={this.handleClick}
        variables={{
          backgroundColor: active
            ? variables.listItemHighlightedBackgroundColor
            : variables.listItemBackgroundColor,
          ...(active && {
            headerColor: variables.listItemTextColor,
            contentColor: variables.listItemTextColor,
          }),
        }}
        {...{
          media: Image.create(image, {
            defaultProps: {
              avatar: true,
            },
          }),
          content,
        }}
        {...accessibilityItemProps}
        {...rest}
      />
    )
  }
}

DropdownItem.create = createShorthandFactory(DropdownItem, 'header')

export default DropdownItem
