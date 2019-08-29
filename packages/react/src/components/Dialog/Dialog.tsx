import { Unstable_NestingAuto } from '@stardust-ui/react-component-nesting-registry'
import { EventListener } from '@stardust-ui/react-component-event-listener'
import { Ref, toRefObject } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import {
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  AutoControlledComponent,
  doesNodeContainClick,
  applyAccessibilityKeyHandlers,
  getOrGenerateIdFromShorthand,
} from '../../lib'
import { dialogBehavior } from '../../lib/accessibility'
import { FocusTrapZoneProps } from '../../lib/accessibility/FocusZone'
import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import ButtonGroup from '../Button/ButtonGroup'
import Box, { BoxProps } from '../Box/Box'
import Header, { HeaderProps } from '../Header/Header'
import Portal, { TriggerAccessibility } from '../Portal/Portal'
import Flex from '../Flex/Flex'

export interface DialogSlotClassNames {
  header: string
  headerAction: string
  content: string
  overlay: string
}

export interface DialogProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** A dialog can contain actions. */
  actions?: ShorthandValue<BoxProps>

  /** A dialog can have a backdrop on its overlay. */
  backdrop?: boolean

  /** A dialog can contain a cancel button. */
  cancelButton?: ShorthandValue<ButtonProps>

  /** Controls whether or not a dialog should close when a click outside is happened. */
  closeOnOutsideClick?: boolean

  /** A dialog can contain a confirm button. */
  confirmButton?: ShorthandValue<ButtonProps>

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** A dialog can contain a header. */
  header?: ShorthandValue<HeaderProps>

  /** A dialog can contain a button next to the header. */
  headerAction?: ShorthandValue<ButtonProps>

  /**
   * Whether the dialog should be inert, e.g. not dismiss when focusing/clicking outside of the dialog. Hides an
   * overlay.
   */
  inert?: boolean

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
  overlay?: ShorthandValue<BoxProps>

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: true | FocusTrapZoneProps

  /** Element to be rendered in-place where the dialog is defined. */
  trigger?: JSX.Element
}

export interface DialogState {
  contentId?: string
  headerId?: string
  open?: boolean
}

class Dialog extends AutoControlledComponent<WithAsProp<DialogProps>, DialogState> {
  static displayName = 'Dialog'
  static className = 'ui-dialog'

