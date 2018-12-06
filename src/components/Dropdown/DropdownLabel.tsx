import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import keyboardKey from 'keyboard-key'
import { ComponentEventHandler, ShorthandValue, Extendable } from '../../../types/utils'
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

export interface DropdownLabelProps extends UIComponentProps<DropdownLabelProps, any> {
  /** The text content for the selected item. */
  header?: string

  /** The item can have an icon when displayed as selected in a multiple selection. */
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
}

/**
 * A DropdownLabel is a sub-component of a multiple selection Dropdown. It is used to display the selected
 * options, as labels, before the input text (if search) or the button (if not search).
 */
class DropdownLabel extends UIComponent<Extendable<DropdownLabelProps>, any> {
  displayName = 'DropdownLabel'

  static create: Function

  className = 'ui-dropdown__label'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    header: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    image: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  public renderComponent({ classes, styles, rest }: RenderResultConfig<DropdownLabelProps>) {
    const { header, icon, image } = this.props
    const optionalImage = !image
      ? {}
      : {
          image: Image.create(image, {
            defaultProps: {
              avatar: true,
            },
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
            'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
            'aria-hidden': false,
            role: 'button',
          },
          overrideProps: this.handleIconOverrides,
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
