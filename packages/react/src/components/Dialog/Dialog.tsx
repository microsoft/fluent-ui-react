import { Unstable_NestingAuto } from '@stardust-ui/react-component-nesting-registry'
import { documentRef, EventListener } from '@stardust-ui/react-component-event-listener'
import { Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

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

  /** A dialog can contain a cancel button. */
  cancelButton?: ShorthandValue<ButtonProps>

  /** A dialog can contain a confirm button. */
  confirmButton?: ShorthandValue<ButtonProps>

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** A dialog can contain a header. */
  header?: ShorthandValue<HeaderProps>

  /** A dialog can contain a button next to the header. */
  headerAction?: ShorthandValue<ButtonProps>

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
    headerAction: customPropTypes.itemShorthand,
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

  handleOverlayClick = (e: MouseEvent) => {
    // Dialog has different conditions to close than Popup, so we don't need to iterate across all
    // refs
    const isInsideContentClick = doesNodeContainClick(this.contentRef.current, e)
    const isInsideOverlayClick = doesNodeContainClick(this.overlayRef.current, e)

    const shouldClose = !isInsideContentClick && isInsideOverlayClick

    if (shouldClose) {
      this.handleDialogCancel(e)
    }
  }

  renderComponent({ accessibility, classes, ElementType, styles, unhandledProps }) {
    const {
      actions,
      confirmButton,
      cancelButton,
      content,
      header,
      headerAction,
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

          {Box.create(actions, {
            defaultProps: {
              styles: styles.actions,
            },
            overrideProps: {
              content: (
                <Flex gap="gap.smaller" hAlign="end">
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
              <EventListener
                listener={this.handleOverlayClick}
                targetRef={documentRef}
                type="click"
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
 */
export default withSafeTypeForAs<typeof Dialog, DialogProps>(Dialog)
