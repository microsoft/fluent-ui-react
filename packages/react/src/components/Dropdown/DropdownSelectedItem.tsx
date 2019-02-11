import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import { ComponentEventHandler, ShorthandValue, ReactProps } from '../../types'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import {
  customPropTypes,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  commonPropTypes,
} from '../../lib'
import { Image, Icon, Label } from '../..'
import { IconProps } from '../Icon/Icon'
import Ref from '../Ref/Ref'

export interface DropdownSelectedItemSlotClassNames {
  removeIcon: string
}

export interface DropdownSelectedItemProps extends UIComponentProps<DropdownSelectedItemProps> {
  /** A selected item can be active. */
  active?: boolean

  /** Header of the selected item. */
  header?: string

  /** Icon of the selected item. */
  icon?: ShorthandValue

  /** Image of the selected item. */
  image?: ShorthandValue

  /**
   * Called on selected item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownSelectedItemProps>

  /**
   * Called on selected item key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onKeyDown?: ComponentEventHandler<DropdownSelectedItemProps>

  /**
   * Called when item is removed from the selection list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownSelectedItemProps>
}

/**
 * A DropdownSelectedItem is a sub-component of a multiple selection Dropdown.
 * It is used to display selected item.
 */
class DropdownSelectedItem extends UIComponent<ReactProps<DropdownSelectedItemProps>, any> {
  private itemRef = React.createRef<HTMLElement>()

  static displayName = 'DropdownSelectedItem'
  static create: Function
  static slotClassNames: DropdownSelectedItemSlotClassNames
  static className = 'ui-dropdown__selected-item'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
    }),
    active: PropTypes.bool,
    header: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onRemove: PropTypes.func,
  }

  static defaultProps = {
    icon: 'close',
  }

  componentDidUpdate(prevProps: DropdownSelectedItemProps) {
    if (!prevProps.active && this.props.active) {
      this.itemRef.current.focus()
    }
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyDown', e, this.props)
  }

  private handleIconOverrides = (predefinedProps: IconProps) => ({
    onClick: (e: React.SyntheticEvent, iconProps: IconProps) => {
      e.stopPropagation()
      _.invoke(this.props, 'onRemove', e, this.props)
      _.invoke(predefinedProps, 'onClick', e, iconProps)
    },
    onKeyDown: (e: React.SyntheticEvent, iconProps: IconProps) => {
      e.stopPropagation()
      if (keyboardKey.getCode(e) === keyboardKey.Enter) {
        _.invoke(this.props, 'onRemove', e, this.props)
      }
      _.invoke(predefinedProps, 'onKeyDown', e, iconProps)
    },
  })

  public renderComponent({
    unhandledProps,
    styles,
  }: RenderResultConfig<DropdownSelectedItemProps>) {
    const { header, icon, image } = this.props

    const iconElement = Icon.create(icon, {
      defaultProps: {
        'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
        className: DropdownSelectedItem.slotClassNames.removeIcon,
      },
      overrideProps: this.handleIconOverrides,
    })
    const imageElement = Image.create(image, {
      defaultProps: {
        avatar: true,
      },
    })

    return (
      <Ref innerRef={this.itemRef}>
        <Label
          tabIndex={-1}
          styles={styles.root}
          circular
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          content={header}
          icon={iconElement}
          image={imageElement}
          {...unhandledProps}
        />
      </Ref>
    )
  }
}

DropdownSelectedItem.slotClassNames = {
  removeIcon: `${DropdownSelectedItem.className}__remove-icon`,
}

DropdownSelectedItem.create = createShorthandFactory(DropdownSelectedItem, 'header')

export default DropdownSelectedItem
