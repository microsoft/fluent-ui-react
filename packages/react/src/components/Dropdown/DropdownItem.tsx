import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { UIComponent, RenderResultConfig, createShorthandFactory, commonPropTypes } from '../../lib'
import { ShorthandValue, ComponentEventHandler, ReactProps } from '../../types'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import ListItem from '../List/ListItem'
import Image from '../Image/Image'
import Box from '../Box/Box'

export interface DropdownItemSlotClassNames {
  content: string
  header: string
  image: string
}

export interface DropdownItemProps extends UIComponentProps<DropdownItemProps> {
  /** A dropdown item can be active. */
  active?: boolean

  /** Item's content. */
  content?: ShorthandValue

  /** Item's header. */
  header?: ShorthandValue

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

  static slotClassNames: DropdownItemSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    accessibilityItemProps: PropTypes.object,
    active: PropTypes.bool,
    content: customPropTypes.itemShorthand,
    header: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({
    classes,
    styles,
    unhandledProps,
  }: RenderResultConfig<DropdownItemProps>) {
    const { content, header, image, accessibilityItemProps } = this.props
    return (
      <ListItem
        className={classes.root}
        header={Box.create(header, {
          defaultProps: {
            className: DropdownItem.slotClassNames.header,
            styles: styles.header,
          },
        })}
        onClick={this.handleClick}
        media={Image.create(image, {
          defaultProps: {
            avatar: true,
            className: DropdownItem.slotClassNames.image,
            styles: styles.image,
          },
        })}
        content={Box.create(content, {
          defaultProps: {
            className: DropdownItem.slotClassNames.content,
            styles: styles.content,
          },
        })}
        truncateContent
        truncateHeader
        {...accessibilityItemProps}
        {...unhandledProps}
      />
    )
  }
}

DropdownItem.slotClassNames = {
  content: `${DropdownItem.className}__content`,
  header: `${DropdownItem.className}__header`,
  image: `${DropdownItem.className}__image`,
}

DropdownItem.create = createShorthandFactory({ Component: DropdownItem, mappedProp: 'header' })

export default DropdownItem
