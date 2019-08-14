import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ComponentEventHandler,
} from '../../types'
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
import { MenuItemProps } from '../Menu/MenuItem'
import MenuButton from '../MenuButton/MenuButton'
import { splitButtonBehavior } from '../../lib/accessibility'

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Menu. */
  items: ShorthandCollection<MenuItemProps>

  /**
   * Called after user's click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called when an item is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<MenuItemProps>

  /**
   * Called after user's click on the toggle button.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onToggle?: ComponentEventHandler<ButtonProps>

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
    items: customPropTypes.collectionShorthand,
    mainItemIndex: PropTypes.number,
    onClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onToggle: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    toggleButton: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: splitButtonBehavior,
    as: 'span',
    primary: true,
  }

  menuButtonRef = React.createRef<MenuButton>()
  splitButtonRef = React.createRef<HTMLElement>()

  actionHandlers = {
    closeMenu: () => this.closeMenu(),
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
    const { items, onClick, primary, secondary } = this.props

    return (
      <Ref innerRef={this.splitButtonRef}>
        <ElementType
          className={classes.root}
          onClick={onClick}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {Button.create(items[0], {
            defaultProps: {
              styles: styles.button,
              variables: variables.button,
              primary,
              secondary,
              ...accessibility.attributes.button,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.button, unhandledProps),
            },
          })}
          <MenuButton
            accessibility={accessibility.childBehaviors.toggleButton}
            componentRef={this.menuButtonRef}
            menu={items}
            onOpenChange={() => {
              this.splitButtonRef.current.focus()
            }}
            trigger={
              <Button
                styles={styles.toggleButton}
                variables={variables.toggleButton}
                icon="chevron-down"
                iconOnly
                primary={primary}
                secondary={secondary}
              />
            }
          />
        </ElementType>
      </Ref>
    )
  }
}

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton)
