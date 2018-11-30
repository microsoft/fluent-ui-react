import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import {
  ComponentEventHandler,
  ShorthandValue,
  ShorthandRenderFunction,
  Extendable,
} from '../../../types/utils'
import { commonUIComponentPropTypes } from '../../lib/commonPropTypes'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import { customPropTypes, createShorthandFactory, UIComponent, RenderResultConfig } from '../../lib'
import { Image, Icon, Label } from '../..'
import { IconProps } from '../Icon/Icon'

export interface DropdownLabelProps extends UIComponentProps<DropdownLabelProps, any> {
  /** The test for the item. */
  header?: string

  /** The item can have an icon when displayed as active in multiple selection. */
  icon?: ShorthandValue

  /** The item can have an image avatar. */
  image?: ShorthandValue

  /**
   * Called when clicking on the label for the selected item, in multiple selection.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownLabelProps>

  /**
   * Called when removing an item from multiple selection.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownLabelProps>

  /**
   * A custom render function the image slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderImage?: ShorthandRenderFunction

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction
}

/**
 * A DropdownLabel is a sub-component if the Dropdown.
 */
class DropdownLabel extends UIComponent<Extendable<DropdownLabelProps>, any> {
  displayName = 'DropdownLabel'

  static create: Function

  className = 'ui-dropdown__label'

  static propTypes = {
    ...commonUIComponentPropTypes,
    header: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    renderImage: PropTypes.func,
    renderIcon: PropTypes.func,
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({ classes, styles, rest }: RenderResultConfig<DropdownLabelProps>) {
    const { header, icon, image, renderIcon, renderImage } = this.props
    const optionalImage = !image
      ? {}
      : {
          image: Image.create(image, {
            defaultProps: {
              avatar: true,
            },
            render: renderImage,
          }),
        }

    return (
      <Label
        className={classes.root}
        role="presentation"
        styles={styles.root}
        circular
        onClick={this.handleClick}
        content={header}
        icon={Icon.create(icon || 'close', {
          defaultProps: {
            'aria-label': `Remove ${header} from selection.`,
            'aria-hidden': false,
            role: 'button',
          },
          overrideProps: this.handleIconOverrides,
          render: renderIcon,
        })}
        {...optionalImage}
        {...rest}
      />
    )
  }

  private handleIconOverrides = (predefinedProps: DropdownLabelProps) => ({
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
}

DropdownLabel.create = createShorthandFactory(DropdownLabel, 'header')

export default DropdownLabel
