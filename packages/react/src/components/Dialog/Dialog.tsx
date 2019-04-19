import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  ContentComponentProps,
  AutoControlledComponent,
  doesNodeContainClick,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { dialogBehavior } from '../../lib/accessibility'
import { FocusTrapZoneProps } from '../../lib/accessibility/FocusZone'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import Box, { BoxProps } from '../Box/Box'
import Header from '../Header/Header'
import Portal from '../Portal/Portal'
import Ref from '../Ref/Ref'
import Flex from '../Flex/Flex'

export interface DialogProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue>,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default dialogBehavior
   */
  accessibility?: Accessibility

  /** A dialog can contain actions. */
  actions?: ShorthandValue

  /** A dialog can contain a cancel button. */
  cancelButton?: ShorthandValue

  /** A dialog can contain a confirm button. */
  confirmButton?: ShorthandValue

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** A dialog can contain a header. */
  header?: ShorthandValue

  /**
   * Called after user's click a cancel button.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel?: ComponentEventHandler<DialogProps>

  /**
   * Called after user's click a confirm button.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm?: ComponentEventHandler<DialogProps>

  /**
   * Called after user's opened a dialog.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: ComponentEventHandler<DialogProps>

  /** Defines whether a dialog is displayed. */
  open?: boolean

  /** A dialog can contain a overlay. */
  overlay?: ShorthandValue

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: true | FocusTrapZoneProps

  /** Element to be rendered in-place where the dialog is defined. */
  trigger?: JSX.Element
}

export interface DialogState {
  open?: boolean
}

/**
 * A Dialog indicates a possible user action.
 */
class Dialog extends AutoControlledComponent<ReactProps<DialogProps>, DialogState> {
  static displayName = 'Dialog'
  static className = 'ui-dialog'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: 'shorthand',
    }),
    actions: customPropTypes.itemShorthand,
    cancelButton: customPropTypes.itemShorthand,
    confirmButton: customPropTypes.itemShorthand,
    defaultOpen: PropTypes.bool,
    header: customPropTypes.itemShorthand,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    overlay: customPropTypes.itemShorthand,
    trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    trigger: PropTypes.any,
  }

  static defaultProps = {
    accessibility: dialogBehavior,
    actions: {},
    overlay: {},
    trapFocus: true,
  }

  static autoControlledProps = ['open']

  actionHandlers: AccessibilityActionHandlers = {
    closeAndFocusTrigger: e => {
      this.handleDialogCancel(e)
      e.stopPropagation()

      _.invoke(this.triggerRef, 'current.focus')
    },
    close: e => this.handleDialogCancel(e),
  }
  contentRef = React.createRef<HTMLElement>()
  triggerRef = React.createRef<HTMLElement>()

  getInitialAutoControlledState(): DialogState {
    return { open: false }
  }

  handleDialogCancel = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onCancel', e, { ...this.props, open: false })
    this.trySetState({ open: false })
  }

  handleDialogConfirm = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onConfirm', e, { ...this.props, open: false })
    this.trySetState({ open: false })
  }

  handleDialogOpen = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onOpen', e, { ...this.props, open: true })
    this.trySetState({ open: true })
  }

  handleCancelButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      this.handleDialogCancel(e)
    },
  })

  handleConfirmButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      this.handleDialogConfirm(e)
    },
  })

  handleOverlayOverrides = (content: JSX.Element) => (predefinedProps: BoxProps) => ({
    content,
    onClick: (e: React.SyntheticEvent, overlayProps: BoxProps) => {
      _.invoke(predefinedProps, 'onClick', e, overlayProps)

      if (!doesNodeContainClick(this.contentRef.current, e)) {
        this.handleDialogCancel(e)
      }
    },
  })

  renderComponent({ accessibility, classes, ElementType, styles, unhandledProps }) {
    const {
      actions,
      confirmButton,
      cancelButton,
      content,
      header,
      overlay,
      trapFocus,
      trigger,
    } = this.props
    const { open } = this.state

    const dialogContent = (
      <Ref innerRef={this.contentRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.popup}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.popup, unhandledProps)}
        >
          {Header.create(header, {
            defaultProps: {
              as: 'h2',
              styles: styles.header,
            },
          })}
          {Box.create(content, {
            defaultProps: {
              styles: styles.content,
            },
          })}

          {Box.create(actions, {
            defaultProps: {
              styles: styles.actions,
            },
            overrideProps: {
              content: (
                <Flex gap="gap.smaller" hAlign="end">
                  {Button.create(cancelButton, { overrideProps: this.handleCancelButtonOverrides })}
                  {Button.create(confirmButton, {
                    defaultProps: {
                      primary: true,
                    },
                    overrideProps: this.handleConfirmButtonOverrides,
                  })}
                </Flex>
              ),
            },
          })}
        </ElementType>
      </Ref>
    )
    const triggerAccessibility = {
      attributes: accessibility.attributes.trigger,
      keyHandlers: accessibility.keyHandlers.trigger,
    }

    return (
      <Portal
        onTriggerClick={this.handleDialogOpen}
        open={open}
        trapFocus={trapFocus}
        trigger={trigger}
        triggerAccessibility={triggerAccessibility}
        triggerRef={this.triggerRef}
      >
        {Box.create(overlay, {
          defaultProps: {
            styles: styles.overlay,
          },
          overrideProps: this.handleOverlayOverrides(dialogContent),
        })}
      </Portal>
    )
  }
}

export default Dialog
