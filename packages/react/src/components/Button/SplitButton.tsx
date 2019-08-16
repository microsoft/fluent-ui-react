import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { WithAsProp, withSafeTypeForAs, ComponentEventHandler, ShorthandValue } from '../../types'
import {
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import Button, { ButtonProps } from './Button'
import MenuButton from '../MenuButton/MenuButton'
import { splitButtonBehavior } from '../../lib/accessibility'
import { MenuProps } from '../Menu/Menu'

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Element to be rendered in-place where the popup is defined. */
  button?: ShorthandValue<ButtonProps>

  /** Element to be rendered in-place where the popup is defined. */
  menu?: ShorthandValue<MenuProps>

  /**
   * Called after user's click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /** A split button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /** A split button can be formatted to show different levels of emphasis. */
  secondary?: boolean
}

class SplitButton extends UIComponent<WithAsProp<SplitButtonProps>> {
  static create: Function

  static displayName = 'SplitButton'

  static className = 'ui-splitbutton'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    button: customPropTypes.itemShorthand,
    menu: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onToggle: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  }

  static defaultProps = {
    accessibility: splitButtonBehavior,
    as: 'span',
    primary: true,
  }

  buttonRef = React.createRef<HTMLElement>()
  menuButtonRef = React.createRef<MenuButton>()

  actionHandlers = {
    closeMenuAndFocusButton: e => {
      e.preventDefault()
      this.closeMenu()
      this.buttonRef.current.focus()
    },
    openAndFocusFirst: e => this.openAndFocusFirst(e),
  }

  closeMenu() {
    this.menuButtonRef.current.closeMenu()
  }

  openAndFocusFirst(e) {
    this.menuButtonRef.current.openAndFocus(e, 'first')
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { button, menu, primary, secondary } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <Ref innerRef={this.buttonRef}>
          {Button.create(button, {
            defaultProps: {
              styles: styles.button,
              variables: variables.button,
              primary,
              secondary,
              ...accessibility.attributes.button,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.button, button),
            },
            overrideProps: (predefinedProps?: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                _.invoke(this.props, 'onClick', e, buttonProps)
              },
            }),
          })}
        </Ref>
        <MenuButton
          accessibility={accessibility.childBehaviors.menuButton}
          ref={this.menuButtonRef}
          menu={menu}
          trigger={
            <Button
              styles={styles.menuButton}
              variables={variables.menuButton}
              icon="chevron-down"
              iconOnly
              primary={primary}
              secondary={secondary}
            />
          }
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.menuButton, menu)}
        />
      </ElementType>
    )
  }
}

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton)