  static slotClassNames: DialogSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: 'shorthand',
    }),
    actions: customPropTypes.itemShorthand,
    backdrop: PropTypes.bool,
    headerAction: customPropTypes.itemShorthand,
    cancelButton: customPropTypes.itemShorthand,
    closeOnOutsideClick: PropTypes.bool,
    confirmButton: customPropTypes.itemShorthand,
    defaultOpen: PropTypes.bool,
    header: customPropTypes.itemShorthand,
    inert: PropTypes.bool,
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
    backdrop: true,
    closeOnOutsideClick: true,
    inert: false,
    overlay: {},
    trapFocus: true,
  }

  static autoControlledProps = ['open']

  actionHandlers = {
    closeAndFocusTrigger: e => {
      this.handleDialogCancel(e)
      e.stopPropagation()

      _.invoke(this.triggerRef, 'current.focus')
    },
    close: e => this.handleDialogCancel(e),
  }
  contentRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  overlayRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  triggerRef = React.createRef<HTMLElement>()

  getInitialAutoControlledState(): DialogState {
    return {
      open: false,
    }
  }

  static getAutoControlledStateFromProps(
    props: DialogProps,
    state: DialogState,
  ): Partial<DialogState> {
    return {
      contentId: getOrGenerateIdFromShorthand('dialog-content-', props.content, state.contentId),
      headerId: getOrGenerateIdFromShorthand('dialog-header-', props.header, state.headerId),
    }
  }

  handleDialogCancel = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onCancel', e, { ...this.props, open: false })
    this.setState({ open: false })
  }

  handleDialogConfirm = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onConfirm', e, { ...this.props, open: false })
    this.setState({ open: false })
  }

  handleDialogOpen = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onOpen', e, { ...this.props, open: true })
    this.setState({ open: true })
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

  handleOverlayClick = (e: MouseEvent) => {
    const { closeOnOutsideClick } = this.props

    // Dialog has different conditions to close than Popup, so we don't need to iterate across all
    // refs
    const isInsideContentClick = doesNodeContainClick(this.contentRef.current, e)
    const isInsideOverlayClick = doesNodeContainClick(this.overlayRef.current, e)

    const shouldClose = closeOnOutsideClick && !isInsideContentClick && isInsideOverlayClick

    if (shouldClose) {
      this.handleDialogCancel(e)
    }
  }

  handleDocumentKeydown = (getRefs: Function) => (e: KeyboardEvent) => {
    // if focus was lost from Dialog, for e.g. when click on Dialog's content
    // and ESC is pressed, the opened Dialog should get closed and the trigger should get focus
    const lastOverlayRef = getRefs().pop()
    const isLastOpenedDialog: boolean =
      lastOverlayRef && lastOverlayRef.current === this.overlayRef.current

    if (keyboardKey.getCode(e) === keyboardKey.Escape && isLastOpenedDialog) {
      this.handleDialogCancel(e)
      _.invoke(this.triggerRef, 'current.focus')
    }
  }

  renderComponent({ accessibility, classes, ElementType, styles, unhandledProps, rtl }) {
    const {
      actions,
      confirmButton,
      cancelButton,
      content,
      header,
      headerAction,
      inert,
      overlay,
      trapFocus,
      trigger,
    } = this.props
    const { open } = this.state

    const dialogContent = (
      <Ref innerRef={this.contentRef}>
        <ElementType
          className={classes.root}
          // it's required to have an `rtl` attribute there as Dialog is rendered outside the main DOM tree
          dir={rtl ? 'rtl' : undefined}
          {...accessibility.attributes.popup}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.popup, unhandledProps)}
        >
          {Header.create(header, {
            defaultProps: {
              as: 'h2',
              className: Dialog.slotClassNames.header,
              styles: styles.header,
              ...accessibility.attributes.header,
            },
          })}
          {Button.create(headerAction, {
            defaultProps: {
              className: Dialog.slotClassNames.headerAction,
              styles: styles.headerAction,
              text: true,
              iconOnly: true,
              ...accessibility.attributes.headerAction,
            },
          })}

          {Box.create(content, {
            defaultProps: {
              styles: styles.content,
              className: Dialog.slotClassNames.content,
              ...accessibility.attributes.content,
            },
          })}

          {ButtonGroup.create(actions, {
            defaultProps: {
              styles: styles.actions,
            },
            overrideProps: {
              content: (
                <Flex gap="gap.smaller">
                  {Button.create(cancelButton, {
                    overrideProps: this.handleCancelButtonOverrides,
                  })}
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

    const targetRef = toRefObject(this.context.target)
    const triggerAccessibility: TriggerAccessibility = {
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
        <Unstable_NestingAuto>
          {(getRefs, nestingRef) => (
            <>
              {inert && dialogContent}

              {!inert && (
                <Ref
                  innerRef={(contentNode: HTMLElement) => {
                    this.overlayRef.current = contentNode
                    nestingRef.current = contentNode
                  }}
                >
                  {Box.create(overlay, {
                    defaultProps: {
                      className: Dialog.slotClassNames.overlay,
                      styles: styles.overlay,
                    },
                    overrideProps: { content: dialogContent },
                  })}
                </Ref>
              )}
              {!inert && (
                <EventListener
                  listener={this.handleOverlayClick}
                  targetRef={targetRef}
                  type="click"
                  capture
                />
              )}
              <EventListener
                listener={this.handleDocumentKeydown(getRefs)}
                targetRef={targetRef}
                type="keydown"
                capture
              />
            </>
          )}
        </Unstable_NestingAuto>
      </Portal>
    )
  }
}

Dialog.slotClassNames = {
  header: `${Dialog.className}__header`,
  headerAction: `${Dialog.className}__headerAction`,
  content: `${Dialog.className}__content`,
  overlay: `${Dialog.className}__overlay`,
}

/**
 * A Dialog displays important information on top of a page which usually requires user's attention, confirmation or interaction.
 * Dialogs are purposefully interruptive, so they should be used sparingly.
 *
 * @accessibility
 * Implements [ARIA Dialog (Modal)](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) design pattern.
 * @accessibilityIssues
 * [NVDA narrates dialog title and button twice](https://github.com/nvaccess/nvda/issues/10003)
 * [NVDA does not recognize the ARIA 1.1 values of aria-haspopup](https://github.com/nvaccess/nvda/issues/8235)
 * [Jaws does not announce token values of aria-haspopup](https://github.com/FreedomScientific/VFO-standards-support/issues/33)
 * [Issue 989517: VoiceOver narrates dialog content and button twice](https://bugs.chromium.org/p/chromium/issues/detail?id=989517)
 */
export default withSafeTypeForAs<typeof Dialog, DialogProps>(Dialog)
