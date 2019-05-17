import { Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { useStateManager } from '@stardust-ui/react-bindings'
import { createDialogManager, DialogManagerFactory } from '@stardust-ui/state'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  ContentComponentProps,
  doesNodeContainClick,
  applyAccessibilityKeyHandlers,
  getUnhandledProps,
  getElementType,
} from '../../lib'
import { dialogBehavior } from '../../lib/accessibility'
import { FocusTrapZoneProps } from '../../lib/accessibility/FocusZone'
import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, ShorthandValue } from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import Box, { BoxProps } from '../Box/Box'
import Header from '../Header/Header'
import Portal from '../Portal/Portal'
import Flex from '../Flex/Flex'
import createComponent from 'src/lib/createComponent'
import useStardust from '@stardust-ui/react-bindings/src/useStardust'

export interface DialogSlotClassNames {
  header: string
  content: string
}

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

  stateManager: DialogManagerFactory

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

const slotClassNames: DialogSlotClassNames = {
  header: `ui-dialog__header`,
  content: `'ui-dialog__content`,
}

const Dialog: React.FC<DialogProps> = props => {
  const {
    actions,
    confirmButton,
    cancelButton,
    content,
    header,
    overlay,
    trapFocus,
    trigger,
    ...rest
  } = props

  // TODO?: 1st Phase: Enable state, style and accessibility ONLY
  // TODO?: 2nd Phase: Enable best practices

  const unhandledProps = getUnhandledProps([], props)
  const ElementType = getElementType(props)

  // const manager = useStateManager(createDialogManager, {}) // optional second param config
  // const { classes, styles } = useStyles('Dialog', { ...props, ...state })

  const contentRef = React.useRef<HTMLElement>()
  const triggerRef = React.useRef<HTMLElement>()

  // ---------------------------------------------------------
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers
  // TODO: Solve useStardust() and the smaller use*() hooks
  //       Accessibility has a circular dep on manager due to actionHandlers

  const { manager, accessibility, classes, styles } = useStardust<DialogProps>({
    displayName: '',
    props,
    accessibilityBehavior: dialogBehavior,
    autoControlledProps: ['open'],

    stateManager: createDialogManager,

    actionHandlers: {
      closeAndFocusTrigger: e => {
        handleDialogCancel2(e)
        e.stopPropagation()

        _.invoke(triggerRef, 'current.focus')
      },
      close: e => handleDialogCancel(e), // What we can do?
    },
  })

  const handleDialogCancel2 = (e: Event | React.SyntheticEvent) => {
    _.invoke(props, 'onCancel', e, { ...props, open: false })
    manager.actions.close()
  }

  // ---------------------------------------------------------

  console.log('Dialog render props:', props.open)
  // const manager = useStateManager(Dialog, createDialogManager, ['open'], props)
  console.log('Dialog manager.state:', manager.state.open)

  const handleDialogCancel = (e: Event | React.SyntheticEvent) => {
    _.invoke(props, 'onCancel', e, { ...props, open: false })
    manager.actions.close()
  }

  const handleDialogConfirm = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onConfirm', e, { ...props, open: false })
    manager.actions.close()
  }

  const handleDialogOpen = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onOpen', e, { ...props, open: true })
    manager.actions.open()
  }

  const handleCancelButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      handleDialogCancel(e)
    },
  })

  const handleConfirmButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      handleDialogConfirm(e)
    },
  })

  const handleOverlayOverrides = (content: JSX.Element) => (predefinedProps: BoxProps) => ({
    content,
    onClick: (e: React.SyntheticEvent, overlayProps: BoxProps) => {
      _.invoke(predefinedProps, 'onClick', e, overlayProps)

      if (!doesNodeContainClick(contentRef.current, e)) {
        handleDialogCancel(e)
      }
    },
  })

  const accessibility = useAccessibility(
    dialogBehavior,
    { ...props, ...state },
    {
      actionHandlers: {
        closeAndFocusTrigger: e => {
          handleDialogCancel(e)
          e.stopPropagation()

          _.invoke(triggerRef, 'current.focus')
        },
        close: e => handleDialogCancel(e), // What we can do?
      },
    },
  )

  const dialogContent = (
    <Ref innerRef={contentRef}>
      <ElementType
        className={classes.root}
        {...sd.root.props}
        // {...accessibility.attributes.popup}
        // {...unhandledProps}
        // {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.popup, unhandledProps)}
      >
        {Header.create(header, {
          defaultProps: {
            as: 'h2',
            ...sd.header.props,
            className: cx(slotClassNames.header, sd.header.props.className),
            styles: styles.header,
            // ...accessibility.attributes.header,
          },
        })}
        {Box.create(content, {
          defaultProps: sd.content.props,
          // defaultProps: {
          //   styles: styles.content,
          //   className: slotClassNames.content,
          //   ...accessibility.attributes.content,
          // },
        })}

        {Box.create(actions, {
          defaultProps: {
            styles: styles.actions,
          },
          overrideProps: {
            content: (
              <Flex gap="gap.smaller" hAlign="end">
                {Button.create(cancelButton, { overrideProps: handleCancelButtonOverrides })}
                {Button.create(confirmButton, {
                  defaultProps: {
                    primary: true,
                  },
                  overrideProps: handleConfirmButtonOverrides,
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
      onTriggerClick={handleDialogOpen}
      open={manager.state.open}
      trapFocus={trapFocus}
      trigger={trigger}
      triggerAccessibility={triggerAccessibility}
      triggerRef={triggerRef}
    >
      {Box.create(overlay, {
        defaultProps: {
          styles: styles.overlay,
        },
        overrideProps: handleOverlayOverrides(dialogContent),
      })}
    </Portal>
  )
}

// TODO: what to do with this?
// TODO:  - not needed but useful, _meta :/
// TODO:  - could be done wth some kind of generateClassName() somewhere higher up
Dialog.className = 'ui-dialog'

Dialog.displayName = 'Dialog'

Dialog.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: 'shorthand',
    color: true,
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
} as any

Dialog.defaultProps = {
  accessibility: dialogBehavior,
  stateManager: createDialogManager,
  actions: {},
  overlay: {},
  trapFocus: true,
}

/**
 * A Dialog indicates a possible user action.
 */
export default Dialog

// export default class Dialog extends React.Component<DialogProps> {}

const truncateSelectedItems = count => (prev, next, actions) => {
  ///
}

const Dropdown = createComponent({
  accessibility: () => {},
  state: () => {},
  style: () => {},
  render: () => {},
})

const d = <Dropdown middleware={[truncateSelectedItems(5)]} styles={} accessibility={} />

const dia = (
  <Button
    as="div"
    onClick={() => {
      console.log('hi')
    }}
  />
)
